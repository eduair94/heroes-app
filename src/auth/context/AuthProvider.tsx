import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { types } from "../types/types";

interface AuthProviderProps {
  children: React.ReactNode;
}

const initialState = {
  logged: false,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  useEffect(() => {
    if (!authState.user) localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(authState.user));
  }, [authState]);

  const login = (name = "") => {
    const action = {
      type: types.login,
      payload: {
        id: "ABC",
        name,
      },
    };
    dispatch(action);
  };

  const logout = () => {
    dispatch({ type: types.logout });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        ...authState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
