import { AuthContext } from "@/contexts/authContext";
import { DashboardOutlined, LogoutOutlined, StoreOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext } from "react";
import { SidebarContainer, SidebarContent, SidebarNavItem, SidebarOverlay } from "./styles";

export function Sidebar() {
  const { signOut } = useContext(AuthContext);

  function handleLogout() {
    signOut();
  }

  return (
    <SidebarContainer>
      <SidebarOverlay />
      <SidebarContent>
        <header>
          <strong>Matera - Onidata</strong>
        </header>
        <nav>
          <SidebarNavItem to="/">
            <DashboardOutlined />
            <strong>Dashboard</strong>
          </SidebarNavItem>
          <SidebarNavItem to="/products">
            <StoreOutlined />
            <strong>Produtos</strong>
          </SidebarNavItem>
        </nav>
        <Button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
          <LogoutOutlined />
          <strong>Sair</strong>
        </Button>
      </SidebarContent>
    </SidebarContainer>
  );
}
