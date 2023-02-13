import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DescriptionProduct = styled.div`
  width: 100%;
  padding: 1.5rem 0;

  img {
    width: 5rem;
    height: 5rem;
    margin-bottom: 2.5rem;
  }

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      color: ${(props) => props.theme["gray-900"]};
      font-size: 1.15rem;

      strong {
        font-size: 1.25rem;
        color: ${(props) => props.theme["gray-400"]};
      }
    }
  }
`;
