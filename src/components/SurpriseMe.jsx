import React, { useState } from 'react';
import { Sparkles, X, Leaf, Utensils, GlassWater, UtensilsCrossed } from 'lucide-react';

const SurpriseMe = ({ supabase, addToCart, onClose }) => {
    const [budget, setBudget] = useState(300);
    const [selectedType, setSelectedType] = useState('Vegetarian');
    const [rolling, setRolling] = useState(false);
    const [result, setResult] = useState(null);

    const getSurpriseDish = async () => {
        setRolling(true);
        setResult(null);

        let query = supabase
            .from('menu_items')
            .select('id, name, price, is_veg, category_id, restaurant_id, restaurants(name)')
            .lte('price', budget);

        if (selectedType === 'Beverages') {
            query = query.or('category_id.eq.5, name.ilike.%Shake%, name.ilike.%Juice%, name.ilike.%Tea%, name.ilike.%Coffee%, name.ilike.%Cold Drink%, name.ilike.%Lassi%, name.ilike.%Mojito%');
        } else {
            query = query.neq('category_id', 5)
                .not('name', 'ilike', '%Shake%')
                .not('name', 'ilike', '%Juice%')
                .not('name', 'ilike', '%Tea%')
                .not('name', 'ilike', '%Coffee%')
                .not('name', 'ilike', '%Cold Drink%')
                .not('name', 'ilike', '%Lassi%')
                .not('name', 'ilike', '%Mojito%');

            if (selectedType === 'Jain') {
                query = query.eq('is_veg', true).ilike('name', '%Jain%');
            } else if (selectedType === 'Non-Jain') {
                query = query.eq('is_veg', true).not('name', 'ilike', '%Jain%');
            } else if (selectedType === 'Vegetarian') {
                query = query.eq('is_veg', true);
            }
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            alert(`Oops! No ${selectedType} found. Try increasing budget!`);
            setRolling(false);
            return;
        }

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomDish = data[randomIndex];

        setTimeout(() => {
            setResult(randomDish);
            setRolling(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-orange-950/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-950 w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(234,88,12,0.3)] border border-orange-100 dark:border-orange-900/30">

                {/* Top Header Section */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <Sparkles className="w-8 h-8 mb-2" />
                    <h2 className="text-3xl font-black tracking-tight">Magic Pick</h2>
                    <p className="text-orange-50 opacity-90 text-sm font-medium">Confused? Let us decide for you!</p>
                </div>

                <div className="p-8">
                    {!result ? (
                        <div className="space-y-8">
                            {/* Budget Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-black uppercase tracking-widest text-orange-600">Your Budget</label>
                                    <span className="text-3xl font-black text-gray-800 dark:text-white">₹{budget}</span>
                                </div>
                                <input
                                    type="range" min="40" max="1000" step="10"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full h-3 bg-orange-100 dark:bg-orange-900/20 rounded-full appearance-none cursor-pointer accent-orange-500"
                                />
                            </div>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'Jain', label: 'Jain', icon: <Leaf className="w-6 h-6" /> },
                                    { id: 'Non-Jain', label: 'Non-Jain', icon: <Utensils className="w-6 h-6" /> },
                                    { id: 'Vegetarian', label: 'Pure Veg', icon: <Leaf className="w-6 h-6" /> },
                                    { id: 'Beverages', label: 'Beverages', icon: <GlassWater className="w-6 h-6" /> }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedType(item.id)}
                                        className={`py-4 rounded-[1.5rem] border-2 transition-all duration-300 flex flex-col items-center gap-1 ${selectedType === item.id
                                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600'
                                                : 'border-gray-50 dark:border-gray-900 bg-gray-50 dark:bg-gray-900 text-gray-400 hover:border-orange-200'
                                            }`}
                                    >
                                        <span className="mb-1">{item.icon}</span>
                                        <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={getSurpriseDish}
                                disabled={rolling}
                                className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xl rounded-2xl shadow-[0_10px_20px_rgba(249,115,22,0.4)] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {rolling ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>ROLLING...</span>
                                    </div>
                                ) : 'SURPRISE ME'}
                            </button>
                        </div>
                    ) : (
                        /* Result Card */
                        <div className="text-center py-2 animate-in slide-in-from-bottom-10 duration-500">
                            <div className="inline-block p-5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-500 mb-6 ring-8 ring-orange-50 dark:ring-orange-500/5">
                                <UtensilsCrossed className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 dark:text-white leading-tight mb-2 uppercase">
                                {result.name}
                            </h3>
                            <p className="text-orange-500 font-bold text-sm mb-6 flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                {result.restaurants?.name}
                            </p>

                            <div className="text-4xl font-black text-gray-900 dark:text-white mb-8">
                                ₹{result.price}
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => { addToCart(result); onClose(); }}
                                    className="w-full bg-gray-900 dark:bg-orange-500 text-white py-5 rounded-2xl font-black text-lg hover:shadow-xl transition-all"
                                >
                                    ADD TO CART
                                </button>
                                <button
                                    onClick={() => setResult(null)}
                                    className="w-full text-orange-600 font-bold py-2 text-sm uppercase tracking-widest hover:bg-orange-50 rounded-xl transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SurpriseMe;
