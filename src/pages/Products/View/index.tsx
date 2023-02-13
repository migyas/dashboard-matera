import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "@/services/_v1/product-service";
import defaultImageProduct from "@/assets/caixa.png";

import { ProductData } from "..";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { ButtonContainer, Container, DescriptionProduct } from "./styles";
import { Button } from "@mui/material";
import useDisclosure from "@/hooks/useDisclosure";
import { ModalEdit } from "../ModalEdit";
import { ModalDelete } from "../ModalDelete";

export default function ViewProduct() {
  const [product, setProduct] = useState({} as ProductData);
  const { toggle: toggleModalEdit, isOpen: isOpenModalEdit } = useDisclosure();
  const { toggle: toggleModalDelete, isOpen: isOpenModalDelete } = useDisclosure();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
      } else {
        navigate("/products");
      }
    })();
  }, []);

  return (
    <Container>
      <header>
        <h1>Visualização do produto</h1>
        <ButtonContainer>
          <Button variant="contained" color="info" onClick={toggleModalEdit}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={toggleModalDelete}>
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
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          style={{ marginTop: "2rem" }}
        >
          Voltar
        </Button>
      </DescriptionProduct>
      <ModalEdit open={isOpenModalEdit} toggle={toggleModalEdit} product={product} />
      <ModalDelete open={isOpenModalDelete} toggle={toggleModalDelete} id={product.id} />
    </Container>
  );
}
