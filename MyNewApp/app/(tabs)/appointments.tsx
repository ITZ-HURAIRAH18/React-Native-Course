import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { getAppointments } from '../../api';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#2E8B57';
      case 'pending': return '#DAA520';
      case 'cancelled': return '#DC3545';
      default: return '#666';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
           <FontAwesome5 name="hospital-alt" size={24} color="#2E8B57" />
        </View>
        
        <View style={styles.infoContainer}>
            <Text style={styles.hospitalName}>{item.hospital_name}</Text>
            <Text style={styles.specialistText}>{item.doctor_type}</Text>
            
            <View style={styles.dateTimeRow}>
               <MaterialIcons name="calendar-today" size={14} color="#666" />
               <Text style={styles.dateTimeText}>{item.appointment_date}</Text>
               <MaterialIcons name="access-time" size={14} color="#666" style={{ marginLeft: 10 }} />
               <Text style={styles.dateTimeText}>{item.appointment_time}</Text>
            </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#2E8B57" />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2E8B57']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
               <MaterialIcons name="event-busy" size={64} color="#CCC" />
               <Text style={styles.emptyText}>No appointments found.</Text>
               <Text style={styles.emptySubtext}>Your booked appointments will appear here.</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.fab}>
         <MaterialIcons name="add" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  listContent: { padding: 15, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  hospitalName: { fontSize: 18, fontWeight: '700', color: '#333' },
  specialistText: { fontSize: 14, color: '#2E8B57', fontWeight: '600', marginTop: 2 },
  dateTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dateTimeText: { fontSize: 13, color: '#666', marginLeft: 4 },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#666', marginTop: 15 },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 5 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2E8B57',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  }
});
