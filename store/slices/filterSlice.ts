// store/slices/filterSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PropertyFilter } from '@/types';

interface FilterState {
  current: PropertyFilter;
  isFilterOpen: boolean;
}

const initialState: FilterState = {
  current: {
    page: 1,
    limit: 12,
    sortBy: 'newest',
  },
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<PropertyFilter>>) {
      state.current = { ...state.current, ...action.payload, page: 1 };
    },
    resetFilter(state) {
      state.current = { page: 1, limit: 12, sortBy: 'newest' };
    },
    setPage(state, action: PayloadAction<number>) {
      state.current.page = action.payload;
    },
    toggleFilterPanel(state) {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setFilterOpen(state, action: PayloadAction<boolean>) {
      state.isFilterOpen = action.payload;
    },
  },
});

export const { setFilter, resetFilter, setPage, toggleFilterPanel, setFilterOpen } = filterSlice.actions;
export default filterSlice.reducer;
