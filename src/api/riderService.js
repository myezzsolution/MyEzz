import axios from "axios";

const RIDER_BACKEND_URL = import.meta.env.VITE_RIDER_BACKEND_URL;

const riderApiClient = axios.create({
  baseURL: RIDER_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Submit order to rider system
export const submitOrderToRider = async (orderData) => {
  const response = await riderApiClient.post("/api/orders", orderData);
  return response.data;
};

// Get order status by ID
export const getOrderStatus = async (orderId) => {
  const response = await riderApiClient.get(`/api/orders/${orderId}`);
  return response.data;
};

// Get all available orders
export const getAvailableOrders = async () => {
  const response = await riderApiClient.get("/api/orders/available");
  return response.data;
};

export default riderApiClient;
