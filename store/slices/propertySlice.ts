// store/slices/propertySlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Property } from '@/types';

interface PropertyState {
  featured: Property[];
  listings: Property[];
  currentProperty: Property | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  viewMode: 'grid' | 'list' | 'map';
}

const initialState: PropertyState = {
  featured: [],
  listings: [],
  currentProperty: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  viewMode: 'grid',
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFeatured(state, action: PayloadAction<Property[]>) {
      state.featured = action.payload;
    },
    setListings(state, action: PayloadAction<{ data: Property[]; total: number }>) {
      state.listings = action.payload.data;
      state.totalCount = action.payload.total;
    },
    setCurrentProperty(state, action: PayloadAction<Property | null>) {
      state.currentProperty = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setViewMode(state, action: PayloadAction<'grid' | 'list' | 'map'>) {
      state.viewMode = action.payload;
    },
    appendListings(state, action: PayloadAction<Property[]>) {
      state.listings = [...state.listings, ...action.payload];
    },
  },
});

export const {
  setFeatured, setListings, setCurrentProperty,
  setLoading, setError, setViewMode, appendListings,
} = propertySlice.actions;
export default propertySlice.reducer;
