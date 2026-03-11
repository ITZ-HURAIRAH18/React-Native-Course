import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { analyzeSymptoms } from '../../api';

export default function TriageScreen() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ doctor: string; reason: string } | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      Alert.alert('Empty Input', 'Please describe your symptoms first.');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const response = await analyzeSymptoms(symptoms);
      setResult(response.data);
    } catch (error) {
       console.error(error);
       Alert.alert('Analysis Failed', 'Make sure you are logged in and the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!result) return;
    router.push({
      pathname: "/(tabs)/booking",
      params: { doctorType: result.doctor, hospitalName: 'City General Hospital' }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
         <FontAwesome5 name="hospital-user" size={48} color="#FFFFFF" />
         <Text style={styles.headerTitle}>AI Medical Triage</Text>
         <Text style={styles.headerSubtitle}>Describe your symptoms and AI will route you to the right specialist.</Text>
      </View>

      <View style={styles.inputCard}>
         <Text style={styles.label}>What are you feeling today?</Text>
         <TextInput
            style={styles.input}
            placeholder="e.g. I have tooth pain and swelling in my gums..."
            multiline
            numberOfLines={4}
            value={symptoms}
            onChangeText={setSymptoms}
            placeholderTextColor="#999"
         />

         <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleAnalyze}
            disabled={loading}
         >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>Analyze symptoms</Text>
                <MaterialIcons name="chevron-right" size={24} color="#FFF" />
              </>
            )}
         </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Recommended Specialist:</Text>
          <Text style={styles.specialistText}>{result.doctor}</Text>
          
          <View style={styles.reasonContainer}>
             <MaterialIcons name="info" size={20} color="#2E8B57" />
             <Text style={styles.reasonText}>{result.reason}</Text>
          </View>

          <View style={styles.actionRow}>
             <TouchableOpacity 
                style={styles.actionButtonSecondary}
                onPress={() => Alert.alert('Nearby Doctors', `Searching for ${result.doctor}s near you...`)}
             >
                <Text style={styles.actionButtonTextSecondary}>Find Doctors</Text>
             </TouchableOpacity>
             <TouchableOpacity 
                style={styles.actionButtonPrimary}
                onPress={handleBook}
             >
                <Text style={styles.actionButtonTextPrimary}>Book Appointment</Text>
             </TouchableOpacity>
          </View>
        </View>
      )}
      
      <View style={styles.infoBox}>
         <MaterialIcons name="warning" size={24} color="#DAA520" />
         <Text style={styles.infoText}>
           For life-threatening emergencies, call your local ambulance service immediately.
         </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  headerCard: {
    backgroundColor: '#2E8B57',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginTop: 15 },
  headerSubtitle: { fontSize: 16, color: '#E0F0E0', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  inputCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  label: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    color: '#333',
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '700', marginRight: 5 },
  resultCard: {
    backgroundColor: '#E8F5E9',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2E8B57',
  },
  resultLabel: { fontSize: 14, color: '#2E8B57', fontWeight: '600', textTransform: 'uppercase' },
  specialistText: { fontSize: 32, fontWeight: '900', color: '#1B5E20', marginVertical: 10 },
  reasonContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  reasonText: { flex: 1, fontSize: 16, color: '#444', marginLeft: 8 },
  actionRow: { flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' },
  actionButtonPrimary: { backgroundColor: '#2E8B57', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  actionButtonSecondary: { borderWidth: 1, borderColor: '#2E8B57', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  actionButtonTextPrimary: { color: '#FFF', fontWeight: '700' },
  actionButtonTextSecondary: { color: '#2E8B57', fontWeight: '700' },
  infoBox: { margin: 20, marginBottom: 40, flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#FFF9E6', borderRadius: 12 },
  infoText: { flex: 1, marginLeft: 10, color: '#856404', fontSize: 14 }
});
