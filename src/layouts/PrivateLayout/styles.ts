import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: ${(props) => props.theme["white"]};
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 70rem;
  width: 100%;
  height: 100vh;

  h1 {
    color: ${(props) => props.theme["gray-600"]};
    font-size: 1.75rem;
  }
`;
