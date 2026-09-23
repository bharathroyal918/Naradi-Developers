// store/slices/uiSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isNavScrolled: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
}

const initialState: UIState = {
  isNavScrolled: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setNavScrolled(state, action: PayloadAction<boolean>) {
      state.isNavScrolled = action.payload;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
    showToast(state, action: PayloadAction<UIState['toast']>) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const {
  setNavScrolled, toggleMobileMenu, setMobileMenu,
  toggleSearch, openModal, closeModal, showToast, clearToast,
} = uiSlice.actions;
export default uiSlice.reducer;
