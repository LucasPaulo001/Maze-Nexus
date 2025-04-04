// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9pz7yL-tArHEHqeUU3m_K1gHjUPMixqc",
  authDomain: "maze-nexus-a8f2f.firebaseapp.com",
  projectId: "maze-nexus-a8f2f",
  storageBucket: "maze-nexus-a8f2f.firebasestorage.app",
  messagingSenderId: "65845949153",
  appId: "1:65845949153:web:46b8d5976e19965a7f3da0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("Service Worker registrado com sucesso:", registration);
  })
  .catch((err) => {
    console.error("Erro ao registrar o Service Worker:", err);
  });

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permissão concedida!");
      const token = await getToken(messaging, { vapidKey: "AIzaSyC9pz7yL-tArHEHqeUU3m_K1gHjUPMixqc" });
      console.log("Token FCM:", token);
      return token;
    } else {
      console.log("Permissão negada!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter token FCM:", error);
    return null;
  }
};

// Escuta mensagens em primeiro plano
onMessage(messaging, (payload) => {
  console.log("Mensagem recebida em primeiro plano:", payload);
});

export { messaging, getToken, onMessage }