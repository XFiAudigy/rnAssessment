export interface SearchedPlace {
   latitude: number;
   longitude: number;
   name?: string;
   address?: string;
   place_id?: string;
 }
 
 export interface HistoryState {
   history: SearchedPlace[];
   loadingHistory: boolean;
   savingHistory: boolean;
   error: string | null;
 }