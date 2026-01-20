import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // <-- Changed this line to export 'app'
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- Google Sign-in Functions ---

/**
 * Handles signing in the user with their Google account.
 * On success, the user is stored in local storage for state management.
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    localStorage.setItem('currentUser', JSON.stringify(result.user));
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// --- SMS OTP Functions ---

/**
 * Sets up an invisible reCAPTCHA verifier for phone number authentication.
 */
export const setUpRecaptcha = (containerId) => {
  // Clear existing verifier if present
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }

  // Get the container element
  const container = typeof containerId === 'string' 
    ? document.getElementById(containerId) 
    : containerId;

  if (!container) {
    throw new Error(`Recaptcha container element not found: ${containerId}`);
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    container,
    {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved:", response);
      }
    }
  );
  return window.recaptchaVerifier;
};

/**
 * Sends an SMS OTP to the specified phone number.
 */
export const sendSmsOtp = async (phoneNumber, containerId) => {
  const appVerifier = setUpRecaptcha(containerId);

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending SMS OTP:", error);
    
    // Provide user-friendly error messages for common Firebase errors
    if (error.code === 'auth/billing-not-enabled') {
      const friendlyError = new Error(
        'Phone authentication requires billing to be enabled in Firebase Console. ' +
        'Please enable billing in your Firebase project settings to use phone number authentication.'
      );
      friendlyError.code = error.code;
      throw friendlyError;
    }
    
    if (error.code === 'auth/invalid-phone-number') {
      const friendlyError = new Error('Invalid phone number format. Please use format: +91XXXXXXXXXX');
      friendlyError.code = error.code;
      throw friendlyError;
    }
    
    if (error.code === 'auth/too-many-requests') {
      const friendlyError = new Error('Too many requests. Please try again later.');
      friendlyError.code = error.code;
      throw friendlyError;
    }
    
    throw error;
  }
};

/**
 * Verifies the SMS OTP code entered by the user.
 * On success, the user is stored in local storage for state management.
 */
export const verifySmsOtp = async (code) => {
  if (!window.confirmationResult) {
    throw new Error("No OTP request found. Please request OTP again.");
  }
  try {
    const result = await window.confirmationResult.confirm(code);
    localStorage.setItem('currentUser', JSON.stringify(result.user));
    return result.user;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// --- General Auth Management ---

/**
 * Function to handle user logout.
 * Clears the user from Firebase and local storage.
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    console.log("User logged out and local storage cleared.");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

/**
 * Sets up an observer on the authentication state.
 */
export const authStateObserver = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default auth;