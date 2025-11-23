import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartIsVisible: false },
  reducers: {
    toggleCart(state) {
        console.log('Toggle Cart from reducer', state.cartIsVisible);
      state.cartIsVisible = !state.cartIsVisible;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;