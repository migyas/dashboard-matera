import { NewProductFormData } from "@/pages/Products/ModalAdd";
import { api } from "../api";

interface PaginationQueryParamsProps {
  page?: number;
  limit?: number;
  search?: string;
}

interface CreateOrEditProductData extends NewProductFormData {
  avatar?: FormData | string;
}

async function getAllProducts(params?: PaginationQueryParamsProps) {
  const { data } = await api.get("/produto", { params });
  return data;
}

async function getProductById(id: string) {
  const { data } = await api.get(`/produto/${id}`);
  return data;
}

async function createProduct(product: CreateOrEditProductData) {
  const { data } = await api.post("/produto", product);
  return data;
}

async function updateProduct(product: CreateOrEditProductData) {
  const { data } = await api.put("/produto", product);
  return data;
}

async function deleteProductById(id: string) {
  const { data } = await api.delete(`/produto/${id}`);
  return data;
}

export { getAllProducts, createProduct, getProductById, updateProduct, deleteProductById };
