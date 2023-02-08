import { Outlet } from "react-router-dom";
import { Container } from "./styles";

export function PublicLayout() {
  return (
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
