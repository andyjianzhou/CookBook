import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import {auth}  from '../../firebase';
import { User as FirebaseUser , getAuth, createUserWithEmailAndPassword, UserCredential, User } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

interface IAuthContextProps {
  currentUser: FirebaseUser | null | undefined;
  signUp: (email: string, password: string, checkBoxToggle: boolean) => void;
}

const AuthContext = React.createContext<IAuthContextProps>({
  currentUser: null,
  signUp: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [currentUser, setCurrentUser] = useState<IAuthContextProps | null> ({
    currentUser: null,
    signUp: () => {},
  })
  const [loading, setLoading] = useState(true);
  
  function signUp(email: string, password: string, checkBoxToggle: boolean) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const email = user.email;
          console.log("User: " + email, " signed up successfully")
          
          // Write code to redirect to dashboard page
          
          if (checkBoxToggle) {
            console.log("User wants to receive updates via email")
            // store user email in database
          } else {
            console.log("User does not want to receive updates via email")
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error: " + errorMessage)
        });
        if (checkBoxToggle) {
          console.log("User wants to receive updates via email")
          // store user email in database
          // create a email service in the future using django mail service
        }
  }  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser({  
      currentUser: user,
      signUp: signUp 
      });
    setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser: currentUser?.currentUser,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )

}
// const firebaseConfig = {
//   // Your Firebase config here
// };

// firebase.initializeApp(firebaseConfig);

// interface AuthContextProps {
//   currentUser: firebase.User | null;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//   currentUser: null,
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return unsubscribe;
//   }, []);

//   async function signInWithGoogle() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     await firebase.auth().signInWithPopup(provider);
//   }

//   async function signOut() {
//     await firebase.auth().signOut();
//   }

//   const value = {
//     currentUser,
//     signInWithGoogle,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
