import React, { createContext } from "react";
export const AuthContext = createContext();
import Cookies from "js-cookie";
const AuthProvider = ({ children }) => {
  const initialState =
    Cookies.get("jwt") || localStorage.getItem("authUser") || null;

  // Parse the user data and store in state
  const [user, setUser] = React.useState(
    initialState ? JSON.parse(initialState) : null
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
