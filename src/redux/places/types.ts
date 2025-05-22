export interface PlaceDetails {
   latitude: number;
   longitude: number;
   name: string;
   address: string;
   place_id: string;
 }
 
 export interface PlacesState {
   selectedPlace: PlaceDetails | null;
   loadingDetails: boolean;
   error: string | null;
 }
 
 export interface FetchPlaceDetailsPayload {
   placeId: string;
   apiKey: string;
 }