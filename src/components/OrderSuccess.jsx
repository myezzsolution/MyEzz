import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const order = state?.orderData;
  const customerInfo = state?.customerInfo;
  const cartItems = state?.cart;

  if (!order || !customerInfo || !cartItems) {
    return (
      <div className="text-center mt-10 text-red-500">
        No order found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
        
        {/* Success Banner */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-2 animate-bounce">🎉</div>
          <h1 className="text-3xl font-extrabold text-orange-600">Order Placed</h1>
          <p className="text-gray-600 text-sm italic">
            Thank you for ordering with <span className="font-semibold">MyEzz</span> — tasty moments are on their way!
          </p>
        </div>

        {/* Order Info */}
        <div className="mb-4 text-center bg-orange-50 rounded-lg py-3 shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800">Order ID: #{order.orderId}</h2>
          <p className="text-sm text-gray-500">Placed on: {new Date(order.orderDate).toLocaleString()}</p>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2 border-b pb-1">👤 Customer</h3>
          <p><b>Name:</b> {customerInfo.fullName}</p>
          <p><b>Phone:</b> {customerInfo.phoneNumber}</p>
          <p><b>Email:</b> {customerInfo.emailId}</p>
          <p><b>Address:</b> {customerInfo.fullAddress}</p>
        </div>

        {/* Ordered Items */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-2 border-b pb-1">🛒 Items</h3>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden shadow">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="hover:bg-orange-50 transition">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total & Payment */}
        <div className="flex justify-between items-center font-bold text-lg mb-4 border-t pt-2">
          <span>Total:</span>
          <span className="text-red-600">₹{order.total}</span>
        </div>
        <p className="text-sm text-gray-600 mb-6">Payment: <b>{order.paymentMethod.toUpperCase()}</b></p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg shadow-lg"
          >
            🏠 Back to Home
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-lg"
          >
            🖨 Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;