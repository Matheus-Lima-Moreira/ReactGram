import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  error: false,
  loading: false,
  success: false
};

// Register an user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

// Sign in an user
export const login = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    const data = await authService.login(user);

    // Check for erros
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;