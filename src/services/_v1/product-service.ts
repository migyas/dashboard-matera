import { NewProductFormData } from "@/pages/Products/ModalAdd";
import { api } from "../api";

interface PaginationQueryParamsProps {
  page?: number;
  limit?: number;
  search?: string;
}

interface CreateProductData extends NewProductFormData {
  avatar: FormData;
}

async function getAllProducts(params?: PaginationQueryParamsProps) {
  const { data } = await api.get("/produto", { params });
  return data;
}

async function createProduct(product: CreateProductData) {
  const { data } = await api.post("/produto", product);
  return data;
}

export { getAllProducts, createProduct };
