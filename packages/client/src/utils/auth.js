import jwt from "jsonwebtoken";

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
    const config =
      process.env.NODE_ENV === "development"
        ? require("$root/config/config.dev.json")
        : require("$root/config/config.prod.json");
    const decode = jwt.verify(token, config.secret);
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
