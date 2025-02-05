import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFlight } from "../interfaces/Flight";

interface CartState {
  items: IFlight[];
}
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTicketToCart: (state, action: PayloadAction<IFlight>) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeTicketFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.seatId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addTicketToCart, removeTicketFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
