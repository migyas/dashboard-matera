import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Olá mundo</h1>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
