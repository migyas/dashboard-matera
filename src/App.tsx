import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

registerLocale("pt-BR", ptBR);

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}
