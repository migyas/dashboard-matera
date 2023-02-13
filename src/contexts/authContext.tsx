import { searchForUsers } from "@/services/_v1/user-service";
import {
  removeTokenInLocalStorage,
  setTokenInLocalStorage,
  setUserInLocalStorage,
} from "@/utils/authUtils";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

interface LoginFormData {
  email: string;
  senha: string;
}

interface AuthContextProps {
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: PropsWithChildren) {
  async function signIn(data: LoginFormData) {
    const response = await searchForUsers(data);

    if (response.length > 0) {
      const userLogged = response[0];
      setTokenInLocalStorage(userLogged.token);
      setUserInLocalStorage(userLogged);
      redirect("/dashboard");
      window.location.reload();
    } else {
      throw new Error("Nenhum usuário encontrado");
    }
  }

  function signOut() {
    removeTokenInLocalStorage();
    redirect("/login");
    window.location.reload();
  }

  useEffect(() => {
    (async () => {})();
  }, []);

  return <AuthContext.Provider value={{ signIn, signOut }}>{children}</AuthContext.Provider>;
}
