'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user:        User | null;
  loading:     boolean;
  signIn:      (email: string, password: string) => Promise<void>;
  signUp:      (email: string, password: string, name: string) => Promise<void>;
  signInGoogle:() => Promise<void>;
  signOut:     () => Promise<void>;
  resetPassword:(email: string) => Promise<void>;
  getIdToken:  () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
  };

  const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const getIdToken = async (): Promise<string | null> => {
    return user ? user.getIdToken() : null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInGoogle, signOut, resetPassword, getIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  return ctx;
}
