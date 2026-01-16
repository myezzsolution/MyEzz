import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { UserIcon, LogoutIcon } from './Icons';
import ThemeToggle from './ThemeToggle';

const ProfileDropdown = ({ isOpen, onToggle, onClose, onMyProfile }) => {
    const { currentUser, logout } = useAuth();
    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Load and update profile photo from localStorage
    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
        if (storedProfile) setProfilePhoto(storedProfile.profilePhoto);

        const updateProfilePhoto = () => {
            const fresh = JSON.parse(localStorage.getItem("userProfile") || "{}");
            if (fresh) setProfilePhoto(fresh.profilePhoto);
        };

        window.addEventListener("userProfileUpdated", updateProfilePhoto);

        return () => window.removeEventListener("userProfileUpdated", updateProfilePhoto);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('currentUser');
            navigate("/login");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    const userName =
        currentUser?.displayName ||
        currentUser?.email?.split("@")[0] ||
        "User";

    const userEmail = currentUser?.email || "";

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={onToggle}
                className="relative text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors p-2 rounded-full"
                style={{ minWidth: "48px", minHeight: "48px" }}
            >
                {profilePhoto ? (
                    <img
                        src={profilePhoto}
                        alt="Profile"
                        className="h-9 w-9 rounded-full object-cover"
                    />
                ) : (
                    <UserIcon className="h-6 w-6" />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] rounded-lg shadow-lg border border-gray-200 z-50">

                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200">
                        <p className="font-semibold">Hello, {userName}!</p>
                        <p className="text-sm opacity-70">{userEmail}</p>
                    </div>

                    {/* Dark Mode */}
                    <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-200 dark:border-white-700">
                        <span className="text-sm font-medium">Dark Mode</span>
                        <ThemeToggle />
                    </div>

                    {/* My Profile */}
                    <button
                        onClick={onMyProfile}
                        className="w-full flex items-center px-4 py-3 text-left hover:bg-orange-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    >
                        <UserIcon />
                        <span className="ml-3">My Profile</span>
                    </button>

                    <div className="border-t border-gray-200"></div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-left text-red-800 hover:bg-orange-400 transition-colors duration-200"
                    >
                        <LogoutIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
