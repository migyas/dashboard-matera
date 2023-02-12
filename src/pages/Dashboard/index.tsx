import { AuthContext } from "@/contexts/authContext";
import { Card } from "@mui/material";
import { useContext } from "react";
import { Container, WelcomeCard } from "./styles";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      <h1>Dashboard</h1>
      <WelcomeCard elevation={5}>
        <span>
          Seja bem vindo,{" "}
          <strong>
            {user.nome?.toUpperCase() ?? "NOME_USUÁRIO"}{" "}
            {user.sobrenome?.toUpperCase() ?? "SOBRENOME_USUÁRIO"}
          </strong>
        </span>
      </WelcomeCard>
    </Container>
  );
}
