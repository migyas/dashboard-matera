import { PropsWithChildren } from "react";
import { Container } from "./styles";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
}
