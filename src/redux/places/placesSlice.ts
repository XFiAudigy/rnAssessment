import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlacesState, PlaceDetails } from './types';

const initialState: PlacesState = {
  selectedPlace: null,
  loadingDetails: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    fetchPlaceDetailsRequest: (state, action: PayloadAction<{ placeId: string; apiKey: string }>) => {
      state.loadingDetails = true;
      state.error = null;
    },
    fetchPlaceDetailsSuccess: (state, action: PayloadAction<PlaceDetails>) => {
      state.selectedPlace = action.payload;
      state.loadingDetails = false;
    },
    fetchPlaceDetailsFailure: (state, action: PayloadAction<string>) => {
      state.loadingDetails = false;
      state.error = action.payload;
    },
    setSelectedPlaceFromHistory: (state, action: PayloadAction<PlaceDetails>) => {
      state.selectedPlace = action.payload;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
  },
});

export const {
  fetchPlaceDetailsRequest,
  fetchPlaceDetailsSuccess,
  fetchPlaceDetailsFailure,
  setSelectedPlaceFromHistory,
  clearSelectedPlace,
} = placesSlice.actions;

export const selectSelectedPlace = (state: { places: PlacesState }) => state.places.selectedPlace;
export const selectPlaceLoading = (state: { places: PlacesState }) => state.places.loadingDetails;
export const selectPlaceError = (state: { places: PlacesState }) => state.places.error;

export default placesSlice.reducer;