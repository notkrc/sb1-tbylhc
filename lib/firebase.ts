import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on client side with error handling
export const initializeFirebase = () => {
  try {
    if (typeof window === 'undefined') return null;
    return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
};

export async function requestNotificationPermission() {
  try {
    if (typeof window === 'undefined') return null;
    
    const app = initializeFirebase();
    if (!app) return null;

    const messaging = getMessaging(app);
    
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error('Notification permission error:', error);
    return null;
  }
}

export function onMessageListener() {
  try {
    if (typeof window === 'undefined') return () => {};
    
    const app = initializeFirebase();
    if (!app) return () => {};

    const messaging = getMessaging(app);

    return onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'New Notification', {
          body: payload.notification?.body,
          icon: '/icon-192x192.png',
        });
      }
    });
  } catch (error) {
    console.error('Message listener error:', error);
    return () => {};
  }
}