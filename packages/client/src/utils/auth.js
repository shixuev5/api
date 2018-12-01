import jwt from "jsonwebtoken";
import { secret } from "$root/config";

export function readJwt() {
  return (
    localStorage.getItem("api-token") || sessionStorage.getItem("api-token")
  );
}

export function cleanJwt() {
  localStorage.removeItem("api-token");
  sessionStorage.removeItem("api-item");
}

export function verifyJwt() {
  const token = readJwt();
  if (!token) return false;
  try {
    const decode = jwt.verify(token, secret);
    return !!decode;
  } catch (error) {
    cleanJwt();
    console.error(error);
    return false;
  }
}

export function decodeJwt() {
  return jwt.decode(readJwt());
}
