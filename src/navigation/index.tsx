import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ModuleTopicsScreen } from '../screens/ModuleTopicsScreen';
import { LessonScreen } from '../screens/LessonScreen';
import { ModuleDetailScreen } from '../screens/ModuleDetailScreen';
import { AlgorithmsScreen } from '../screens/AlgorithmsScreen';
import { TimelineScreen } from '../screens/TimelineScreen';
import { ReferenceScreen } from '../screens/ReferenceScreen';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Learn tab'ı kendi stack'ine sahip
const LearnStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: theme.colors.background } }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="ModuleDetail" component={ModuleTopicsScreen} />
    <Stack.Screen name="Lesson" component={ModuleDetailScreen} />
    <Stack.Screen name="LessonContent" component={LessonScreen} />
  </Stack.Navigator>
);

const TAB_ICON: Record<string, string> = {
  Öğren: '◈',
  Algoritmalar: '⚡',
  Tarih: '◷',
  Kılavuz: '⌨',
};

export const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Text style={{ 
            fontSize: 20, 
            color: focused ? theme.colors.primary : theme.colors.textMuted 
          }}>
            {TAB_ICON[route.name]}
          </Text>
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 2,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingBottom: 14,
          paddingTop: 10,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontWeight: '600',
        },
        tabBarActiveBackgroundColor: 'transparent',
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      })}
    >
      <Tab.Screen name="Öğren" component={LearnStack} />
      <Tab.Screen name="Algoritmalar" component={AlgorithmsScreen} />
      <Tab.Screen name="Tarih" component={TimelineScreen} />
      <Tab.Screen name="Kılavuz" component={ReferenceScreen} />
    </Tab.Navigator>
  );
};
