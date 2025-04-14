import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme-provider';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <View 
      style={[
        styles.card,
        { 
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardContent = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

export const CardHeader = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
};

export const CardFooter = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
};

export const CardTitle = ({ children, style, ...props }: CardProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  return (
    <View style={[styles.cardTitle, style]} {...props}>
      {children}
    </View>
  );
};

export const CardDescription = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.cardDescription, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 16,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 6,
  },
  cardDescription: {
    marginBottom: 12,
  },
});