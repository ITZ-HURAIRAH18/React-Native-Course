import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

const products = [
  { id: '1', name: 'Classic Shirt', price: '$29.99', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Sport Shoes', price: '$59.99', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Leather Wallet', price: '$19.99', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Smart Watch', price: '$199.99', image: 'https://via.placeholder.com/150' },
];

export default function HomePage() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>           
      <Text style={[styles.header, { color: colors.text }]}>Welcome to the Shop</Text>

      <View style={styles.products}>
        {products.map((p) => (
          <TouchableOpacity key={p.id} style={styles.card} activeOpacity={0.8}>
            <Image source={{ uri: p.image }} style={styles.image} />
            <Text style={[styles.name, { color: colors.text }]}>{p.name}</Text>
            <Text style={[styles.price, { color: colors.text }]}>{p.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  products: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: { width: '100%', height: 120, resizeMode: 'cover' },
  name: { fontSize: 16, fontWeight: '600', margin: 8 },
  price: { fontSize: 14, marginHorizontal: 8, marginBottom: 8 },
});
