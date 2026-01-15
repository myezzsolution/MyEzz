/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';

// Components
import Header from './Header';
import Footer from './Footer';
import Toast from './Toast';
import LocationSelector from './LocationSelector';
import HomePageContent from './HomePageContent';
import RestaurantMenuPage from './RestaurantMenuPage';
import MyProfilePage from './MyProfilePage';
import CheckoutPage from './CheckoutPage';

// Icons for bottom nav
import { HomeIcon, CartIcon } from './Icons';

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationPickerPurpose, setLocationPickerPurpose] = useState('delivery');

    const [userLocation, setUserLocation] = useState(() => {
        const saved = localStorage.getItem('userLocation');
        return saved ? JSON.parse(saved) : null;
    });

    const [userProfile, setUserProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        profilePhoto: '',
        savedAddresses: [],
        totalOrders: 0,
        currentOrder: null,
        previousOrders: []
    });

    const [address, setAddress] = useState({
        fullName: '',
        emailId: '',
        phoneNumber: '',
        fullAddress: ''
    });

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Load saved profile data
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            try {
                setUserProfile(JSON.parse(savedProfile));
            } catch (error) {
                console.error('Error parsing saved profile:', error);
            }
        }
    }, []);

    // Sync auth data
    useEffect(() => {
        if (currentUser) {
            setUserProfile(prev => ({
                ...prev,
                fullName: currentUser.displayName || prev.fullName,
                email: currentUser.email || prev.email
            }));
        }
    }, [currentUser]);

    // Sync profile to checkout address
    useEffect(() => {
        if (userProfile) {
            setAddress(prev => ({
                ...prev,
                fullName: userProfile.fullName || prev.fullName,
                emailId: userProfile.email || prev.emailId,
                phoneNumber: userProfile.phoneNumber || prev.phoneNumber,
                fullAddress: userProfile.location || prev.fullAddress
            }));
        }
    }, [userProfile]);

    // Sync location specifically
    useEffect(() => {
        if (userLocation) {
            setAddress(prev => ({ ...prev, fullAddress: userLocation.address }));
        }
    }, [userLocation]);

    const handleLocationSelect = (location) => {
        if (locationPickerPurpose === 'delivery') {
            setUserLocation(location);
            localStorage.setItem('userLocation', JSON.stringify(location));

            const newSavedAddr = {
                id: Date.now(),
                label: location.addressType || 'Other',
                address: location.fullAddress || location.address,
                isDefault: (userProfile.savedAddresses || []).length === 0,
                coordinates: { lat: location.lat, lng: location.lng }
            };

            const isDuplicate = (userProfile.savedAddresses || []).some(
                addr => addr.address === newSavedAddr.address
            );

            if (!isDuplicate) {
                const updatedProfile = {
                    ...userProfile,
                    savedAddresses: [...(userProfile.savedAddresses || []), newSavedAddr]
                };
                setUserProfile(updatedProfile);
                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                showToastMessage(`Address saved to your ${newSavedAddr.label} profile!`);
            }
        } else if (locationPickerPurpose === 'profile-main') {
            const updatedProfile = {
                ...userProfile,
                location: location.address,
                coordinates: { lat: location.lat, lng: location.lng }
            };
            setUserProfile(updatedProfile);
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            showToastMessage('Profile location updated!');
        } else if (locationPickerPurpose === 'profile-saved') {
            const newAddr = {
                id: Date.now(),
                label: location.addressType || 'Other',
                address: location.fullAddress || location.address,
                isDefault: (userProfile.savedAddresses || []).length === 0,
                coordinates: { lat: location.lat, lng: location.lng }
            };
            const updatedProfile = {
                ...userProfile,
                savedAddresses: [...(userProfile.savedAddresses || []), newAddr]
            };
            setUserProfile(updatedProfile);
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            showToastMessage('Address added to your profile!');
        }
        setShowLocationModal(false);
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handlePayNow = (addressData) => {
        if (!addressData.fullName.trim() || !addressData.emailId.trim() || !addressData.phoneNumber.trim() || !addressData.fullAddress.trim()) {
            alert("Please fill in all delivery information fields.");
            return;
        }

        const customerInfo = {
            ...addressData,
            latitude: userLocation?.lat,
            longitude: userLocation?.lng
        };

        const cartWithVendor = cartItems.map(item => ({
            ...item,
            vendor: item.vendor || "Unknown Vendor",
            restaurantName: item.restaurantName || "Unknown Restaurant"
        }));

        setShowCheckout(false);
        navigate("/payment", { state: { customerInfo, cart: cartWithVendor } });
    };

    return (
        <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen font-sans pb-16 md:pb-0">
            <Header
                cartItems={cartItems}
                onCartClick={() => setShowCheckout(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isProfileOpen={isProfileOpen}
                onProfileToggle={() => setIsProfileOpen(!isProfileOpen)}
                onProfileClose={() => setIsProfileOpen(false)}
                onMyProfile={() => { navigate('/profile'); setIsProfileOpen(false); }}
                onLogoClick={() => { navigate('/'); setSearchQuery(''); }}
                userLocation={userLocation}
                onLocationClick={() => { setLocationPickerPurpose('delivery'); setShowLocationModal(true); }}
            />
            <LocationSelector
                isOpen={showLocationModal}
                onClose={() => setShowLocationModal(false)}
                onLocationSelect={handleLocationSelect}
                savedAddresses={userProfile.savedAddresses || []}
            />

            <Routes>
                <Route path="/" element={
                    <HomePageContent
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        showToastMessage={showToastMessage}
                    />
                } />
                <Route path="/profile" element={
                    <MyProfilePage
                        onBack={() => navigate('/')}
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        onAddAddress={(purpose) => {
                            setLocationPickerPurpose(purpose);
                            setShowLocationModal(true);
                        }}
                    />
                } />
                <Route path="/restaurant/:restaurantId" element={
                    <RestaurantMenuPage
                        onBack={() => navigate('/')}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        searchQuery={searchQuery}
                        showToastMessage={showToastMessage}
                    />
                } />
            </Routes>

            {showCheckout && (
                <CheckoutPage
                    cartItems={cartItems}
                    onBack={() => setShowCheckout(false)}
                    address={address}
                    setAddress={setAddress}
                    setCartItems={setCartItems}
                    onPayNow={handlePayNow}
                    userLocation={userLocation}
                />
            )}

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                <button onClick={() => { navigate('/'); setSearchQuery(''); }} className="flex flex-col items-center text-xs text-gray-500 hover:text-orange-500">
                    <HomeIcon className="h-6 w-6" />
                    <span>Home</span>
                </button>
                <button onClick={() => setShowCheckout(true)} className={`flex flex-col items-center text-xs relative ${cartItems.length > 0 ? 'text-orange-500' : 'text-gray-500'}`}>
                    <CartIcon className="h-6 w-6" />
                    {cartItems.length > 0 && <span className="absolute -top-1 right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                    <span>Cart</span>
                </button>
            </nav>
            <Toast
                message={toastMessage}
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
            <Footer />
        </div>
    );
}
