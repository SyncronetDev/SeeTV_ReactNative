import { createSlice, configureStore } from '@reduxjs/toolkit';

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
});

export const { signIn, signUp, signOut } = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
