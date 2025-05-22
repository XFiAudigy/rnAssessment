import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchPlaceDetailsSuccess, fetchPlaceDetailsFailure } from './placesSlice';
import { addToHistory } from '../history/historySlice';
import { PlaceDetails, FetchPlaceDetailsPayload } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

const fetchPlaceDetailsApi = async (placeId: string, apiKey: string): Promise<PlaceDetails> => {
  const fields = 'geometry,name,formatted_address,place_id';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === 'OK' && data.result) {
    return {
      latitude: data.result.geometry.location.lat,
      longitude: data.result.geometry.location.lng,
      name: data.result.name,
      address: data.result.formatted_address,
      place_id: data.result.place_id,
    };
  } else {
    throw new Error(data.error_message || 'Failed to fetch place details.');
  }
};

function* fetchPlaceDetails({ payload }: PayloadAction<FetchPlaceDetailsPayload>) {
  try {
    const details: PlaceDetails = yield call(
      fetchPlaceDetailsApi,
      payload.placeId,
      payload.apiKey
    );
    yield put(fetchPlaceDetailsSuccess(details));
    yield put(addToHistory(details));
  } catch (error: any) {
    yield put(fetchPlaceDetailsFailure(error.message));
  }
}

export default function* placesSaga() {
  yield takeLatest('places/fetchPlaceDetailsRequest', fetchPlaceDetails);
}