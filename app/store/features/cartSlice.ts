import { CartItem } from "@/schema";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(item => item.product.id === action.payload.product.id)

      if(item) {
        item.quantity++
      } else {
        state.cartItems.push({
          product: action.payload.product,
          quantity: 1,
        })
      }
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((item) => item.product.id === action.payload.product.id);

      if(item) {
        item.quantity--;
        if(item.quantity === 0) {
          state.cartItems = state.cartItems.filter((item) => item.product.id !== action.payload.product.id)
        }
      }
    },

    deleteFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find((item) => item.product.id === action.payload.product.id);
      if(item) {
        state.cartItems = state.cartItems.filter((item) => item.product.id!== action.payload.product.id)
      }
    },

    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

const cartItems = (state:RootState) => state.cart.cartItems;

export const totalCartItemsSelector = createSelector([cartItems], (cartItems:CartItem[]) => cartItems.reduce((acc, item) => (acc += item.quantity), 0))

export const totalPriceSelector = createSelector([cartItems], (cartItems:CartItem[]) => cartItems.reduce((acc, item) => (acc += item.quantity * item.product.price), 0))

export const productQtySelector = createSelector([cartItems, (cartItems:CartItem[], productId:string) => productId], (cartItems, productId) => cartItems.find(el => el.product.id === productId)?.quantity )

export const { addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;



export default cartSlice.reducer;
