import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import { AuthProvider } from "./contexts/authContext";
import { ToastContainer } from "react-toastify";

registerLocale("pt-BR", ptBR);
import "react-toastify/dist/ReactToastify.css";
import "@/components/ToastAlert/toastify.css";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
      <GlobalStyles />
    </ThemeProvider>
  );
}
