import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  gap: 0.5rem;
  color: ${(props) => props.theme["color-title"]};

  &.active {
    padding: 1rem 1.75rem;
    background: ${(props) => props.theme["gray-100"]};
    color: ${(props) => props.theme["gray-800"]};
    border-left: 4px solid ${(props) => props.theme["red-300"]};
  }
`;

export const SidebarContainer = styled.div`
  background: ${(props) => props.theme["gray-800"]};
`;

export const SidebarOverlay = styled.div`
  @media (max-width: 540px) {
    &.--expand {
      position: absolute;
      content: " ";
      background: ${(props) => props.theme["gray-700"]};
      transition: all 0.8s;
      opacity: 0.4;
      min-width: 100vw;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 1000;
    }
  }
`;

export const SidebarContent = styled.div`
  width: 16rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;

  header {
    padding: 2rem 1rem;
    color: ${(props) => props.theme["gray-100"]};
    gap: 0.5rem;
    display: flex;
    align-items: baseline;
    font-weight: bold;
    img {
      width: 1.75rem;
      height: 1.75rem;
    }
    strong {
      white-space: nowrap;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }
  nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 1rem;
    margin-bottom: 8rem;
    gap: 0.5rem;
    strong {
      white-space: nowrap;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
    svg {
      min-width: 18px;
    }
  }

  @media (max-width: 540px) {
    position: fixed;

    &.sidebar__overlay {
      content: "";
      background: red;
      width: 100vw;
    }
  }
`;
