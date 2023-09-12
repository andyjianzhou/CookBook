import React, { useContext, useEffect, useState } from "react";
import {auth}  from '../../firebase';
import { User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import axios from "../Utilities/axiosConfig";

interface IAuthContextProps {
  currentUser: FirebaseUser | null | undefined;
  signUp: (email: string, password: string, checkBoxToggle: boolean, displayName: string) => void;
  login: (email: string, password: string) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<IAuthContextProps>({
  currentUser: null,
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
    signUp: () => {},
    login: () => {},
    logOut: () => {}
  })
  const [loading, setLoading] = useState(true);
  
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

        // TODO: Put this into a service file.
        axios.post('http://127.0.0.1:8000/api/user/', userProfileData)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });

        console.log("User profile created successfully in the backend");

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