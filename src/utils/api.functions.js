import client from "./client";

export async function login(email, password) {
  const { data } = await client.post("auth/login", {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export function logout() {
  localStorage.removeItem("user");
}

export async function getUsers(page, limit) {
  const { data } = await client.get(`users?page=${page}&limit=${limit}`);
  return data;
}

export async function createUser(body) {
  const { data } = await client.post("users", { ...body });
  return data;
}

export async function updateUser(id, body) {
  const { data } = await client.patch(`users/${id}`, { ...body });
  return data;
}
