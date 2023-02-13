import styled from "styled-components";

export const ProfileContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 5px;
  width: 12rem;
  height: 44px;
  display: flex;
  gap: 0.5rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-left: 1px solid ${(props) => props.theme["gray-300"]};
    padding-left: 1rem;
    strong {
      color: ${(props) => props.theme["gray-500"]};
      font-size: 0.875rem;
      text-transform: capitalize;
    }
    span {
      color: ${(props) => props.theme["gray-400"]};
      font-size: 0.75rem;
    }
    div {
      display: flex;
      flex-direction: column;
    }
  }
  img {
    display: inline-block;
    visibility: initial;
    width: 44px;
    height: 44px;
    padding: 0.2rem;
    border-radius: 9999px;
    outline: 2px dashed ${(props) => props.theme["green-500"]};
  }

  @media (max-width: 675px) {
    width: 3rem;
    header {
      padding: 0 0.5rem;
      strong {
        display: none;
      }
    }
  }
`;
