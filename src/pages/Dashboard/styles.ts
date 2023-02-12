import { Card } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  padding: 2.5rem 1.25rem 1rem;
`;

export const WelcomeCard = styled(Card)`
  margin-top: 2.5rem;
  width: max-content;
  padding: 2rem 1rem;

  strong {
    gap: 0.5rem;
  }
`;
