import { api } from "../api";

interface PaginationQueryParamsProps {
  page?: number;
  limit?: number;
  search?: string;
}

async function getAllProducts(params?: PaginationQueryParamsProps) {
  const { data } = await api.get("/produto", { params });
  return data;
}

export { getAllProducts };
