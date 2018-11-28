import jwt from "jsonwebtoken";
import { message } from "ant-design-vue";

function readJwt() {
  return localStorage.getItem('api-token') || sessionStorage.getItem('api-token');
}

export function verifyJwt() {
  const token = readJwt();
  try {
    const decode = jwt.verify(token, 'api_secret');
    return !!decode;
  } catch (error) {
    message.error(error.message);
    return false;
  }
}

export function decodeJwt() {
  return jwt.decode(readJwt());
}