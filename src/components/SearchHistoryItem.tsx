import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SearchedPlace } from '../redux/history/types';

interface Props {
  item: SearchedPlace;
  onPress: (item: SearchedPlace) => void;
}

const SearchHistoryItem: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.item}>
    <Text style={styles.text}>{item.name || item.address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
  },
});

export default SearchHistoryItem;