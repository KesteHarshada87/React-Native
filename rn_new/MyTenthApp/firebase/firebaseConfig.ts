
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCA-jC_SKsx1KaixfkiAKuqqoa3STvv1uU",
  authDomain: "mytenthapp-61106.firebaseapp.com",
  projectId: "mytenthapp-61106",
  storageBucket: "mytenthapp-61106.firebasestorage.app",
  messagingSenderId: "315264087011",
  appId: "1:315264087011:web:cbefe115c9f20b6b91e6d6",
  measurementId: "G-7MDLVZZ3Y7"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
})();

export { app, auth };
