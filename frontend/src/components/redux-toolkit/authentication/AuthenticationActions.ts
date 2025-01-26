import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, login, logout } from "./AuthenticationService";
import { userData } from "./AuthenticationSlice";

// Thunks
export const signUpUser = createAsyncThunk("auth/signup/", async (userData: userData, { rejectWithValue }) => {
  try {
    return await signUp(userData);
  } catch (error: any) {
    return rejectWithValue(error.response.data || "Failed to sign up. Please try again later.");
  }
});

export const loginUser = createAsyncThunk("auth/login/", async (credentials: any, { rejectWithValue }) => {
  try {
    return await login(credentials);
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});


export const logOutUser = createAsyncThunk(
  'auth/signout/',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage

      // If no access token, throw an error
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Prepare the headers for the logout API request
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      // Call the logout API with the refresh token in the body and access token in headers
      const result = await logout(refreshToken, headers)

      // If the logout API is successful, clear the tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return result
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to logout. Please try again later.'
      );
    }
  }
);


