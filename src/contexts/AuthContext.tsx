import React, { createContext, useContext, useState, useEffect } from "react";
// Mock auth types until Firebase is properly set up
type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

type UserRole = "student" | "instructor" | "admin";

interface AuthUser extends User {
  role?: UserRole;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isAuthenticated: false,
  userRole: null,
});

export const useAuth = () => useContext(AuthContext);

// Mock auth service until Firebase is properly set up
const auth = {
  currentUser: null,
  onAuthStateChanged: (auth: any, callback: (user: User | null) => void) => {
    // Simulate a logged-in user
    const mockUser: User = {
      uid: "mock-user-id",
      displayName: "Alex Johnson",
      email: "alex@example.com",
      photoURL: null,
    };

    // Call the callback with the mock user
    setTimeout(() => callback(mockUser), 500);

    // Return a function to unsubscribe (mock)
    return () => {};
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(auth, (user) => {
      if (user) {
        // In a real app, you would fetch the user's role from your database
        // For now, we'll default to 'student' role
        const authUser = user as AuthUser;
        authUser.role = "student";
        setCurrentUser(authUser);
        setUserRole(authUser.role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    userRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
