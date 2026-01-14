import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, Search, MapPin, Navigation } from 'lucide-react';

// IMPORTANT: User's Mapbox Token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Fix for default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationSelector = ({ isOpen, onClose, onLocationSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [geoError, setGeoError] = useState(null);
    const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]); // Mumbai [lat, lng]

    const reverseGeocode = async (lat, lng) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const address = data.features[0].place_name;
                setSelectedAddress({ address, lng, lat });
                setSearchQuery(address);
                setMapCenter([lat, lng]);
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=IN&limit=5`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const selectSuggestion = (feature) => {
        const [lng, lat] = feature.center;
        const address = feature.place_name;

        setSelectedAddress({ address, lng, lat });
        setSearchQuery(address);
        setSuggestions([]);
        setMapCenter([lat, lng]);
    };

    const detectMyLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setGeoError(null);
                    reverseGeocode(latitude, longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setLoading(false);
                    if (error.code === 1) {
                        setGeoError("Permission denied. Please allow location access in your browser settings.");
                    } else if (error.code === 2) {
                        setGeoError("Position unavailable. Make sure your GPS is on.");
                    } else if (error.code === 3) {
                        setGeoError("Request timed out. Please try again.");
                    } else {
                        setGeoError("An unknown error occurred while detecting location.");
                    }
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setGeoError("Geolocation is not supported by your browser.");
        }
    };

    // Component to handle marker and map events
    function MapEvents() {
        useMapEvents({
            click(e) {
                reverseGeocode(e.latlng.lat, e.latlng.lng);
            }
        });
        return null;
    }

    function MapUpdater({ center }) {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
        }, [center, map]);
        return null;
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full sm:h-[600px]">

                {/* Search Side */}
                <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 z-10 bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-black dark:text-white tracking-tight">Set Location</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <X className="w-6 h-6 dark:text-gray-400" />
                        </button>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search area, landmark or street"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-sm dark:text-white shadow-inner"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide max-h-[40vh] md:max-h-full">
                        {suggestions.length > 0 ? (
                            suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => selectSuggestion(s)}
                                    className="w-full flex items-start gap-3 p-3 sm:p-4 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-2xl transition-all text-left group"
                                >
                                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-orange-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold dark:text-white">{s.text}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{s.place_name}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="py-2 text-center">
                                <button
                                    onClick={detectMyLocation}
                                    className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 font-bold rounded-2xl hover:bg-orange-100 transition-all active:scale-95"
                                >
                                    <Navigation className="w-5 h-5" />
                                    Use current location
                                </button>
                                {geoError && (
                                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] sm:text-xs rounded-xl border border-red-100 dark:border-red-900/20">
                                        <p className="font-bold mb-1">Location Error</p>
                                        <p>{geoError}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-2 pb-2 md:pb-0">
                        <button
                            onClick={() => {
                                if (selectedAddress) {
                                    onLocationSelect(selectedAddress);
                                    onClose();
                                }
                            }}
                            disabled={!selectedAddress || loading}
                            className={`w-full py-3 sm:py-4 rounded-2xl font-black uppercase tracking-wider transition-all
                                ${!selectedAddress || loading
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 hover:bg-orange-600 active:scale-95'}`}
                        >
                            {loading ? 'Fetching Address...' : 'Confirm Location'}
                        </button>
                    </div>
                </div>

                {/* Map Side */}
                <div className="flex-1 relative min-h-[30vh] md:min-h-full">
                    <MapContainer
                        center={mapCenter}
                        zoom={16}
                        className="w-full h-full"
                        zoomControl={false}
                    >
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
                            tileSize={512}
                            zoomOffset={-1}
                        />
                        <Marker position={mapCenter} interactive={false} />
                        <MapEvents />
                        <MapUpdater center={mapCenter} />
                    </MapContainer>
                    <div className="absolute bottom-4 left-4 right-4 md:top-4 md:bottom-auto md:left-4 md:right-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm dark:text-white border border-gray-100 dark:border-gray-700 pointer-events-none text-center md:text-left">
                        Tap map to pick location
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSelector;
