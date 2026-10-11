import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB9IIGxzTlSgDJS60zmrjNgk1VSLWmfClQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "portfolio-8a020.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "portfolio-8a020",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "portfolio-8a020.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "672925438613",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:672925438613:web:51548ccbf34b3c0810419c",
};

// Singleton initialization pattern to prevent multiple instances on Next.js HMR
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface LeadSubmission {
  name: string;
  email: string;
  projectType: string;
  message: string;
  clientMetadata?: {
    userAgent?: string;
    referrer?: string;
    language?: string;
    screenResolution?: string;
    timeZone?: string;
  };
}

/**
 * Writes an inquiry directly to Cloud Firestore `leads` collection.
 */
export async function saveLeadToFirestore(data: LeadSubmission): Promise<string> {
  const leadsRef = collection(db, "leads");
  const docRef = await addDoc(leadsRef, {
    name: data.name.trim(),
    email: data.email.trim(),
    projectType: data.projectType,
    message: data.message.trim(),
    submittedAt: serverTimestamp(),
    status: "new",
    clientMetadata: data.clientMetadata || {},
  });
  return docRef.id;
}
