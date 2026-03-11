import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { bookAppointment } from '../../api';

// Simple Calendar-like component for dates
const DatePicker = ({ selectedDate, onSelectDate }) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate);
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
      {dates.map((date, index) => {
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        return (
          <TouchableOpacity 
            key={index} 
            style={[styles.dateItem, isSelected && styles.selectedDateItem]}
            onPress={() => onSelectDate(date)}
          >
            <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
            <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
              {date.getDate()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const TimePicker = ({ selectedTime, onSelectTime }) => {
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
  
  return (
    <View style={styles.timeGrid}>
      {times.map((time) => {
        const isSelected = selectedTime === time;
        return (
          <TouchableOpacity 
            key={time} 
            style={[styles.timeItem, isSelected && styles.selectedTimeItem]}
            onPress={() => onSelectTime(time)}
          >
            <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>{time}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function BookingScreen() {
  const router = useRouter();
  const { doctorType, hospitalName } = useLocalSearchParams();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedTime) {
      Alert.alert('Selection Required', 'Please select an appointment time.');
      return;
    }

    setLoading(true);
    try {
      // Format date for Django (YYYY-MM-DD)
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      // Convert "09:00 AM" to "09:00:00" for Django TimeField
      let [time, modifier] = selectedTime.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
      if (modifier === 'AM' && hours === '12') hours = '00';
      const formattedTime = `${hours}:${minutes}:00`;

      await bookAppointment({
        doctor_type: doctorType || 'General Physician',
        hospital_name: hospitalName || 'City Medical Center',
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        status: 'Pending'
      });

      Alert.alert(
        'Success!', 
        'Your appointment has been booked. A representative will contact you soon.',
        [{ text: 'View Appointments', onPress: () => router.push('/appointments') }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Booking Failed', 'Something went wrong while booking your appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.iconCircle}>
           <FontAwesome5 name="hospital-alt" size={24} color="#FFF" />
        </View>
        <Text style={styles.summaryTitle}>{hospitalName || 'City Medical Center'}</Text>
        <Text style={styles.summarySubtitle}>{doctorType || 'General Physician'}</Text>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Select Date</Text>
         <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Available Slots</Text>
         <TimePicker selectedTime={selectedTime} onSelectTime={setSelectedTime} />
      </View>

      <View style={styles.footer}>
         <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Consultation Fee</Text>
            <Text style={styles.priceValue}>$50.00</Text>
         </View>
         
         <TouchableOpacity 
            style={[styles.bookBtn, loading && styles.disabledBtn]} 
            onPress={handleBooking}
            disabled={loading}
         >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.bookBtnText}>Confirm Booking</Text>}
         </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  summaryCard: {
    backgroundColor: '#2E8B57',
    padding: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  summaryTitle: { fontSize: 22, fontWeight: '800', color: '#FFF' },
  summarySubtitle: { fontSize: 16, color: '#E0F0E0', marginTop: 5 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
  dateList: { flexDirection: 'row' },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#F5F5F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  selectedDateItem: { backgroundColor: '#2E8B57', borderColor: '#2E8B57' },
  dateDay: { fontSize: 12, color: '#666', marginBottom: 5 },
  dateNumber: { fontSize: 18, fontWeight: '800', color: '#333' },
  selectedDateText: { color: '#FFF' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeItem: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  selectedTimeItem: { backgroundColor: '#2E8B57', borderColor: '#2E8B57' },
  timeText: { fontSize: 14, fontWeight: '600', color: '#333' },
  selectedTimeText: { color: '#FFF' },
  footer: {
    padding: 25,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  priceContainer: { flex: 1 },
  priceLabel: { fontSize: 12, color: '#888' },
  priceValue: { fontSize: 24, fontWeight: '800', color: '#333' },
  bookBtn: {
    backgroundColor: '#2E8B57',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#2E8B57',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  },
  disabledBtn: { opacity: 0.7 },
  bookBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
