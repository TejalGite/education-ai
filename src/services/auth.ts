import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Sign up with email and password
export const signUpWithEmail = async (
  data: SignUpData,
): Promise<UserCredential> => {
  const { email, password, displayName } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  // Update the user's profile with the display name
  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName,
    });
  }

  return userCredential;
};

// Sign in with email and password
export const signInWithEmail = async (
  data: SignInData,
): Promise<UserCredential> => {
  const { email, password } = data;
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

// Sign out
export const logOut = async (): Promise<void> => {
  return signOut(auth);
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Confirm password reset with code and new password
export const confirmPasswordResetWithCode = async (
  code: string,
  newPassword: string,
): Promise<void> => {
  return confirmPasswordReset(auth, code, newPassword);
};
