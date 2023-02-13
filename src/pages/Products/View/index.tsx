import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/_v1/product-service";
import defaultImageProduct from "@/assets/caixa.png";

import { ProductData } from "..";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { ButtonContainer, Container, DescriptionProduct } from "./styles";
import { Button } from "@mui/material";

export default function ViewProduct() {
  const [product, setProduct] = useState({} as ProductData);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      }
    })();
  }, []);

  return (
    <Container>
      <header>
        <h1>Visualização do produto</h1>
        <ButtonContainer>
          <Button variant="contained" color="info">
            Editar
          </Button>
          <Button variant="contained" color="error">
            Excluir
          </Button>
        </ButtonContainer>
      </header>
      <DescriptionProduct>
        <img src={defaultImageProduct} alt="avatar" />
        <ul>
          <li>
            <strong>Nome</strong>: {product.nome}
          </li>
          <li>
            <strong>Marca</strong>: {product.marca}
          </li>
          <li>
            <strong>Preço</strong>: {priceFormatter.format(+product.preco)}
          </li>
          <li>
            <strong>Quantidade de Estoque</strong>: {product.qt_estoque}
          </li>
          <li>
            <strong>Quantidade de Vendas</strong>: {product.qt_vendas}
          </li>
          <li>
            <strong>Data da criação</strong>:{" "}
            {product.createdAt && dateFormatter.format(new Date(product?.createdAt))}
          </li>
        </ul>
      </DescriptionProduct>
    </Container>
  );
}
