import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FoodDeliveryLoader = () => {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${
      isDark ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="text-center">
        {/* Main circular loader with food icons */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Outer rotating circle */}
          <div className={`absolute inset-0 border-4 rounded-full ${
            isDark ? 'border-slate-700' : 'border-orange-200'
          }`}></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          
          {/* Inner pulsing circle */}
          <div className={`absolute inset-4 rounded-full flex items-center justify-center animate-pulse ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="text-5xl">🍽️</div>
          </div>
          
          {/* Orbiting food items */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">🍕</div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '-1s' }}>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-2xl">🍔</div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '-2s' }}>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">🍜</div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '-3s' }}>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-2xl">🥗</div>
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">MyEzz</h1>
        </div>

        {/* Loading text */}
        <p className={`text-lg mb-4 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Finding delicious restaurants
        </p>
        
        {/* Progress bar */}
        <div className={`w-64 h-1.5 rounded-full mx-auto overflow-hidden ${
          isDark ? 'bg-slate-700' : 'bg-orange-200'
        }`}>
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse"></div>
        </div>

        {/* Delivery scooter animation at bottom */}
        <div className="mt-12 relative h-12">
          <div className="absolute left-0 right-0 flex items-center justify-center">
            <div className="text-4xl animate-bounce" style={{ animationDuration: '1s' }}>
              🛵
            </div>
            <div className="text-2xl ml-2 animate-pulse">💨</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDeliveryLoader;