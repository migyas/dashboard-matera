import { useContext, useState } from "react";
import { AccountBoxOutlined, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Button, FormHelperText, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContainerLogin, FormContainer, LinkRegister } from "./styles";
import { AuthContext } from "@/contexts/authContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import useCustomToast from "@/hooks/useCustomToast";

export const loginFormValidationSchema = zod.object({
  email: zod.string().min(1, "Campo obrigatório").email(),
  senha: zod.string().min(8, "Mínimo de 8 caracteres"),
});

export type LoginFormData = zod.infer<typeof loginFormValidationSchema>;

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const toast = useCustomToast();
  const [errorMessage, setErrorMessage] = useState("");
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
      await signIn(data);
    } catch (err) {
      toast({
        data: {
          color: "error",
          message: `${(err as Error).message}`,
        },
      });
      setErrorMessage((err as Error).message);
      throw new Error("Servidor fora do ar");
    }
  }

  return (
    <PublicLayout>
      <ContainerLogin>
        <header>
          <AccountBoxOutlined />
          <strong>Bem-vindo!</strong>
          <span>Entre com sua conta</span>
          <FormHelperText error>{errorMessage ?? null}</FormHelperText>
        </header>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            type="email"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={!!errors.email && errors.email.message}
            autoComplete="current-email"
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
    </PublicLayout>
  );
}
