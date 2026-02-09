import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, X, Loader2 } from 'lucide-react';

// Mapbox token from environment
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function LocationSearchBar({ showToast }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // Debounced Mapbox Geocoding search
  const searchLocations = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2 || !MAPBOX_TOKEN) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&country=IN&limit=6&types=place,locality,neighborhood,address`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const formattedSuggestions = data.features.map((feature, index) => ({
          id: feature.id || index,
          name: feature.place_name,
          shortName: feature.text,
          type: feature.place_type?.[0] || 'Location',
          coordinates: feature.center, // [lng, lat]
        }));
        setSuggestions(formattedSuggestions);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Mapbox geocoding error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce the search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length >= 2) {
      debounceRef.current = setTimeout(() => {
        searchLocations(query);
      }, 300);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }

    setSelectedIndex(-1);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, searchLocations]);

  const handleSelect = (location) => {
    setQuery(location.name);
    setIsOpen(false);
    
    // Store selected location for later use
    localStorage.setItem('myezz_selected_location', JSON.stringify({
      name: location.name,
      coordinates: location.coordinates,
    }));
    
    redirectToLogin();
  };

  const redirectToLogin = () => {
    if (showToast) {
      showToast('Please login to order your favourite food', 'info');
    }
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (query.length > 0) {
        redirectToLogin();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      redirectToLogin();
    }
  };

  // Format location type for display
  const formatType = (type) => {
    const typeMap = {
      place: 'City',
      locality: 'Area',
      neighborhood: 'Neighborhood',
      address: 'Address',
    };
    return typeMap[type] || 'Location';
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative flex items-center bg-white rounded-xl border-2 border-orange-200 shadow-lg shadow-orange-100/50 focus-within:border-orange-400 focus-within:shadow-orange-200/70 transition-all">
        <MapPin className="absolute left-4 w-5 h-5 text-orange-500 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          placeholder="Enter delivery location..."
          className="w-full pl-12 pr-32 py-3.5 bg-transparent text-gray-800 placeholder-gray-400 rounded-xl focus:outline-none text-sm sm:text-base truncate"
        />
        {/* Loading or Clear button */}
        <div className="absolute right-[100px] flex items-center">
          {isLoading && (
            <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
          )}
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => { setQuery(''); setSuggestions([]); setIsOpen(false); }}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="absolute right-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Find Food
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
          {suggestions.map((location, index) => (
            <button
              key={location.id}
              type="button"
              onClick={() => handleSelect(location)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                index === selectedIndex
                  ? 'bg-orange-50 text-orange-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{location.shortName || location.name.split(',')[0]}</p>
                <p className="text-xs text-gray-400 truncate">{location.name}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{formatType(location.type)}</span>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50 p-4 text-center">
          <p className="text-gray-500 text-sm">No locations found. Try a different search.</p>
        </div>
      )}
    </form>
  );
}
