import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    width: '100%',
    marginTop: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeDetails: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 14,
    color: 'gray',
  },
  historyContainer: {
    flex: 1,
    padding: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyItemText: {
    fontSize: 16,
  },
});

export default appStyles;