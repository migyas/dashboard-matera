import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import { Container, MainContent } from "./styles";

export function PrivateLayout() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        {/* <Profile /> */}
        <Outlet />
      </MainContent>
    </Container>
  );
}
