// store/slices/wishlistSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  propertyIds: string[];
}

const initialState: WishlistState = {
  propertyIds: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.propertyIds.indexOf(id);
      if (index === -1) {
        state.propertyIds.push(id);
      } else {
        state.propertyIds.splice(index, 1);
      }
    },
    setWishlist(state, action: PayloadAction<string[]>) {
      state.propertyIds = action.payload;
    },
    clearWishlist(state) {
      state.propertyIds = [];
    },
  },
});

export const { toggleWishlist, setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
