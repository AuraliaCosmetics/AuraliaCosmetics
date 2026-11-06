/* =====================================================
   FIREBASE CONFIG - Auralia Cosmetics
===================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyCLqYXoa1ODF_MP6kfD-KmyBX-fANruqfo",
    authDomain: "auralia-cosmetics.firebaseapp.com",
    projectId: "auralia-cosmetics",
    storageBucket: "auralia-cosmetics.firebasestorage.app",
    messagingSenderId: "4240178141",
    appId: "1:4240178141:web:002e043fb877a18ab01434"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
