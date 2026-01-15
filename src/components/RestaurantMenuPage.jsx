import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { StarIcon, BackIcon } from './Icons';

const RestaurantMenuPage = ({ restaurant, onBack, cartItems, setCartItems, searchQuery, showToastMessage }) => {
    const { restaurantId } = useParams();
    const [currentRestaurant, setCurrentRestaurant] = useState(restaurant);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [vegOnly, setVegOnly] = useState(false);

    useEffect(() => {
        async function fetchRestaurant() {
            if (!currentRestaurant && restaurantId) {
                const { data, error } = await supabase
                    .from('restaurants')
                    .select('*, cuisines(name)')
                    .eq('id', restaurantId)
                    .single();

                if (data) {
                    const formatted = {
                        ...data,
                        cuisines: data.cuisines ? data.cuisines.map(c => c.name) : []
                    };
                    setCurrentRestaurant(formatted);
                }
            }
        }
        fetchRestaurant();
    }, [currentRestaurant, restaurantId]);

    useEffect(() => {
        if (!currentRestaurant) return;

        async function fetchData() {
            setLoading(true);

            const [menuResponse, categoriesResponse] = await Promise.all([
                supabase.from('menu_items')
                    .select('*')
                    .eq('restaurant_id', currentRestaurant.id)
                    .order('id', { ascending: true }),
                supabase.from('categories').select('*')
            ]);

            if (menuResponse.error) {
                console.error('Error fetching menu items:', menuResponse.error);
                setMenuItems([]);
            } else {
                setMenuItems(menuResponse.data);
            }

            if (categoriesResponse.error) {
                console.error('Error fetching categories:', categoriesResponse.error);
                setCategories([]);
            } else {
                setCategories(categoriesResponse.data);
            }

            setLoading(false);
        }

        fetchData();
        setSelectedCategory('All');
    }, [currentRestaurant]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(i => i.id === item.id && i.vendor === currentRestaurant.name);
            if (itemExists) {
                showToastMessage(`${item.name} quantity updated in cart!`);
                return prevItems.map(i =>
                    i.id === item.id && i.vendor === currentRestaurant.name
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            showToastMessage(`${item.name} added to cart!`);
            return [...prevItems, { ...item, quantity: 1, vendor: currentRestaurant.name, restaurantName: currentRestaurant.name }];
        });
    };

    const removeFromCart = (item) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id && i.vendor === currentRestaurant.name);
            if (!existingItem) return prevItems;

            if (existingItem.quantity === 1) {
                showToastMessage(`${item.name} removed from cart!`);
                return prevItems.filter(i => !(i.id === item.id && i.vendor === currentRestaurant.name));
            }

            showToastMessage(`${item.name} quantity decreased!`);
            return prevItems.map(i =>
                i.id === item.id && i.vendor === currentRestaurant.name
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            );
        });
    };

    const availableCategories = categories.filter(category =>
        menuItems.some(item =>
            category.keywords.some(keyword =>
                item.name.toLowerCase().includes(keyword)
            )
        )
    );

    const categoryFilteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => {
            const categoryInfo = categories.find(cat => cat.name === selectedCategory);
            if (!categoryInfo) return false;
            const lowerCaseName = item.name.toLowerCase();
            return categoryInfo.keywords.some(keyword => lowerCaseName.includes(keyword));
        });

    const vegFilteredItems = vegOnly
        ? categoryFilteredItems.filter(item => item.is_veg === true)
        : categoryFilteredItems;

    const filteredMenuItems = searchQuery.trim() === ''
        ? vegFilteredItems
        : vegFilteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (!currentRestaurant) return <div className="p-8 text-center">Loading restaurant...</div>;

    return (
        <div className="max-w-screen-xl mx-auto p-4 sm:p-8 text-gray-800 dark:text-gray-100">
            <button onClick={onBack} className="flex items-center font-semibold text-orange-500 mb-4 px-4 py-2 border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200">
                <BackIcon />
                <span className="ml-2">Back to Restaurants</span>
            </button>
            <div className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg shadow-md overflow-hidden">
                <img src={currentRestaurant.image_url} alt={currentRestaurant.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-2">{currentRestaurant.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{currentRestaurant.cuisines.join(', ')}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                            <StarIcon filled={true} />
                            <span className="ml-1 font-semibold">{currentRestaurant.rating} ({currentRestaurant.reviews} reviews)</span>
                        </div>
                        <span>•</span>
                        <span>{currentRestaurant.delivery_time} mins</span>
                    </div>
                </div>

                {searchQuery.trim() === '' && (
                    <div className="px-6 sm:px-8 py-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Categories</h3>
                            <button
                                onClick={() => setVegOnly(!vegOnly)}
                                className="flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200"
                            >
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Veg Only</span>
                                <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${vegOnly ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${vegOnly ? 'left-7' : 'left-1'}`}>
                                        <span className={`absolute inset-0.5 rounded-full ${vegOnly ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        {availableCategories.length > 0 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex-shrink-0 ${selectedCategory === 'All'
                                        ? 'bg-orange-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                        }`}
                                >
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedCategory === 'All' ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                                        }`}>
                                        All
                                    </span>
                                    <span>All</span>
                                </button>
                                {availableCategories.map((cat) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex-shrink-0 ${selectedCategory === cat.name
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        <img
                                            src={cat.image_url}
                                            alt={cat.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                        {searchQuery.trim() !== '' ? 'Search Results' : (selectedCategory === 'All' ? 'Full Menu' : selectedCategory)}
                    </h3>
                    {loading ? (
                        <p>Loading menu...</p>
                    ) : filteredMenuItems.length > 0 ? (
                        <div className="space-y-4">
                            {filteredMenuItems.map((item) => {
                                const cartItem = cartItems.find(i => i.id === item.id && i.vendor === currentRestaurant.name);
                                const quantity = cartItem?.quantity || 0;

                                return (
                                    <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</h4>
                                            {item.price && <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price}</p>}
                                        </div>
                                        {item.price && (
                                            quantity === 0 ? (
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="bg-gradient-to-b from-[#ff7a1a] to-[#ff5c00] hover:from-[#ff8a2a] hover:to-[#ff6a10] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-[0_4px_12px_rgba(255,106,0,0.3)] hover:shadow-[0_6px_16px_rgba(255,106,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    ADD
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => removeFromCart(item)}
                                                        className="border-2 border-orange-500 text-orange-600 hover:text-white hover:bg-orange-500 w-8 h-8 rounded-md transition-all duration-200 font-bold text-xl flex items-center justify-center active:scale-90"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-orange-600 font-bold px-3 min-w-[2.5rem] text-center">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="border-2 border-orange-500 text-orange-600 hover:text-white hover:bg-orange-500 w-8 h-8 rounded-md transition-all duration-200 font-bold text-xl flex items-center justify-center active:scale-90"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No items found for this filter.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenuPage;
