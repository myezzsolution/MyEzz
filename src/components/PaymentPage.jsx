import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Wallet, CheckCircle2, ShieldCheck, Lock } from "lucide-react"; // icons

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
        status: "Pending",
        orderDate: new Date().toISOString(),
      };

      await fetch("https://script.google.com/macros/s/AKfycbxxADuwMi-lic8k2zF2OZurU3deGO_RRSopTFp7b6o0ulda8CPrLDqZUGdBBhL_6qQj/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        mode: "no-cors",
      });

      // Update user profile in localStorage
      try {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
          const userProfile = JSON.parse(savedProfile);
          const updatedProfile = {
            ...userProfile,
            currentOrder: orderData,
            totalOrders: (userProfile.totalOrders || 0) + 1,
          };
          localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        }
      } catch (err) {
        console.error("Error updating user profile:", err);
      }


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

  if (!customerInfo || !cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-full inline-flex mb-2">
            <Wallet className="w-12 h-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Go back and add some delicious food!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-200/50 dark:shadow-orange-900/30 transform hover:-translate-y-1"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Payment Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-fit">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white/10 blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Payment Method</h2>
              <p className="text-orange-100 text-sm mt-1 opacity-90">Select how you'd like to pay</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              {/* Card/UPI Option */}
              <div
                onClick={() => setMethod("card")}
                className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                  ${method === "card"
                    ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/20 shadow-lg scale-[1.02]"
                    : "border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
              >
                <div className={`p-3.5 rounded-xl mr-4 transition-colors duration-300 ${method === "card" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base ${method === "card" ? "text-orange-700 dark:text-orange-400" : "text-gray-800 dark:text-gray-200"}`}>Pay Online</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">UPI, Cards, Netbanking</p>
                </div>
                {method === "card" && (
                  <div className="bg-orange-500 rounded-full p-1">
                    <CheckCircle2 className="text-white" size={16} />
                  </div>
                )}
              </div>

              {/* COD Option */}
              <div
                onClick={() => setMethod("cod")}
                className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 group
                  ${method === "cod"
                    ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/20 shadow-lg scale-[1.02]"
                    : "border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
              >
                <div className={`p-3.5 rounded-xl mr-4 transition-colors duration-300 ${method === "cod" ? "bg-orange-500 text-white shadow-md" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
                  <Wallet size={24} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base ${method === "cod" ? "text-orange-700 dark:text-orange-400" : "text-gray-800 dark:text-gray-200"}`}>Cash on Delivery</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pay at your doorstep</p>
                </div>
                {method === "cod" && (
                  <div className="bg-orange-500 rounded-full p-1">
                    <CheckCircle2 className="text-white" size={16} />
                  </div>
                )}
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/30 py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
              <Lock size={14} className="mr-2 text-green-500" />
              <span className="font-medium">Payments are 100% secure and encrypted</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={loading}
              className={`w-full py-4 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 transform active:scale-[0.98]
                ${loading
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-200/50 dark:shadow-orange-900/30 hover:shadow-orange-300/50"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${total}`
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-fit">
          <div className="p-6 sm:p-8 bg-gray-50/50 dark:bg-gray-800/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} x ₹{item.price}
                      {item.portion && ` • ${item.portion}`}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span className="text-orange-600 dark:text-orange-400">₹{total}</span>
              </div>
            </div>

            {/* Customer Info Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Delivering To</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Name:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {customerInfo?.fullName || customerInfo?.name || "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {customerInfo?.phoneNumber || customerInfo?.phone || "Not provided"}
                  </span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {customerInfo?.emailId || customerInfo?.email || "Not provided"}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Address:</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 leading-relaxed">
                    {customerInfo?.fullAddress || customerInfo?.address || "Address not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PaymentPage;