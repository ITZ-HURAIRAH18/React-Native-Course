import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageBackground 
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const handleTriage = () => router.push('/triage');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000' }} 
        style={styles.hero}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.greeting}>Hello, User!</Text>
          <Text style={styles.heroTitle}>Your Personal Health Assistant</Text>
          <TouchableOpacity style={styles.triageBtn} onPress={handleTriage}>
             <FontAwesome5 name="stethoscope" size={20} color="#2E8B57" />
             <Text style={styles.triageBtnText}>Check Symptoms Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Stats/Quick Info Row */}
      <View style={styles.statsRow}>
         <View style={styles.statItem}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Active Appt</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Medicines</Text>
         </View>
         <View style={styles.statDivider} />
         <View style={styles.statItem}>
            <Text style={styles.statValue}>Healthy</Text>
            <Text style={styles.statLabel}>Condition</Text>
         </View>
      </View>

      {/* Main Grid */}
      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Quick Actions</Text>
         <View style={styles.grid}>
            <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/triage')}>
               <View style={[styles.gridIcon, { backgroundColor: '#E8F5E9' }]}>
                  <FontAwesome5 name="user-md" size={24} color="#2E8B57" />
               </View>
               <Text style={styles.gridLabel}>AI Router</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/chat')}>
               <View style={[styles.gridIcon, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="chatbubbles" size={24} color="#2196F3" />
               </View>
               <Text style={styles.gridLabel}>AI Chatbot</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.gridItem}
              onPress={() => router.push({
                pathname: "/(tabs)/booking",
                params: { doctorType: 'General Physician', hospitalName: 'Nearby Medical Center' }
              })}
            >
               <View style={[styles.gridIcon, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialIcons name="local-hospital" size={24} color="#FF9800" />
               </View>
               <Text style={styles.gridLabel}>Nearby Doctors</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/appointments')}>
               <View style={[styles.gridIcon, { backgroundColor: '#F3E5F5' }]}>
                  <MaterialIcons name="event-note" size={24} color="#9C27B0" />
               </View>
               <Text style={styles.gridLabel}>My History</Text>
            </TouchableOpacity>
         </View>
      </View>

      {/* Health Tips Section */}
      <View style={[styles.section, { marginBottom: 30 }]}>
         <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Health Tips</Text>
            <TouchableOpacity><Text style={styles.viewMore}>View All</Text></TouchableOpacity>
         </View>

         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
            {[
               { id: 1, title: 'Stay Hydrated', body: 'Drink at least 8 glasses of water a day to maintain energy levels.', icon: 'tint', color: '#03A9F4' },
               { id: 2, title: 'Regular Exercise', body: '30 minutes of walking can improve heart health significantly.', icon: 'walking', color: '#4CAF50' },
               { id: 3, title: 'Better Sleep', body: 'Aim for 7-9 hours of quality sleep to boost your immune system.', icon: 'moon', color: '#673AB7' },
            ].map((tip) => (
              <View key={tip.id} style={styles.tipCard}>
                 <FontAwesome5 name={tip.icon} size={32} color={tip.color} />
                 <Text style={styles.tipTitle}>{tip.title}</Text>
                 <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            ))}
         </ScrollView>
      </View>
      
      <View style={styles.emergencyBanner}>
         <MaterialIcons name="warning" size={32} color="#FFF" />
         <View style={styles.emergencyTextWrap}>
            <Text style={styles.emergencyTitle}>EMERGENCY?</Text>
            <Text style={styles.emergencyBody}>Call emergency services (911/112) immediately.</Text>
         </View>
         <TouchableOpacity style={styles.callBtn}>
            <MaterialIcons name="phone" size={24} color="#D32F2F" />
         </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  hero: { width: '100%', height: 260 },
  heroOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    padding: 25, 
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: { fontSize: 18, color: '#FFFFFF', fontWeight: '500' },
  heroTitle: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginTop: 10, lineHeight: 40 },
  triageBtn: { 
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row', 
    padding: 15, 
    borderRadius: 15, 
    alignSelf: 'flex-start',
    marginTop: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  triageBtnText: { color: '#2E8B57', fontSize: 16, fontWeight: '700', marginLeft: 10 },
  statsRow: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    margin: 20, 
    padding: 20, 
    borderRadius: 20, 
    elevation: 4, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginTop: -30
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#2E8B57' },
  statLabel: { fontSize: 12, color: '#8E8E93', marginTop: 4 },
  statDivider: { width: 1, height: '80%', backgroundColor: '#E0E0E0' },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 15 },
  viewMore: { color: '#2E8B57', fontSize: 14, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '23%', alignItems: 'center', marginBottom: 20 },
  gridIcon: { width: 60, height: 60, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridLabel: { fontSize: 12, color: '#555', fontWeight: '600', textAlign: 'center' },
  tipsScroll: { marginTop: 10, paddingBottom: 10 },
  tipCard: { 
    width: 200, 
    backgroundColor: '#F8F9F8', 
    marginRight: 15, 
    padding: 20, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  tipTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginTop: 15 },
  tipBody: { fontSize: 13, color: '#666', marginTop: 8, lineHeight: 18 },
  emergencyBanner: { 
    margin: 20, 
    backgroundColor: '#D32F2F', 
    padding: 20, 
    borderRadius: 25, 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40
  },
  emergencyTextWrap: { flex: 1, marginLeft: 15 },
  emergencyTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  emergencyBody: { color: '#FFEBEE', fontSize: 12, marginTop: 2 },
  callBtn: { backgroundColor: '#FFFFFF', width: 45, height: 45, borderRadius: 23, justifyContent: 'center', alignItems: 'center' }
});
