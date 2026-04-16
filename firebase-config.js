const firebaseConfig = {
  apiKey: "AIzaSyB2mGeVeJessBfbz2FL3q5gwO-oBrc670Y",
  authDomain: "bookofjob.firebaseapp.com",
  projectId: "bookofjob",
  storageBucket: "bookofjob.firebasestorage.app",
  messagingSenderId: "212169652108",
  appId: "1:212169652108:web:63b9c4002a44852d72c8a9"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });
}

function updateNavAuth(user) {
  const loginBtn = document.getElementById('nav-login-btn');
  const userInfo = document.getElementById('nav-user-info');
  const userName = document.getElementById('nav-user-name');
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (!loginBtn) return;
  if (user) {
    loginBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = user.displayName || user.email.split('@')[0];
  } else {
    loginBtn.style.display = 'inline-block';
    if (userInfo) userInfo.style.display = 'none';
  }
}

auth.onAuthStateChanged(user => {
  updateNavAuth(user);
});
