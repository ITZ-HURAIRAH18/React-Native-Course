import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const FEATURES = [
  { icon: '🚀', title: 'Fast', description: 'Lightning-fast performance' },
  { icon: '🎨', title: 'Beautiful', description: 'Clean modern design' },
  { icon: '🔒', title: 'Secure', description: 'Your data stays safe' },
  { icon: '🌍', title: 'Connected', description: 'Stay in sync everywhere' },
];

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
}

function HomeScreen({ isDarkMode }: { isDarkMode: boolean }) {
  const insets = useSafeAreaInsets();
  const colors = isDarkMode
    ? { bg: '#121212', card: '#1E1E1E', text: '#FFFFFF', sub: '#AAAAAA', accent: '#6C63FF' }
    : { bg: '#F5F7FA', card: '#FFFFFF', text: '#1A1A2E', sub: '#6B7280', accent: '#6C63FF' };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.sub }]}>Welcome back 👋</Text>
        <Text style={[styles.title, { color: colors.text }]}>Home</Text>
      </View>

      {/* Hero Card */}
      <View style={[styles.heroCard, { backgroundColor: colors.accent }]}>
        <Text style={styles.heroTitle}>Explore React Native</Text>
        <Text style={styles.heroSubtitle}>
          Build amazing cross-platform apps with ease.
        </Text>
        <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
          <Text style={styles.heroButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
      <View style={styles.featuresGrid}>
        {FEATURES.map((feature) => (
          <View key={feature.title} style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
            <Text style={[styles.featureDesc, { color: colors.sub }]}>{feature.description}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      {['📋 View Tasks', '📊 Dashboard', '⚙️ Settings'].map((action) => (
        <TouchableOpacity
          key={action}
          style={[styles.actionRow, { backgroundColor: colors.card }]}
          activeOpacity={0.7}>
          <Text style={[styles.actionText, { color: colors.text }]}>{action}</Text>
          <Text style={{ color: colors.sub, fontSize: 18 }}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 18,
    lineHeight: 20,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  heroButtonText: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    marginBottom: 28,
  },
  featureCard: {
    width: '46%',
    marginHorizontal: '2%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
