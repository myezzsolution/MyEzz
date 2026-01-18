import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from "../api/client";
import { ChevronLeft, MapPin, Navigation, Phone, MessageSquare } from 'lucide-react';

// IMPORTANT: User's Mapbox Token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJ5YW5zYW5nYW50aSIsImEiOiJjbWVmb2czYjIwYTYyMnZwb3N6YzVjMjR0In0.GjJodBanOGotXx3r2HUGIA';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const riderIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png', // Scooter icon
    iconSize: [45, 45],
    iconAnchor: [22.5, 45],
    popupAnchor: [0, -45],
});

const restaurantIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png', // Restaurant icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png', // User icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

// Component to auto-center map
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

const LiveTracking = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState(null);
    const [center, setCenter] = useState([19.0760, 72.8777]); // default center

    // Fetch order and keep status in sync with backend
    useEffect(() => {
        if (!orderId) return;

        let isMounted = true;

        const fetchOrder = async () => {
            try {
                const data = await getOrderById(orderId);
                if (!isMounted) return;
                setOrder(data);
                setStatus(data.status);

                if (data.dropLocation?.coordinates?.length === 2) {
                    const [lng, lat] = data.dropLocation.coordinates;
                    setCenter([lat, lng]);
                } else if (data.pickupLocation?.coordinates?.length === 2) {
                    const [lng, lat] = data.pickupLocation.coordinates;
                    setCenter([lat, lng]);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to fetch order for live tracking:", err);
            }
        };

        fetchOrder();

        const interval = setInterval(fetchOrder, 5000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [orderId]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-4 shadow-sm z-[1001] flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 dark:text-gray-200" />
                </button>
                <div>
                    <h1 className="text-lg font-bold dark:text-white">Track Order #{orderId}</h1>
                    <p className="text-xs text-orange-500 font-semibold uppercase tracking-tight">
                        {status || "Fetching latest status..."}
                    </p>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative z-0 min-h-[500px]">
                <MapContainer
                    center={center}
                    zoom={15}
                    style={{ height: 'calc(100vh - 80px)', width: '100%' }}
                    zoomControl={false}
                    className="z-0"
                >
                    {/* Mapbox "Streets" tiles inside Leaflet engine */}
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
                        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        tileSize={512}
                        zoomOffset={-1}
                    />

                    {order?.pickupLocation?.coordinates?.length === 2 && (
                        <Marker
                            position={[
                                order.pickupLocation.coordinates[1],
                                order.pickupLocation.coordinates[0],
                            ]}
                            icon={restaurantIcon}
                        >
                            <Popup>Pickup: {order.pickupAddress}</Popup>
                        </Marker>
                    )}

                    {order?.dropLocation?.coordinates?.length === 2 && (
                        <Marker
                            position={[
                                order.dropLocation.coordinates[1],
                                order.dropLocation.coordinates[0],
                            ]}
                            icon={userIcon}
                        >
                            <Popup>Drop: {order.dropAddress}</Popup>
                        </Marker>
                    )}

                    <ChangeView center={center} />
                </MapContainer>

                {/* Status Overlay */}
                <div className="absolute bottom-6 left-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 z-[1000] border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm">
                                    <Navigation className="w-7 h-7 text-orange-600" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                            </div>
                            <div>
                                <p className="text-sm font-black dark:text-white uppercase tracking-tight">Arriving in 8 mins</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Rider Rahul is near your area</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-600 dark:text-gray-200 hover:bg-orange-50 transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-95">
                                <MessageSquare className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Delivering To</p>
                                <p className="text-sm font-semibold dark:text-gray-200 leading-tight">Sector 14, Vashi, Navi Mumbai, Maharashtra 400703</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .leaflet-container {
                    background: #f3f4f6;
                    cursor: default;
                }
            `}</style>
        </div>
    );
};

export default LiveTracking;
