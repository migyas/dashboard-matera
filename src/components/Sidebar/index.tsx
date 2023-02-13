import { DashboardOutlined, MenuOutlined, StoreOutlined } from "@mui/icons-material";
import { SpeedDial } from "@mui/material";
import { useState } from "react";
import {
  SidebarContainer,
  SidebarContent,
  SidebarNavItem,
  SidebarOverlay,
  SpeedDialCustom,
} from "./styles";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <SidebarContainer open={open}>
        <SidebarOverlay onClick={handleOpen} />
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
        </SidebarContent>
      </SidebarContainer>
      <SpeedDialCustom
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<MenuOutlined />}
        onOpen={handleOpen}
        onClose={handleOpen}
        open={open}
      />
    </>
  );
}
