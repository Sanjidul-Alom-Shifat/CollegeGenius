import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail, GithubAuthProvider } from "firebase/auth";
import app from "../Firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // for create user
    const CreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // for login user
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // for log out user
    const LogOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const Unsubcribe = onAuthStateChanged(auth, (LoggedUser) => {
            console.log(LoggedUser);
            setUser(LoggedUser);
            setLoading(false);
        })
        return () => {
            Unsubcribe();
        }
    }, []);

    // user profile update
    // const UpdateUserData = (user, name, photo) => {
    //     setLoading(true);
    //     return updateProfile(user, name, photo);
    // }
    const UpdateUserData = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    // reset password
    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
      }

    // google sign in
    const GoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // github sign in
    const GithubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }


    const authInfo = {
        user,
        CreateUser,
        LoginUser,
        LogOutUser,
        UpdateUserData,
        GoogleSignIn,
        loading,
        resetPassword,
        GithubSignIn
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
