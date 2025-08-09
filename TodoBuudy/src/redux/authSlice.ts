import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  user: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoggedIn: !!storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.isLoggedIn = true;

      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user",JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    setUserFromToken(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
