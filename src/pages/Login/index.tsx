import { useState, useEffect } from "react";
import { AccountBoxOutlined, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContainerLogin, FormContainer, LinkRegister } from "./styles";
import { api } from "@/services/api";
import { getAllUsers, searchForUsers } from "@/services/_v1/user-service";

export const loginFormValidationSchema = zod.object({
  email: zod.string().min(1, "Campo obrigatório").email(),
  senha: zod.string().min(8, "Mínimo de 8 caracteres"),
});

export type LoginFormData = zod.infer<typeof loginFormValidationSchema>;

export function Login() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormValidationSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await searchForUsers(data);
      const user = response[0];
      const token = JSON.stringify(user.token);
      localStorage.setItem("@matera-dashboard:user-token", token);
      setUser(user);
    } catch {
      console.log("erro no login");
    }
  }

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <ContainerLogin>
      <header>
        <AccountBoxOutlined />
        <strong>Bem-vindo!</strong>
        <span>Entre com sua conta</span>
      </header>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email")}
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={!!errors.email && errors.email.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          {...register("senha")}
          type="password"
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          autoComplete="current-password"
          error={!!errors.senha}
          helperText={!!errors.senha && errors.senha.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockOutlined />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Entrar
        </Button>
      </FormContainer>
      <span>
        Ainda não possui conta? <LinkRegister to="/register">Registrar-se</LinkRegister>
      </span>
    </ContainerLogin>
  );
}
