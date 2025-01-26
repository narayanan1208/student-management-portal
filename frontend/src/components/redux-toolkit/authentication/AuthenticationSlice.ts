import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser, logOutUser } from "./AuthenticationActions";

export interface userData {
    email: string;
    schoolName: string;
    password: string;
    town: string;
    state: string;
    pincode: string;
    country: string;
}

interface LoginError {
  email?: string[];
}

interface AuthState {
  user: userData | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | LoginError | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Function to check localStorage for tokens
const checkAuthentication = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return accessToken && refreshToken ? true : false;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
      ...initialState, isAuthenticated: checkAuthentication()
    },
    reducers: {
      resetError: (state) => {
        state.error = null;
      }, 
    },
    extraReducers: (builder) => {
      // Sign Up
      builder.addCase(signUpUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
      builder.addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
      // Login
      builder.addCase(loginUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      });
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
      // Logout
      builder.addCase(logOutUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
      builder.addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },
  });
  
  export const { resetError } = authSlice.actions;
  
  export default authSlice.reducer;