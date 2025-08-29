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
  apiKey: "AIzaSyBiUE7lLboC8aD0hf05FFaM31S8QLGqvX0",
  authDomain: "myezz-login-page.firebaseapp.com",
  projectId: "myezz-login-page",
  storageBucket: "myezz-login-page.firebasestorage.app",
  messagingSenderId: "207138053403",
  appId: "1:207138053403:web:01a4f4513d5d72c11c47be",
  measurementId: "G-H9C990CM80"
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
    return result;
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
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId,
    {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved:", response);
      }
    },
    auth
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