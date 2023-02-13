import { WarningOutlined } from "@mui/icons-material";
import { ContainerLogin, LinkRegister } from "./styles";
import { PublicLayout } from "@/layouts/PublicLayout";

export default function NotFoundPage() {
  return (
    <PublicLayout>
      <ContainerLogin>
        <header>
          <WarningOutlined />
          <strong>OOOPS!</strong>
          <span>Página não encontrada</span>
        </header>
        <span>
          Clique aqui para voltar, <LinkRegister to="/">Login/Home</LinkRegister>
        </span>
      </ContainerLogin>
    </PublicLayout>
  );
}
