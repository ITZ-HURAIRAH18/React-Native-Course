import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { chatWithAI } from '../../api';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! I am your AI medical assistant. How can I help you today?', isAI: true, time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { id: Date.now().toString(), text: input, isAI: false, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI(input);
      const aiReply = { 
        id: (Date.now() + 1).toString(), 
        text: response.data.reply, 
        isAI: true, 
        time: new Date() 
      };
      setMessages(prev => [...prev, aiReply]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: 'err', 
        text: 'Sorry, I am having trouble connecting to the medical server.', 
        isAI: true, 
        time: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.isAI ? styles.aiContainer : styles.userContainer]}>
      <View style={[styles.bubble, item.isAI ? styles.aiBubble : styles.userBubble]}>
        <Text style={[styles.messageText, item.isAI ? styles.aiText : styles.userText]}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.timeText}>
        {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask a health question..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
          {loading ? (
             <ActivityIndicator color="#FFF" />
          ) : (
            <Ionicons name="send" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5' },
  listContent: { padding: 15, paddingBottom: 25 },
  messageContainer: { marginVertical: 8, maxWidth: '85%' },
  aiContainer: { alignSelf: 'flex-start' },
  userContainer: { alignSelf: 'flex-end' },
  bubble: {
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  aiBubble: { backgroundColor: '#FFFFFF', borderBottomLeftRadius: 2 },
  userBubble: { backgroundColor: '#2E8B57', borderBottomRightRadius: 2 },
  messageText: { fontSize: 16, lineHeight: 22 },
  aiText: { color: '#333' },
  userText: { color: '#FFFFFF' },
  timeText: { fontSize: 10, color: '#999', marginTop: 4, marginHorizontal: 12 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#2E8B57',
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  }
});
