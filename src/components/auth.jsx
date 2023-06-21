import { useState } from "react";

import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import Cookies from "universal-cookie";

import "../styles/auth.css";

const cookies = new Cookies();

export const Auth = ({ isAuth, setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <button onClick={signInWithGoogle}>Sign In With Google </button>
    </div>
  );
};
