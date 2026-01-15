import React from 'react';
import { MapPin } from 'lucide-react';
import logo from './myezzlogopage0001removebgpreview2329-xmz0h-400w.png';
import { SearchIcon, CartIcon } from './Icons';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ onCartClick, cartItems, searchQuery, onSearchChange, isProfileOpen, onProfileToggle, onProfileClose, onMyProfile, onLogoClick, userLocation, onLocationClick }) => (
  <header className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] 
    shadow-sm p-2 px-4 sm:p-4 sm:px-8 flex justify-between items-center sticky top-0 z-50 transition-colors duration-200">

    <div className="flex items-center gap-4">
      <button onClick={onLogoClick} className="focus:outline-none"><img src={logo} alt="MyEzz Logo" className="h-10 sm:h-20" /></button>
      <button
        onClick={onLocationClick}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all group max-w-[120px] sm:max-w-[200px]"
      >
        <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 dark:text-orange-400 group-hover:text-white" />
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-0.5 sm:mb-1">Deliver to</p>
          <p className="text-xs sm:text-sm font-bold dark:text-gray-200 truncate">{userLocation?.address?.split(',')[0] || 'Set Loc...'}</p>
        </div>
      </button>
    </div>

    <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] relative flex-1 max-w-xl mx-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search for restaurants..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
    <div className="flex items-center space-x-3">
      <button onClick={onCartClick} className="relative text-gray-600 dark:text-gray-300 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hidden md:block transition-colors duration-200">
        <CartIcon />
        {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>}
      </button>
      <ProfileDropdown
        isOpen={isProfileOpen}
        onToggle={onProfileToggle}
        onClose={onProfileClose}
        onMyProfile={onMyProfile}
      />
    </div>
  </header>
);

export default Header;
