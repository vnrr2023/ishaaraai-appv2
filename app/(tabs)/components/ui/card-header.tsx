import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme-provider';

interface CardHeaderProps extends ViewProps {
  title?: string;
  children?: React.ReactNode;
}

export const CardHeader = ({ title, children, style, ...props }: CardHeaderProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <View style={[styles.header, style]} {...props}>
      <View style={styles.headerContent}>
        {title && (
          <Text style={[
            styles.title,
            { color: isDark ? '#ffffff' : '#000000' }
          ]}>
            {title}
          </Text>
        )}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});