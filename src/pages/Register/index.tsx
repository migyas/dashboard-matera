import {
  LoginOutlined,
  PersonAddAlt,
  AccountCircle,
  LockOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { ContainerRegister, FormContainer, LinkRegister } from "./styles";

export function Register() {
  return (
    <ContainerRegister>
      <header>
        <PersonAddAlt />
        <strong>Registre-se</strong>
        <span>Informe seus dados</span>
      </header>
      <FormContainer>
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
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
    </ContainerRegister>
  );
}
