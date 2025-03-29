import { getApp, getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF52Ah0ERtBRalBWwAOgEMPUhjKrlpVvo",
  authDomain: "brandsinfo-1ddff.firebaseapp.com",
  projectId: "brandsinfo-1ddff",
  storageBucket: "brandsinfo-1ddff.firebasestorage.app",
  messagingSenderId: "173382559812",
  appId: "1:173382559812:web:3ea4ee55be2700c48d3411",
  measurementId: "G-JX8KS3LYPD",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth };
