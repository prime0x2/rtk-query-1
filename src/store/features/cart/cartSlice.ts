import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '@/types/globalTypes';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const exists = state.products.find((x) => x._id === action.payload._id);

      if (exists) {
        exists.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const item = state.products.find((x) => x._id === action.payload._id);

      if (item && item.quantity! > 1) {
        item.quantity! -= 1;
      } else {
        state.products = state.products.filter(
          (x) => x._id !== action.payload._id
        );
      }

      state.total -= action.payload.price;
    },
    removeAllFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (x) => x._id !== action.payload._id
      );

      state.total -= action.payload.price! * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeAllFromCart, removeOneFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
