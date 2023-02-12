// import { classNames } from "@/utils/classNames";
// import whiteLabelLogo from "@/assets/logo.svg";
// import {
//   ButtonContainer,
//   SidebarContainer,
//   SidebarContent,
//   SidebarNavItem,
//   SidebarOverlay,
// } from "./styles";
// import useDisclosure from "@/hooks/useDisclosure";
// import useUser from "@/hooks/useUser";

import { DashboardOutlined, StoreOutlined } from "@mui/icons-material";
import { SidebarContainer, SidebarContent, SidebarNavItem, SidebarOverlay } from "./styles";

export function Sidebar() {
  // const { userLogged } = useUser();
  // const { isOpen, toggle } = useDisclosure();

  return (
    <SidebarContainer>
      <SidebarOverlay />
      <SidebarContent>
        <header>
          <img alt="Logomarca da empresa" />
          <strong>Nome Empresa</strong>
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
  );
}
