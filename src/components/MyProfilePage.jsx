import React, { useState, useEffect } from 'react';
import { MapPin, Wallet, Heart, Building2, X } from 'lucide-react';
import { UserIcon, LogoutIcon, OrdersIcon, SettingsIcon } from './Icons';
import Toast from './Toast';

const MyProfilePage = ({ onBack, userProfile, setUserProfile, onAddAddress }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(userProfile);
    const [onlineOrders, setOnlineOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ label: '', address: '' });

    useEffect(() => {
        if (!userProfile.email) return;

        const fetchOrders = async () => {
            setLoadingOrders(true);
            try {
                const scriptUrl = import.meta.env.VITE_APP_SCRIPT_URL;
                if (!scriptUrl) {
                    console.error("VITE_APP_SCRIPT_URL not found");
                    return;
                }
                const response = await fetch(`${scriptUrl}?email=${userProfile.email}`);
                const data = await response.json();
                setOnlineOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [userProfile.email]);

    const handleSave = () => {
        const privateFields = ['email', 'phoneNumber', 'fullName', 'location'];
        const hasPrivateChanges = privateFields.some(field => editedProfile[field] !== userProfile[field]);

        setToast({
            isVisible: true,
            message: hasPrivateChanges ? "Your profile has been updated successfully!" : "Profile updated successfully!",
            type: 'success'
        });

        setUserProfile(editedProfile);
        setIsEditing(false);
        localStorage.setItem('userProfile', JSON.stringify(editedProfile));
        window.dispatchEvent(new Event("userProfileUpdated"));
    };

    const handleCancel = () => {
        setEditedProfile(userProfile);
        setIsEditing(false);
        setShowAddressForm(false);
        setNewAddress({ label: '', address: '' });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedProfile({ ...editedProfile, profilePhoto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteAddress = (id) => {
        setEditedProfile({
            ...editedProfile,
            savedAddresses: (editedProfile.savedAddresses || []).filter(addr => addr.id !== id)
        });
    };

    const handleSetDefaultAddress = (id) => {
        setEditedProfile({
            ...editedProfile,
            savedAddresses: (editedProfile.savedAddresses || []).map(addr => ({
                ...addr,
                isDefault: addr.id === id
            }))
        });
    };

    const handleTrackOrder = () => {
        alert('Order tracking feature coming soon!');
    };

    const displayProfile = isEditing ? editedProfile : userProfile;

    useEffect(() => {
        if (displayProfile?.currentOrder?.status === "Delivered") {
            const completedOrder = displayProfile.currentOrder;
            const updatedProfile = {
                ...displayProfile,
                previousOrders: [...(displayProfile.previousOrders || []), completedOrder],
                currentOrder: null,
            };
            setUserProfile(updatedProfile);
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        }
    }, [displayProfile?.currentOrder?.status]);

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />
            <div className="bg-[hsl(var(--card))] dark:bg-gray-800 text-[hsl(var(--card-foreground))] rounded-lg shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={onBack}
                        className="text-orange-500 hover:text-white font-semibold px-4 py-2 border-2 border-orange-500 rounded-lg hover:bg-orange-500 transition-all duration-200"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        My Profile
                    </h1>
                    <div className="w-16" />
                </div>

                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-orange-500 dark:bg-orange-600 flex items-center justify-center overflow-hidden">
                            {displayProfile.profilePhoto ? (
                                <img src={displayProfile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl text-white font-bold">{displayProfile.fullName?.charAt(0) || "U"}</span>
                            )}
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-orange-600 text-sm">
                                📷
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", key: "fullName", type: "text" },
                            { label: "Email Address", key: "email", type: "email" },
                            { label: "Phone Number", key: "phoneNumber", type: "tel" },
                            { label: "Location", key: "location", type: "text" },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{field.label}</label>
                                {isEditing ? (
                                    field.key === 'location' ? (
                                        <div className="relative group cursor-pointer" onClick={() => onAddAddress('profile-main')}>
                                            <input
                                                type="text"
                                                readOnly
                                                value={editedProfile[field.key] || ""}
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer pr-10"
                                                placeholder="Click to pick on map"
                                            />
                                            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={editedProfile[field.key] || ""}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, [field.key]: e.target.value })}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                        />
                                    )
                                ) : (
                                    <p className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100">
                                        {displayProfile[field.key] || "Not provided"}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Orders Placed</h3>
                            <p className="text-3xl font-bold text-orange-600">{onlineOrders ? onlineOrders.length : 0}</p>
                        </div>
                        <span className="text-4xl text-4xl">📦</span>
                    </div>
                </div>

                {displayProfile.currentOrder && (
                    <div className="bg-blue-50 dark:bg-blue-700 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-600">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">📦 Current Order</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Order ID:</span>
                                <span className="font-semibold">{displayProfile.currentOrder.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                                <span className="font-semibold">{displayProfile.currentOrder.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Order date:</span>
                                <span className="font-semibold">{displayProfile.currentOrder.orderDate}</span>
                            </div>
                        </div>
                        <button onClick={handleTrackOrder} className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">Track Order →</button>
                    </div>
                )}

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Previous Orders</h2>
                    {loadingOrders ? (
                        <div className="text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
                            <p className="text-sm text-gray-500 mt-2">Loading orders...</p>
                        </div>
                    ) : onlineOrders && onlineOrders.length > 0 ? (
                        <div className="space-y-3">
                            {onlineOrders.map((order) => (
                                <div key={order.orderId} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">#{order.orderId}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-300">{order.items.length} items</span>
                                        <span className="font-semibold text-gray-800 dark:text-gray-100">₹{order.total}</span>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2 space-y-1">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>{item.quantity} x {item.name}{item.portion && item.portion !== 'Regular' && <span className="text-gray-400"> ({item.portion})</span>}</span>
                                                <span>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <span className="text-4xl mb-2 block">📦</span>
                            <p className="text-gray-500 dark:text-gray-400">No previous orders yet</p>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Saved Addresses</h2>
                        {isEditing && (
                            <button onClick={() => onAddAddress('profile-saved')} className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> Pick on Map
                            </button>
                        )}
                    </div>
                    <div className="space-y-3">
                        {displayProfile.savedAddresses && displayProfile.savedAddresses.length > 0 ? (
                            displayProfile.savedAddresses.map((addr) => (
                                <div key={addr.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <span className="text-xl mr-2">📍</span>
                                                <span className="font-semibold text-gray-800 dark:text-gray-100">{addr.label}</span>
                                                {addr.isDefault && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Default</span>}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 ml-7">{addr.address}</p>
                                        </div>
                                        {isEditing && (
                                            <div className="flex flex-col space-y-2 ml-2">
                                                {!addr.isDefault && <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-orange-500 hover:text-orange-600 text-xs">Set Default</button>}
                                                <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:text-red-600 text-xs">🗑 Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                                <span className="text-4xl mb-2 block">📍</span>
                                <p className="text-gray-500 dark:text-gray-400">No saved addresses yet</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Save Changes</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.05] transform">Edit Profile</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
