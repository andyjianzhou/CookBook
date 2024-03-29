import React, { useContext, useEffect, useState } from "react";
import {auth}  from '../../firebase';
import { User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import axios from "../Utilities/axiosConfig";
import UserServices from "../Services/UserServices";

interface IAuthContextProps {
  currentUser: FirebaseUser | null | undefined;
  csrfToken: string | null;
  signUp: (email: string, password: string, checkBoxToggle: boolean, displayName: string) => void;
  login: (email: string, password: string) => void;
  logOut: () => void;
}


async function fetchCSRFToken() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/get-csrf/');
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}

const AuthContext = React.createContext<IAuthContextProps>({
  currentUser: null,
  csrfToken: null,
  signUp: () => {},
  login:() => {},
  logOut: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [currentUser, setCurrentUser] = useState<IAuthContextProps | null> ({
    currentUser: null,
    csrfToken: null,
    signUp: () => {},
    login: () => {},
    logOut: () => {}
  })
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCSRFToken] = useState<string | null>(null);

  const userServices = new UserServices();

  useEffect(() => {
    async function initialize() {
      const token = await fetchCSRFToken();
      setCSRFToken(token);
    }
    
    initialize();
  
  }, []);
    
  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = user.email;
        console.log("User: " + email, " signed in successfully")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorMessage + " Error Code: " + errorCode)
      });
  }

  async function signUp(email: string, password: string, checkBoxToggle: boolean, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        try {
            await updateProfile(user, { displayName: displayName });
            console.log("User display name updated successfully.");
        } catch (error) {
            console.error("Error updating user display name:", error);
        }

        console.log(`User: ${email} signed up successfully with username: ${displayName}`);

        const userProfileData = {
            firebase_uid: user.uid,
            username: displayName,
            email: user.email,
        };

        const registeredUser = await userServices.register(userProfileData, csrfToken)
        console.log("User registered successfully:", registeredUser)

        if (checkBoxToggle) {
            console.log("User wants to receive updates via email");
            // TODO: Store user email in postgresql database and the user's id + preferences.
        } else {
            console.log("User does not want to receive updates via email");
        }

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error:", errorMessage, "Error Code:", errorCode);
    }
}


  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser({  
      currentUser: user,
      csrfToken: csrfToken,
      signUp: signUp,
      login: login,
      logOut: logOut
      });
    setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser: currentUser?.currentUser,
    csrfToken: csrfToken,
    signUp,
    login,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}