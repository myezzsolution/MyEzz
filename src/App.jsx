import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage.jsx";
import PaymentPage from "./components/PaymentPage";
import OrderSuccess from "./components/OrderSuccess";
import Header from "./components/Header.jsx";

// Auth pages
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import OTPVerification from "./auth/OTPVerification.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx"; 

function App() {
  return (
    // The <Router> is removed from here
    <AuthProvider>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OTPVerification />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;