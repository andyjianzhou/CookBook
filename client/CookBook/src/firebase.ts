import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';

if (import.meta.env.VITE_FIREBASE_API_KEY != 'AIzaSyA_Tm2ifeD0O0zMbWkJ9dnFEIA129kvbg0') {
    console.log("Firebase API key is not set. Please set it in .env file")
}
const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

export const auth = getAuth();
export default app;