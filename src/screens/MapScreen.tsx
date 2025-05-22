import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlaceDetailsRequest,
  selectSelectedPlace,
  setSelectedPlaceFromHistory,
} from '../redux/places/placesSlice';
import { loadHistoryRequest, selectHistory } from '../redux/history/historySlice';
import appStyles from '../styles/styles';
import { SearchedPlace } from '../redux/history/types';
import { PlaceDetails } from '../redux/places/types';
import SearchHistoryItem from '../components/SearchHistoryItem';
import { RootState, AppDispatch } from '../redux/store';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBak5-rVn_c6NCBMHLuPnqqNPD1lBxX5zQ'; // Replace with your API key

const MapScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPlace = useSelector(selectSelectedPlace);
  const searchHistory = useSelector(selectHistory);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    dispatch(loadHistoryRequest());
  }, [dispatch]);

  const handlePlaceSelect = (data: any, details: any = null) => {
    if (data?.place_id) {
      dispatch(
        fetchPlaceDetailsRequest({ placeId: data.place_id, apiKey: GOOGLE_MAPS_API_KEY })
      );
    }
  };

  useEffect(() => {
    if (selectedPlace) {
      mapRef.current?.animateToRegion(
        {
          latitude: selectedPlace.latitude,
          longitude: selectedPlace.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  }, [selectedPlace]);

  const handleSelectFromHistory = (item: SearchedPlace) => {
    const details: PlaceDetails = {
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name || '',
      address: item.address || '',
      place_id: item.place_id || '',
    };
    dispatch(setSelectedPlaceFromHistory(details));
    mapRef.current?.animateToRegion(
      {
        latitude: details.latitude,
        longitude: details.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      1000
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={appStyles.container}>
        {/* Google Places Search */}
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          fetchDetails={true}
          onPress={(data, details = null) => {
            handlePlaceSelect(data, details);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
              width: '100%',
              paddingHorizontal: 10,
              paddingTop: 10,
            },
            textInputContainer: {
              backgroundColor: '#e0e0e0',
              borderRadius: 5,
            },
            textInput: {
              height: 40,
              color: '#000',
            },
            listView: {
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              marginTop: -5,
            },
            row: {
              padding: 10,
              backgroundColor: 'white',
            },
          }}
          debounce={200}
          onFail={(error) => console.error(error)}
          enablePoweredByContainer={false}
        />

        {/* Map Display */}
        <View style={appStyles.mapContainer}>
          <MapView
            ref={mapRef}
            style={appStyles.map}
            initialRegion={{
              latitude: 3.0708, // Initial latitude for Shah Alam
              longitude: 101.5183, // Initial longitude for Shah Alam
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={selectedPlace ? {
               latitude: selectedPlace.latitude,
               longitude: selectedPlace.longitude,
               latitudeDelta: 0.02,
               longitudeDelta: 0.02,
             } : undefined}
          >
            {selectedPlace && (
              <Marker
                coordinate={{
                  latitude: selectedPlace.latitude,
                  longitude: selectedPlace.longitude,
                }}
                title={selectedPlace.name}
                description={selectedPlace.address}
              />
            )}
          </MapView>
          {selectedPlace && (
            <View style={appStyles.placeDetails}>
              <Text style={appStyles.placeName}>{selectedPlace.name}</Text>
              <Text style={appStyles.placeAddress}>{selectedPlace.address}</Text>
            </View>
          )}
        </View>

        {/* Search History */}
        <View style={appStyles.historyContainer}>
          <Text style={appStyles.historyTitle}>Search History</Text>
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <SearchHistoryItem item={item} onPress={handleSelectFromHistory} />
            )}
            ListEmptyComponent={<Text>No search history yet.</Text>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;