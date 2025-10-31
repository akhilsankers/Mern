import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, logoutUser } from "../api/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current logged user
  const fetchUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔄 Allow components (like login) to refresh the user immediately
  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, loading, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
