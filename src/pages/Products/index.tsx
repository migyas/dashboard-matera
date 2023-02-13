import { getAllProducts } from "@/services/_v1/product-service";
import { SearchOutlined } from "@mui/icons-material";
import { Button, InputAdornment, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import defaultImageProduct from "@/assets/caixa.png";
import { Container, ContainerAvatar, ProductList } from "./styles";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
import { useForm } from "react-hook-form";
import { ModalAdd } from "./ModalAdd";
import useDisclosure from "@/hooks/useDisclosure";
import { useNavigate } from "react-router-dom";

export interface ProductData {
  id: string;
  nome: string;
  marca: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  createdAt: Date;
}

interface SearchQueryFormProps {
  query: string;
  price?: string;
}

export default function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const navigate = useNavigate();
  const { toggle: toggleModalAdd, isOpen: isOpenModalAdd } = useDisclosure();
  const { register, handleSubmit, reset, setValue } = useForm<SearchQueryFormProps>();

  async function onSubmit({ query }: SearchQueryFormProps) {
    try {
      const data = await getAllProducts({ search: query });
      setProducts(data);
      if (data.length === 0) {
        setCountPage(1);
      } else {
        const formatedCountPage = Math.round(data.length / 15);
        setCountPage(formatedCountPage);
      }
      reset();
    } catch {
      console.warn("Erro no servidor");
    }
  }

  function handleChange(e: any, value: number) {
    setPage(value);
  }

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();
      const filteredPaginationProducts = await getAllProducts({ page, limit: 15 });
      const formatedCountPage = Math.round(data.length / 15);
      setCountPage(formatedCountPage);
      setProducts(filteredPaginationProducts);
    })();
  }, [page]);

  return (
    <Container>
      <header>
        <h1>Produtos</h1>
        <div>
          <Button variant="contained" color="success" onClick={toggleModalAdd}>
            Adicionar produto
          </Button>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("query")}
          type="text"
          placeholder="Pesquisar produto"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <ProductList>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>#ID</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Qtd Estoque</th>
              <th>Qtd Vendas</th>
              <th>Data de Criação</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ContainerAvatar>
                      <img src={defaultImageProduct} alt="avatar" />
                      <strong>{product.nome}</strong>
                    </ContainerAvatar>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.marca}</td>
                  <td>{priceFormatter.format(+product.preco)}</td>
                  <td>{product.qt_estoque}</td>
                  <td>{product.qt_vendas}</td>
                  <td>{dateFormatter.format(new Date(product.createdAt))}</td>
                  <td>
                    <button
                      title="Visualizar"
                      onClick={() => {
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      <SearchOutlined />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={100}>Nenhum produto cadastrado/encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </ProductList>
      <Pagination count={countPage} page={page} onChange={handleChange} />
      <ModalAdd open={isOpenModalAdd} toggle={toggleModalAdd} />
    </Container>
  );
}
