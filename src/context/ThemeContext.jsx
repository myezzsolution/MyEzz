import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Initialize theme with a proper fallback mechanism
    const [theme, setTheme] = useState(() => {
        try {
            // First try to get from localStorage
            const savedTheme = localStorage.getItem('myezz_theme');
            if (savedTheme) {
                console.log('Theme loaded from localStorage:', savedTheme);
                return savedTheme;
            }
            
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log('Using system preference: dark');
                return 'dark';
            }
            
            console.log('Defaulting to light theme');
            return 'light';
        } catch (error) {
            console.error('Error initializing theme:', error);
            return 'light'; // Safe fallback
        }
    });

    // Apply theme changes to document and localStorage
    useEffect(() => {
        try {
            console.log('Applying theme:', theme);
            // Apply theme to document root
            const root = document.documentElement;
            
            if (theme === 'dark') {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
                root.classList.add('light');
            }
            
            // Save to localStorage
            localStorage.setItem('myezz_theme', theme);
            console.log('Theme saved to localStorage');
        } catch (error) {
            console.error('Error applying theme:', error);
        }
    }, [theme]);

    // Toggle theme function with error handling
    const toggleTheme = () => {
        try {
            console.log('Toggle theme called, current theme:', theme);
            setTheme(prevTheme => {
                const newTheme = prevTheme === 'light' ? 'dark' : 'light';
                console.log('Switching to theme:', newTheme);
                return newTheme;
            });
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        setTheme // Expose setTheme for direct theme changes if needed
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
