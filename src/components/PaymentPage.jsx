import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Wallet } from "lucide-react"; // icons

function PaymentPage() {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Fix: Declare the loading state
  const navigate = useNavigate();
  const { state } = useLocation();
  const { customerInfo, cart } = state || {};

  const subtotal = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  const placeOrder = async () => {
    setLoading(true); // ✅ Set loading to true
    try {
      const orderItems = cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        vendor: item.vendor,
        portion: item.portion || "Regular",
        preference: item.jain ? "Jain" : "Non-Jain",
        total: item.price * item.quantity,
      }));

      const orderData = {
        orderId: Math.floor(100000 + Math.random() * 900000),
        customer: customerInfo,
        items: orderItems,
        total,
        paymentMethod: method,
        orderDate: new Date().toISOString(),
      };

      await fetch("https://script.google.com/macros/s/AKfycbxxADuwMi-lic8k2zF2OZurU3deGO_RRSopTFp7b6o0ulda8CPrLDqZUGdBBhL_6qQj/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        mode: "no-cors",
      });

      navigate("/success", {
        state: {
          orderData,
          customerInfo,
          cart,
        },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      // You could also show a user-facing error message here
    } finally {
      setLoading(false); // ✅ Set loading back to false
    }
  };

  const handlePay = async () => {
    if (!method) return alert("Select payment method");

    if (method === "cod") {
      await placeOrder();
      return;
    }

    const options = {
      key: "rzp_live_UnqqNKF8XycJ4L",
      amount: total * 100,
      currency: "INR",
      name: "MyEzz",
      description: "Order Payment",
      handler: async (response) => {
        setLoading(true); // ✅ Set loading to true for Razorpay handler
        try {
          await placeOrder();
        } catch (error) {
          console.error("Payment handler error:", error);
        } finally {
          setLoading(false); // ✅ Set loading back to false
        }
      },
      prefill: {
        name: customerInfo.fullName,
        email: customerInfo.emailId,
        contact: customerInfo.phoneNumber,
      },
      theme: { color: "#db5a19ff" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!customerInfo || !cart) {
    return <p className="text-center mt-10 text-red-500">Missing order data</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg p-4 shadow-md text-center mb-6">
        <h2 className="text-2xl font-bold">Choose Payment Method</h2>
        <p className="text-sky-100 mt-1">Secure and fast checkout</p>
      </div>

      {/* Payment Options */}
      <div className="space-y-4 mb-8">
        <div
          onClick={() => setMethod("card")}
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
            method === "card" ? "border-sky-500 bg-sky-50" : "border-gray-200"
          }`}
        >
          <CreditCard className="text-sky-600 mr-3" size={28} />
          <div>
            <h3 className="font-semibold">Credit / Debit Card/UPI</h3>
            <p className="text-sm text-gray-500">Pay securely with your card</p>
          </div>
        </div>

        <div
          onClick={() => setMethod("cod")}
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
            method === "cod" ? "border-sky-500 bg-sky-50" : "border-gray-200"
          }`}
        >
          <Wallet className="text-sky-600 mr-3" size={28} />
          <div>
            <h3 className="font-semibold">Cash on Delivery</h3>
            <p className="text-sm text-gray-500">Pay when you receive your order</p>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-[1.02] hover:shadow-xl"
          }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default PaymentPage;