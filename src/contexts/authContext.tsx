import { searchForUsers } from "@/services/_v1/user-service";
import { removeTokenInLocalStorage, setTokenInLocalStorage } from "@/utils/authUtils";
import { createContext, PropsWithChildren, useState } from "react";
import { redirect } from "react-router-dom";

interface LoginFormData {
  email: string;
  senha: string;
}

interface UserData {
  token: string;
  nome: string;
  sobrenome: string;
  image: string;
}

interface AuthContextProps {
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => Promise<void>;
  user: UserData;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({} as UserData);

  async function signIn(data: LoginFormData) {
    const response = await searchForUsers(data);

    if (response.length > 0) {
      const user = response[0];
      setUser(user);
      setTokenInLocalStorage(user.token);
      redirect("/dashboard");
      window.location.reload();
    } else {
      throw new Error("Nenhum usuário encontrado");
    }
  }

  async function signOut() {
    removeTokenInLocalStorage();
    redirect("/login");
    window.location.reload();
  }

  return <AuthContext.Provider value={{ signIn, signOut, user }}>{children}</AuthContext.Provider>;
}
