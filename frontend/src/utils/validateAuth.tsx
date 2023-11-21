import { NavigateFunction } from "react-router-dom";

export function validateAuth(navigate: NavigateFunction) {
  const token = localStorage.getItem("token");

  if (token == null) navigate("/");
}
