import { api } from "../connection.tsx";

import { User } from "./UserModel.tsx";

export async function signup(user: User) {
  await api.post("/signup", user);
}

export async function login(user: User) {
  return await api.post("/login", user); 
}
