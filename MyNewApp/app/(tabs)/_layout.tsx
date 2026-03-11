import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F2F2F7',
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#2E8B57',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="triage" 
        options={{ 
          title: 'AI Triage',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="stethoscope" size={size - 4} color={color} />
        }} 
      />
       <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="appointments" 
        options={{ 
          title: 'History',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="event" size={size} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="booking" 
        options={{ 
          href: null,
          title: 'Book Appointment'
        }} 
      />
    </Tabs>
  );
}
