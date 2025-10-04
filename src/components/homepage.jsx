import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient'; // Make sure this path is correct
import Footer from '../components/Footer';

// --- SVG ICONS (Your existing SVG components go here) ---
const SunIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-yellow-500 ${className}`}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-400 ${className}`}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const StarIcon = ({filled = true}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const HomeIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0112 18v-1.586l-3.707-3.707A1 1 0 018 12V6a1 1 0 01-.293-.707L7 4H4a1 1 0 01-1-1z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


const categoryFilters = [
  { name: 'Pizza', keywords: ['pizza', 'pizzatta'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557648908-f3yzue48jb4-1756557650705_hsfuv5_screenshot_2025-08-3.png' },
  { name: 'Sandwich', keywords: ['sandwich', 'panini', 'bagel'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552327686-rhswl7x25uh-1756552327877_35f5o9_screenshot_2025-08-3.png' },
  { name: 'Rolls & Wraps', keywords: ['roll', 'frankie', 'wrap'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557561163-4v9aunjt71f-1756557563014_zdepzl_screenshot_2025-08-3.png' },
  { name: 'Burger', keywords: ['burger'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557328450-pmk9jldolg-1756557330397_m33evn_screenshot_2025-08-3.png' },
  { name: 'Street Food', keywords: ['vada pav', 'samosa', 'dabeli', 'bhel', 'pakoda', 'dhokla', 'locho', 'khamani', 'patra', 'chaat', 'pav', 'pudla', 'bhurji', 'idli'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557328450-pmk9jldolg-1756557330397_m33evn_screenshot_2025-08-3.png' },
  { name: 'Breads & Kulcha', keywords: ['kulcha', 'garlic bread', 'roti', 'naan', 'paratha', 'bun maska'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557214213-k5uo08e6do-1756557215834_tm6edh_screenshot_2025-08-3.png' },
  { name: 'Chinese', keywords: ['noodles', 'manchurian', 'ramen', 'schezwan', 'hakka'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756556600027-5ktrv5mxz6b-1756556600301_mzvjpe_screenshot_2025-08-3.png' },
  { name: 'Momos', keywords: ['momos'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557061089-powevnv8brq-1756557061231_soqr9p_screenshot_2025-08-3.png' },
  { name: 'Pasta', keywords: ['pasta', 'spaghetti'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756557131451-77u7ytc8hjh-1756557132811_xpym3t_screenshot_2025-08-3.png' },
  { name: 'Sushi', keywords: ['sushi'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552882328-c8w8if74axq-1756552883691_shkbyo_screenshot_2025-08-3.png' },
  { name: 'Fries', keywords: ['fries', 'wedges', 'twister'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552720273-nor1l0jr2w-1756552722137_2vbqus_screenshot_2025-08-3.png' },
  { name: 'Desserts', keywords: ['waffle', 'pastry', 'brownie', 'cake', 'falooda', 'sundae', 'sheera'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552423146-33vmee7qwcc-1756552425289_3gqwk8_screenshot_2025-08-3.png' },
  { name: 'Beverages', keywords: ['juice', 'shake', 'tea', 'coffee', 'lassi', 'mojito', 'boba', 'blossom', 'limbu', 'coco'], image: 'https://pub-141831e61e69445289222976a15b6fb3.r2.dev/1756552468201-sb2j0y8fah-1756552470016_6s1tf6_screenshot_2025-08-3.png' },
];

// --- COMPONENTS ---
const Header = ({ onCartClick, cartItems, searchQuery, onSearchChange }) => (
    <header className="bg-white shadow-sm p-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50">
        <img src={logo} alt="MyEzz Logo" className="h-25" />
        <div className="relative flex-1 max-w-xl mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search for restaurants..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-orange-500">
                <CartIcon />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
            </button>
        </div>
    </header>
);


const FilterCheckbox = ({ label, description, checked, onChange }) => (
    <div className="relative">
        {checked && <div className="absolute left-[-1rem] top-0 h-full w-1 bg-orange-500"></div>}
        <label className="flex items-start space-x-3 cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-orange-500 rounded-sm border-gray-300 bg-gray-100 focus:ring-orange-500" />
            <span className="text-gray-700">
                {label}
                {description && <p className="text-xs text-gray-500">{description}</p>}
            </span>
        </label>
    </div>
);

const Sidebar = ({ selectedCuisines, setSelectedCuisines, isOpen }) => {
    const handleCuisineChange = (cuisine) => {
        setSelectedCuisines(prev =>
            prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
        );
    };

    const clearFilters = () => {
        setSelectedCuisines([]);
    };

    return (
        <aside className={`w-72 flex-shrink-0 p-4 space-y-6 bg-white md:bg-transparent md:block transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
            <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">Cuisine Type</h3>
                <div className="flex flex-wrap gap-2">
                    {["Jain", "Non-Jain", "Beverages"].map(cuisine => (
                        <button key={cuisine} onClick={() => handleCuisineChange(cuisine)} className={`px-3 py-1 text-sm border rounded-lg transition-colors ${selectedCuisines.includes(cuisine) ? 'bg-orange-500 text-white border-orange-500' : 'text-gray-700 hover:bg-orange-50'}`}>{cuisine}</button>
                    ))}
                </div>
            </div>
            <div className="sticky bottom-4 space-y-2 pt-4">
                <button onClick={clearFilters} className="w-full text-gray-600 font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors">Clear All</button>
            </div>
        </aside>
    );
};
const RestaurantCard = ({ name, distance, cuisines, rating, reviews, delivery_time, image_url, onClick }) => (
    // The props are updated to include 'image_url' and 'delivery_time'
    <div onClick={onClick} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="relative">
            {/* FIXED: The src attribute now correctly uses the 'image_url' prop */}
            <img src={image_url} alt={name} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Missing'; }} />
            
            <div className="absolute top-0 right-0 p-2">
                <button className="text-white opacity-80 hover:opacity-100 hover:text-red-500 transition-colors">
                    <HeartIcon />
                </button>
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-800">{name}</h3>
                <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded-md text-sm">
                    <StarIcon />
                    <span className="ml-1 font-semibold">{rating}</span>
                </div>
            </div>
            {/* Use a check to prevent errors if cuisines is not available */}
            <p className="text-gray-500 text-sm truncate">{cuisines ? cuisines.join(', ') : 'Cuisine not available'}</p>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>{distance} km</span>
                {/* FIXED: This now uses 'delivery_time' to match the database */}
                <span>{delivery_time} mins</span>
            </div>
        </div>
    </div>
);

const HomePage = ({ setSelectedRestaurant, searchQuery }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function getRestaurants() {
            setLoading(true);
            let query;

            // If there's a search query, use the powerful RPC function
            if (searchQuery.trim() !== '') {
                query = supabase.rpc('search_restaurants', {
                    search_term: searchQuery
                });
            } else {
                // Otherwise, fetch all restaurants normally
                query = supabase.from('restaurants').select(`*, tags(name), cuisines(name)`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching restaurants:', error);
                setRestaurants([]);
            } else {
                 // The RPC doesn't fetch nested tags/cuisines, so we re-format for consistency
                 // In a real app, you might adjust the RPC to return this info too.
                const formattedData = data.map(r => ({
                    ...r,
                    tags: r.tags ? r.tags.map(t => t.name) : [],
                    cuisines: r.cuisines ? r.cuisines.map(c => c.name) : [],
                }));
                setRestaurants(formattedData);
            }
            setLoading(false);
        }
        getRestaurants();
    }, [searchQuery]); // Re-run the fetch whenever the search query changes

    // Client-side filtering for cuisines still works on the fetched data
    const filteredRestaurants = restaurants.filter(restaurant => {
        return selectedCuisines.length === 0 || selectedCuisines.some(c => restaurant.cuisines.includes(c));
    });

    if (loading) {
        return <div className="text-center p-10 font-semibold text-gray-600">Loading restaurants... 🛵</div>;
    }

    return (
        <div className="flex max-w-screen-xl mx-auto">
            <Sidebar selectedCuisines={selectedCuisines} setSelectedCuisines={setSelectedCuisines} isOpen={showFilters} />
            <main className="flex-1 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">{filteredRestaurants.length} restaurants found</p>
                    <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center px-3 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">
                        <FilterIcon /> Filters
                    </button>
                </div>
                {filteredRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredRestaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} {...restaurant} onClick={() => setSelectedRestaurant(restaurant)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No restaurants or dishes found matching your criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
};
const RestaurantMenuPage = ({ restaurant, onBack, cartItems, setCartItems, searchQuery }) => {
    const [menuItems, setMenuItems] = useState([]);
    // NEW: Add state to hold categories fetched from the database
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // MODIFIED: This useEffect now fetches both menu items and all categories
    useEffect(() => {
        if (!restaurant) return;

        async function fetchData() {
            setLoading(true);

            // Fetch both sets of data at the same time for efficiency
            const [menuResponse, categoriesResponse] = await Promise.all([
                supabase.from('menu_items').select('*').eq('restaurant_id', restaurant.id),
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
    }, [restaurant]);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(i => i.id === item.id);
            if (itemExists) {
                return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    // FIXED: This logic now correctly uses the 'categories' state fetched from the database
    const availableCategories = categories.filter(category =>
        menuItems.some(item =>
            category.keywords.some(keyword =>
                item.name.toLowerCase().includes(keyword)
            )
        )
    );

    // FIXED: This logic also uses the 'categories' state
    const categoryFilteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => {
            const categoryInfo = categories.find(cat => cat.name === selectedCategory);
            if (!categoryInfo) return false;
            const lowerCaseName = item.name.toLowerCase();
            return categoryInfo.keywords.some(keyword => lowerCaseName.includes(keyword));
        });
    
    const filteredMenuItems = searchQuery.trim() === ''
        ? categoryFilteredItems
        : categoryFilteredItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="max-w-screen-xl mx-auto p-4 sm:p-8 text-gray-800">
            <button onClick={onBack} className="flex items-center font-semibold text-orange-500 mb-4">
                <BackIcon />
                <span className="ml-2">Back to Restaurants</span>
            </button>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
                    <p className="text-gray-500 mb-4">{restaurant.cuisines.join(', ')}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <StarIcon filled={true} />
                            <span className="ml-1 font-semibold">{restaurant.rating} ({restaurant.reviews} reviews)</span>
                        </div>
                        <span>•</span>
                        <span>{restaurant.delivery_time} mins</span>
                    </div>
                </div>

                {/* --- CATEGORY FILTER UI --- */}
                {availableCategories.length > 0 && searchQuery.trim() === '' && (
                    <div className="p-6 border-t">
                         <h3 className="text-xl font-bold mb-4">Categories</h3>
                         <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
                             <button onClick={() => setSelectedCategory('All')} className={`flex-shrink-0 text-center p-2 rounded-lg transition-all duration-200 ${selectedCategory === 'All' ? 'bg-orange-100' : 'hover:bg-gray-100'}`}>
                                 <div className={`w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-2 border-2 ${selectedCategory === 'All' ? 'border-orange-500' : 'border-transparent'}`}>
                                     <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                         <span className="text-lg font-semibold text-gray-700">All</span>
                                     </div>
                                 </div>
                                 <span className={`text-sm font-semibold ${selectedCategory === 'All' ? 'text-orange-600' : 'text-gray-600'}`}>All</span>
                             </button>
                             {availableCategories.map((cat) => (
                                 <button key={cat.name} onClick={() => setSelectedCategory(cat.name)} className={`flex-shrink-0 text-center p-2 rounded-lg transition-all duration-200 ${selectedCategory === cat.name ? 'bg-orange-100' : 'hover:bg-gray-100'}`}>
                                     <div className={`w-20 h-20 rounded-full mx-auto mb-2 border-2 ${selectedCategory === cat.name ? 'border-orange-500' : 'border-transparent'}`}>
                                         {/* FIXED: The <img> tag now correctly uses 'cat.image_url' */}
                                         <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                                     </div>
                                     <span className={`text-sm font-semibold ${selectedCategory === cat.name ? 'text-orange-600' : 'text-gray-600'}`}>
                                         {cat.name}
                                     </span>
                                 </button>
                             ))}
                         </div>
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
                            {filteredMenuItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-gray-50">
                                    <div>
                                        <h4 className="font-semibold">{item.name}</h4>
                                        {item.price && <p className="text-sm text-gray-500">₹{item.price}</p>}
                                    </div>
                                    {item.price && <button onClick={() => addToCart(item)} className="px-4 py-2 text-sm font-bold text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">ADD</button>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No items found for this filter.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const CheckoutPage = ({ cartItems, onBack, address, setAddress, setCartItems, onPayNow }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const platformFee = cartItems.length > 0 ? 8 : 0;
    const deliveryFee = cartItems.length > 0? 30 : 0;
    const total = subtotal + deliveryFee + platformFee;

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const removeItem = (itemName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex items-center">
                                <p>₹{item.price * item.quantity}</p>
                                <button onClick={() => removeItem(item.name)} className="ml-4 text-red-500 hover:text-red-700">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length > 0 && <button onClick={() => setCartItems([])} className="text-sm text-red-500 mt-2">Clear Cart</button>}
                <div className="mt-6 pt-6 border-t space-y-2">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>Delivery Fee</span><span>₹{deliveryFee.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>Platform Fee</span><span>₹{platformFee.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Grand Total</span><span>₹{total.toFixed(2)}</span></div>
                </div>
                <div className="mt-6">
                    <h3 className="font-bold mb-2">Delivery Information</h3>
                    <input
                        type="text"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleAddressChange}
                        placeholder="Full Name"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="email"
                        name="emailId"
                        value={address.emailId}
                        onChange={handleAddressChange}
                        placeholder="Email ID"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleAddressChange}
                        placeholder="Phone Number"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                        type="text"
                        name="fullAddress"
                        value={address.fullAddress}
                        onChange={handleAddressChange}
                        placeholder="Full Delivery Address"
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                </div>
                <button onClick={() => onPayNow(address)} className="w-full mt-6 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">Pay Now</button>
            </div>
        </div>
    );
};

export default function App() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [address, setAddress] = useState({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        fullAddress: ''
    });

    const navigate = useNavigate();


    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    };

    const handlePayNow = (addressData) => {
        if (!addressData.fullName.trim() || !addressData.emailId.trim() || !addressData.phoneNumber.trim() || !addressData.fullAddress.trim()) {
            alert("Please fill in all delivery information fields.");
            return;
        }

        if (!isValidEmail(addressData.emailId)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!isValidPhone(addressData.phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const customerInfo = {
            fullName: addressData.fullName,
            phoneNumber: addressData.phoneNumber,
            emailId: addressData.emailId,
            fullAddress: addressData.fullAddress
        };

        const cartWithVendor = cartItems.map(item => ({
            ...item,
            vendor: selectedRestaurant ? selectedRestaurant.name : "Unknown Vendor"
        }));

        setShowCheckout(false);

        navigate("/payment", {
            state: {
                customerInfo: customerInfo,
                cart: cartWithVendor,
            }
        });
    };

    const renderPage = () => {
        if (selectedRestaurant) {
            return <RestaurantMenuPage 
                        restaurant={selectedRestaurant} 
                        onBack={() => setSelectedRestaurant(null)} 
                        cartItems={cartItems} 
                        setCartItems={setCartItems}
                        searchQuery={searchQuery} 
                    />;
        }
        return <HomePage 
                    setSelectedRestaurant={setSelectedRestaurant} 
                    address={address} 
                    searchQuery={searchQuery}
                />;
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans transition-colors duration-500 pb-16 md:pb-0">
            <Header 
                cartItems={cartItems} 
                onCartClick={() => setShowCheckout(true)} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            {renderPage()}
            {showCheckout && <CheckoutPage cartItems={cartItems} onBack={() => setShowCheckout(false)} address={address} setAddress={setAddress} setCartItems={setCartItems} onPayNow={handlePayNow} />}

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                <button onClick={() => { setSelectedRestaurant(null); setSearchQuery(''); }} className={`flex flex-col items-center text-xs ${!selectedRestaurant ? 'text-orange-500' : 'text-gray-500'}`}>
                    <HomeIcon className="h-6 w-6" />
                    <span>Home</span>
                </button>
                <button onClick={() => setShowCheckout(true)} className={`flex flex-col items-center text-xs relative ${cartItems.length > 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                    <CartIcon className="h-6 w-6" />
                    {cartItems.length > 0 && <span className="absolute -top-1 right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                    <span>Cart</span>
                </button>
            </nav>
            <Footer />
        </div>
    );
}
