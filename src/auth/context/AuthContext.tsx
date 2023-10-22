import { createContext } from "react";
import { AuthReducerInterface } from ".";

interface AuthContextInterface extends AuthReducerInterface {
  login: (name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextInterface);
