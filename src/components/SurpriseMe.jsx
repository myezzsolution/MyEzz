import React, { useState } from 'react';
import { Sparkles, X, Leaf, GlassWater, UtensilsCrossed, Dices, ShoppingCart, RotateCcw, AlertCircle } from 'lucide-react';

const SurpriseMe = ({ supabase, addToCart, onClose }) => {
    const [budget, setBudget] = useState(300);
    const [selectedTypes, setSelectedTypes] = useState(['Vegetarian']);
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const toggleType = (type) => {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else {
                return [...prev, type];
            }
        });
    };

    const getSurpriseDish = async () => {
        if (selectedTypes.length === 0) {
            setError('Please select at least one food type!');
            setTimeout(() => setError(null), 3000);
            return;
        }

        setRolling(true);
        setResult(null);
        setError(null);

        try {
            // Separate beverages and food types
            const hasBeverages = selectedTypes.includes('Beverages');
            const foodTypes = selectedTypes.filter(t => t !== 'Beverages');

            let allItems = [];

            // Fetch beverages if selected
            if (hasBeverages) {
                const { data: beverageData } = await supabase
                    .from('menu_items')
                    .select('id, name, price, is_veg, category_id, restaurant_id, restaurants(name)')
                    .lte('price', budget)
                    .or('category_id.eq.5,name.ilike.%Shake%,name.ilike.%Juice%,name.ilike.%Tea%,name.ilike.%Coffee%,name.ilike.%Cold Drink%,name.ilike.%Lassi%,name.ilike.%Mojito%');
                
                if (beverageData) allItems = [...allItems, ...beverageData];
            }

            // Fetch food items based on selected types
            if (foodTypes.length > 0) {
                for (const type of foodTypes) {
                    let foodQuery = supabase
                        .from('menu_items')
                        .select('id, name, price, is_veg, category_id, restaurant_id, restaurants(name)')
                        .lte('price', budget)
                        .neq('category_id', 5)
                        .not('name', 'ilike', '%Shake%')
                        .not('name', 'ilike', '%Juice%')
                        .not('name', 'ilike', '%Tea%')
                        .not('name', 'ilike', '%Coffee%')
                        .not('name', 'ilike', '%Cold Drink%')
                        .not('name', 'ilike', '%Lassi%')
                        .not('name', 'ilike', '%Mojito%');

                    if (type === 'Jain') {
                        foodQuery = foodQuery
                            .eq('is_veg', true)
                            .ilike('name', '%Jain%');
                    } else if (type === 'Vegetarian') {
                        foodQuery = foodQuery
                            .eq('is_veg', true)
                            .not('name', 'ilike', '%Jain%');
                    } else if (type === 'Non-veg') {
                        foodQuery = foodQuery.eq('is_veg', false);
                    }

                    const { data: foodData } = await foodQuery;
                    if (foodData) allItems = [...allItems, ...foodData];
                }
            }

            // Remove duplicates based on id
            const uniqueItems = Array.from(
                new Map(allItems.map(item => [item.id, item])).values()
            );

            if (uniqueItems.length === 0) {
                setError('Oops! No items found. Try increasing budget or changing options!');
                setRolling(false);
                setTimeout(() => setError(null), 3000);
                return;
            }

            const randomIndex = Math.floor(Math.random() * uniqueItems.length);
            const randomDish = uniqueItems[randomIndex];

            setTimeout(() => {
                setResult(randomDish);
                setRolling(false);
            }, 1500);
        } catch (error) {
            console.error('Error fetching dish:', error);
            setError('Something went wrong! Please try again.');
            setRolling(false);
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-orange-950/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-950 w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(234,88,12,0.3)] border border-orange-100 dark:border-orange-900/30">

                {/* Top Header Section */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <Sparkles className="w-8 h-8 mb-2 relative z-10" />
                    <h2 className="text-3xl font-black tracking-tight relative z-10">Magic Pick</h2>
                    <p className="text-orange-50 opacity-90 text-sm font-medium relative z-10">Confused? Let us decide for you!</p>
                </div>

                <div className="p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/30 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-600 dark:text-red-400 text-sm font-bold">{error}</p>
                        </div>
                    )}

                    {!result ? (
                        <div className="space-y-8">
                            {/* Budget Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-black uppercase tracking-widest text-orange-600">Your Budget</label>
                                    <div className="relative">
                                        <span className="text-3xl font-black text-gray-800 dark:text-white">₹{budget}</span>
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                                    </div>
                                </div>
                                <div className="relative pt-2 pb-6">
                                    <input
                                        type="range" 
                                        min="40" 
                                        max="1000" 
                                        step="10"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full h-2 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 dark:from-orange-900/20 dark:via-orange-800/30 dark:to-orange-600/40 rounded-full appearance-none cursor-pointer slider-thumb"
                                        style={{
                                            background: `linear-gradient(to right, rgb(251 146 60) 0%, rgb(251 146 60) ${((budget - 40) / 960) * 100}%, rgb(254 215 170) ${((budget - 40) / 960) * 100}%, rgb(254 215 170) 100%)`
                                        }}
                                    />
                                    <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[10px] font-bold text-gray-400 px-1">
                                        <span>₹40</span>
                                        <span>₹500</span>
                                        <span>₹1000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Category Grid */}
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-orange-600 mb-3">Select Categories</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'Jain', label: 'Jain', icon: <Leaf className="w-6 h-6" /> },
                                        { id: 'Non-veg', label: 'Non-veg', icon: <UtensilsCrossed className="w-6 h-6" /> },
                                        { id: 'Vegetarian', label: 'Pure Veg', icon: <Leaf className="w-6 h-6" /> },
                                        { id: 'Beverages', label: 'Beverages', icon: <GlassWater className="w-6 h-6" /> }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => toggleType(item.id)}
                                            className={`relative py-4 rounded-[1.5rem] border-2 transition-all duration-300 flex flex-col items-center gap-1 overflow-hidden ${
                                                selectedTypes.includes(item.id)
                                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 shadow-lg shadow-orange-500/20'
                                                    : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-400 hover:border-orange-300 hover:bg-orange-50/50'
                                            }`}
                                        >
                                            {selectedTypes.includes(item.id) && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
                                            )}
                                            <span className={`mb-1 relative z-10 ${selectedTypes.includes(item.id) ? 'animate-bounce' : ''}`}>
                                                {item.icon}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-tighter relative z-10">
                                                {item.label}
                                            </span>
                                            {selectedTypes.includes(item.id) && (
                                                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={getSurpriseDish}
                                disabled={rolling}
                                className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xl rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                {rolling ? (
                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>ROLLING...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        <Dices className="w-6 h-6" />
                                        SURPRISE ME
                                    </span>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* Result Card */
                        <div className="text-center py-2 animate-in slide-in-from-bottom-10 duration-500">
                            <div className="inline-block p-5 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 text-orange-500 mb-6 ring-8 ring-orange-50 dark:ring-orange-500/5 animate-pulse">
                                <UtensilsCrossed className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 dark:text-white leading-tight mb-2 uppercase">
                                {result.name}
                            </h3>
                            <p className="text-orange-500 font-bold text-sm mb-6 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                {result.restaurants?.name}
                            </p>

                            <div className="text-5xl font-black bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent mb-8">
                                ₹{result.price}
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => { addToCart(result); onClose(); }}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-500 dark:to-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    ADD TO CART
                                </button>
                                <button
                                    onClick={() => setResult(null)}
                                    className="w-full text-orange-600 font-bold py-3 text-sm uppercase tracking-widest hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-colors border-2 border-transparent hover:border-orange-200 flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .slider-thumb::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f97316, #ea580c);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
                    transition: all 0.2s;
                }
                .slider-thumb::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.6);
                }
                .slider-thumb::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #f97316, #ea580c);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
                    transition: all 0.2s;
                }
                .slider-thumb::-moz-range-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 6px 16px rgba(249, 115, 22, 0.6);
                }
            `}</style>
        </div>
    );
};

export default SurpriseMe;