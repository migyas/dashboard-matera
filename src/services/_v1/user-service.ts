import { NewUserFormData } from "@/pages/Register";
import { api } from "../api";

async function getAllUsers() {
  const { data } = await api.get("/user");
  return data;
}

async function searchForUsers(params: { senha: string; email: string }) {
  const { data } = await api.get("/user", {
    params,
  });
  return data;
}

async function createUser(user: NewUserFormData) {
  const { data } = await api.post("/user", user);
  return data;
}

export { getAllUsers, createUser, searchForUsers };
