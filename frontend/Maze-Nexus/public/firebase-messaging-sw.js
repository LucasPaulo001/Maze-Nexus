importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js")

firebase.initializeApp({
    apiKey: "AIzaSyC9pz7yL-tArHEHqeUU3m_K1gHjUPMixqc",
    authDomain: "maze-nexus-a8f2f.firebaseapp.com",
    projectId: "maze-nexus-a8f2f",
    storageBucket: "maze-nexus-a8f2f.firebasestorage.app",
    messagingSenderId: "65845949153",
    appId: "1:65845949153:web:46b8d5976e19965a7f3da0"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem recebida em segundo plano:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  })
})