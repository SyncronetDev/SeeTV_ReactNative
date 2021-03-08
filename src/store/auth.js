import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from './../utils/api';

const restore = createAsyncThunk('auth/restoreStatus', async () => {
  const token = await AsyncStorage.getItem('userToken');
  const user = await fetchUser(token);

  return { token, user };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignout: false,
    userToken: null,
    user: null,
  },

  reducers: {
    signIn(state, { payload }) {
      state.isSignout = false;
      state.userToken = payload.token;
      state.user = payload.user;

      AsyncStorage.setItem('userToken', payload.token);

      return state;
    },

    // move async login to respective components
    // signOut: (state) => ({
    //   isSignout: true,
    //   userToken: null,
    // }),
    // async signUp(state, { payload }) {
    //   const token = await register(payload);
    //   const user = await fetchUser(token);

    //   return {
    //     isSignout: false,
    //     userToken: token,
    //     user,
    //   };
    // },
  },

  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    // @see: https://redux-toolkit.js.org/api/createAsyncThunk
    [restore.fulfilled]: (state, { payload }) => {
      state.isSignout = false;
      state.userToken = payload.token;
      state.user = payload.user;

      return state;
    },
  },
});

export const { signIn, signUp, signOut } = authSlice.actions;

const store = configureStore({
  reducer: authSlice.reducer,
});

store.dispatch(restore());

export default store;
