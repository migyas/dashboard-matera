import { Outlet } from "react-router-dom";
import { Container } from "./styles";

export function PrivateLayout() {
  return (
    <Container>
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
