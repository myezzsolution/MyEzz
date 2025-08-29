import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config — logs a warning if any value is missing
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "MISSING_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "MISSING_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "MISSING_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "MISSING_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "MISSING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "MISSING_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "MISSING_MEASUREMENT_ID"
};

// Log config to help debug
console.log("🔧 Firebase Configuration Check:");
console.log("API Key:", firebaseConfig.apiKey !== "MISSING_API_KEY" ? "✅ Present" : "❌ Missing");
console.log("Auth Domain:", firebaseConfig.authDomain !== "MISSING_AUTH_DOMAIN" ? "✅ Present" : "❌ Missing");
console.log("Project ID:", firebaseConfig.projectId !== "MISSING_PROJECT_ID" ? "✅ Present" : "❌ Missing");
console.log("App ID:", firebaseConfig.appId !== "MISSING_APP_ID" ? "✅ Present" : "❌ Missing");

  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

console.log("✅ Firebase Auth initialized");
console.log("✅ Google Provider configured");