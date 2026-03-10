import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

const products = [
  { id: '1', name: 'Classic Shirt', price: '$29.99', image: 'https://via.placeholder.com/300x200?text=Shirt' },
  { id: '2', name: 'Sport Shoes', price: '$59.99', image: 'https://via.placeholder.com/300x200?text=Shoes' },
  { id: '3', name: 'Leather Wallet', price: '$19.99', image: 'https://via.placeholder.com/300x200?text=Wallet' },
  { id: '4', name: 'Smart Watch', price: '$199.99', image: 'https://via.placeholder.com/300x200?text=Watch' },
];

export default function HomePage() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>           
      <Text style={[styles.header, { color: colors.text }]}>Welcome to the Shop</Text>

      <View style={styles.products}>
        {products.map((p) => (
          <TouchableOpacity key={p.id} style={[styles.card, { backgroundColor: colors.card }]} activeOpacity={0.8}>
            <Image source={{ uri: p.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text }]}>{p.name}</Text>
              <Text style={[styles.price, { color: colors.text }]}>{p.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  products: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation for Android
    elevation: 3,
  },
  image: { width: '100%', height: 120, resizeMode: 'cover' },
  info: { padding: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, marginTop: 4 },
});
