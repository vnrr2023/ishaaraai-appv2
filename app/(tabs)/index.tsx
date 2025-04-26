import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './components/theme-provider';
import HomeScreen from './screens/HomeScreen';
import TranslateScreen from './screens/TranslateScreen';
import GalleryScreen from './screens/GalleryScreen';
import AboutScreen from './screens/AboutScreen';
import ModelsScreen from './screens/ModelsScreen';
import ModelDetailScreen from './screens/ModelDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Translate" component={TranslateScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="Models" component={ModelsScreen} />
            <Stack.Screen name="ModelDetail" component={ModelDetailScreen} />
          </Stack.Navigator>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}