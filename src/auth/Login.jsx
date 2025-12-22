import React, { useState } from "react";
import { signInWithGoogle } from "./authService";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const user = await signInWithGoogle();
      
      const userData = {
        uid: user.uid,
        phone: user.phoneNumber || "",
        displayName: user.displayName || "",
        email: user.email || "",
      };
      
      localStorage.setItem("myezz_user", JSON.stringify(userData));
      
      setToast({
        show: true,
        message: `Welcome back, ${user.displayName || 'User'}! 🎉`,
        type: "success"
      });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      setError(`Sign-in failed: ${error.message}`);
      
      setToast({
        show: true,
        message: "Sign-in failed. Please try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
    setTimeout(() => {
      navigate("/register");
    }, 300);
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-400 to-red-500 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center px-12 w-full">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">MyEzz</h1>
            <p className="text-xl opacity-90 text-white drop-shadow-md">Delicious food delivered to your doorstep</p>
          </div>
          
          <div className="flex justify-between items-center w-full max-w-md">
            <div className="flex justify-center items-center">
              <img src="/spoonandfork355-zham.svg" alt="Spoon" className="w-48 h-48 transform -rotate-12" />
            </div>
            
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-200"></div>
              </div>
            </div>
            
            <div className="flex justify-center items-center">
              <img src="/spoonandfork322-728kk.svg" alt="Fork" className="w-48 h-48 transform rotate-12" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">MyEzz</h1>
            <p className="text-gray-600">Welcome back!</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Sign in to continue to MyEzz</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 py-4 px-6 rounded-xl text-lg font-medium shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                Signing in...
              </>
            ) : (
              <>
                <img 
                  src="/googlelogo354-ccx-200w.png" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                Continue with Google
              </>
            )}
          </button>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={handleSignUpClick}
                className={`text-orange-500 hover:text-orange-600 font-medium transition-all duration-300 ${
                  isSignUpClicked 
                    ? 'scale-110 ring-4 ring-orange-200 bg-orange-50 px-3 py-1 rounded-lg' 
                    : 'hover:scale-105'
                }`}
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />
    </div>
  );
}
