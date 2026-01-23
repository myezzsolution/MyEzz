/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
        return null;
    }

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Get distance from user location to restaurant
 * @param {Object} userLocation - User location object with lat and lng
 * @param {Object} restaurant - Restaurant object with latitude and longitude
 * @returns {number|null} Distance in kilometers or null if not available
 */
export function getRestaurantDistance(userLocation, restaurant) {
    if (!userLocation || !userLocation.lat || !userLocation.lng) {
        return null;
    }

    // Check if restaurant has coordinates
    const restaurantLat = restaurant.latitude || restaurant.lat;
    const restaurantLng = restaurant.longitude || restaurant.lng || restaurant.lon;

    if (!restaurantLat || !restaurantLng) {
        return null;
    }

    return calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurantLat,
        restaurantLng
    );
}
