import axios from "axios";

// Central Backend URL - Single source of truth for all order operations
const CENTRAL_BACKEND_URL = import.meta.env.VITE_CENTRAL_BACKEND_URL || "http://localhost:5050";

const orderApiClient = axios.create({
  baseURL: CENTRAL_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Submit order to Central Backend
export const submitOrderToRider = async (orderData) => {
  const response = await orderApiClient.post("/api/orders", orderData);
  return response.data;
};

// Get order status by ID
export const getOrderStatus = async (orderId) => {
  const response = await orderApiClient.get(`/api/orders/${orderId}`);
  return response.data;
};

// Get all available orders
export const getAvailableOrders = async () => {
  const response = await orderApiClient.get("/api/orders/available");
  return response.data;
};

// Get orders for a specific user
export const getOrdersByUser = async (userId) => {
  const response = await orderApiClient.get(`/api/orders/user/${userId}`);
  return response.data;
};

export default orderApiClient;
