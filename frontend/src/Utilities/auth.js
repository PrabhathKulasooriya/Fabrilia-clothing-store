import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("auth-token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; 
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("auth-token");
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user && user.role === "admin";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("auth-token");
};
