import {
  LoginOutlined,
  AccountBoxOutlined,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { ContainerLogin, FormContainer, LinkRegister } from "./styles";

export function Login() {
  return (
    <ContainerLogin>
      <header>
        <AccountBoxOutlined />
        <strong>Bem-vindo!</strong>
        <span>Entre com sua conta</span>
      </header>
      <FormContainer>
        <TextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained">
          Entrar
          <LoginOutlined />
        </Button>
      </FormContainer>
      <span>
        Ainda não possui conta? <LinkRegister to="/register">Registrar-se</LinkRegister>
      </span>
    </ContainerLogin>
  );
}
