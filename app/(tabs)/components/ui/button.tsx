import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  View 
} from 'react-native';
import { useTheme } from '../theme-provider';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  size = 'default', 
  children, 
  style, 
  ...props 
}: ButtonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const getVariantStyle = () => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: '#3b82f6', // primary
          color: '#ffffff',
        };
      case 'destructive':
        return {
          backgroundColor: '#ef4444', // destructive
          color: '#ffffff',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDark ? '#374151' : '#e5e7eb',
          color: isDark ? '#ffffff' : '#000000',
        };
      case 'secondary':
        return {
          backgroundColor: isDark ? '#374151' : '#e5e7eb',
          color: isDark ? '#ffffff' : '#000000',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: isDark ? '#ffffff' : '#000000',
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          textDecorationLine: 'underline',
        };
      default:
        return {};
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'default':
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontSize: 12,
        };
      case 'lg':
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
        };
      case 'icon':
        return {
          width: 40,
          height: 40,
          padding: 0,
          alignItems: 'center',
          justifyContent: 'center',
        };
      default:
        return {};
    }
  };

  const variantStyle = getVariantStyle();
  const sizeStyle = getSizeStyle();

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      gap: 8,
      backgroundColor: variantStyle.backgroundColor,
      borderWidth: variantStyle.borderWidth || 0,
      borderColor: variantStyle.borderColor,
      paddingVertical: sizeStyle.paddingVertical,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      width: sizeStyle.width,
      height: sizeStyle.height,
    },
    text: {
      color: variantStyle.color,
      fontWeight: '500',
      fontSize: sizeStyle.fontSize,
    },
  });

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      activeOpacity={0.7}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}