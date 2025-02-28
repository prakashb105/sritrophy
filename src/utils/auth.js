import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// Function to track authentication state
export const trackAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};