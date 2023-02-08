import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerLogin = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  padding: 2.5rem;

  header {
    margin: 2rem 0;
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;

    strong {
      font-size: 1.25rem;
      font-weight: bold;
      color: ${(props) => props.theme["red-500"]};
      line-height: 1.6;
    }

    span {
      font-size: 1.5rem;
      font-weight: lighter;
      color: ${(props) => props.theme["gray-500"]};
      line-height: 1.6;
    }
  }

  span {
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const LinkRegister = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme["blue-300"]};

  &:hover {
    text-decoration: underline;
    transition: text-decoration 0.2s;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    height: 25px !important;
  }

  button[type="submit"] {
    margin-top: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    gap: 0.5rem;
  }
`;
