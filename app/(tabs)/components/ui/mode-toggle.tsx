import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Moon, Sun } from 'react-native-feather';
import { useTheme } from '../theme-provider';

export default function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const styles = StyleSheet.create({
    button: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      {isDark ? (
        <Sun stroke="#ffffff" width={20} height={20} />
      ) : (
        <Moon stroke="#000000" width={20} height={20} />
      )}
    </TouchableOpacity>
  );
}