import axios from "axios";
import { userData } from "./AuthenticationSlice";

const API_URL = "http://localhost:8000/auth";

// Sign up
export const signUp = async (userData: userData) => {
  const response = await axios.post(`${API_URL}/signup/`, userData);
  return response.data;
};

// Login
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login/`, credentials);
  return response.data;
};

// Logout
export const logout = async (refreshToken: string, headers: any) => {
  const response = await axios.post(
    `${API_URL}/signout/`,
    { refresh: refreshToken },
    { headers }
  );
  return response.data;
};
