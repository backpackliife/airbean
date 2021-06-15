import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestOrder: undefined,
  // [{ id: number, title: string, desc: string, price: number, quantity: number }]
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
    setLatestOrder: (state, action) => {
      state.latestOrder = action.payload;
    },
  },
});

export const { add, resetCart, setLatestOrder } = cartSlice.actions;

export const selectLatestOrder = (state) => state.cart.latestOrder;
export const selectCart = (state) => state.cart.cart;
export const selectCartCount = (state) =>
  state.cart.cart.reduce((acc, item) => (acc += item.quantity), 0);
export const selectTotalPrice = (state) =>
  state.cart.cart.reduce((acc, item) => (acc += item.quantity * item.price), 0);

export default cartSlice.reducer;
