import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  TouchableOpacityProps 
} from 'react-native';
import { useTheme } from '../theme-provider';

interface SwitchProps extends TouchableOpacityProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({ 
  checked, 
  onCheckedChange, 
  disabled = false, 
  style, 
  ...props 
}: SwitchProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  const thumbAnim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;
  
  React.useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [checked, thumbAnim]);
  
  const thumbTranslate = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });
  
  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.track,
        {
          backgroundColor: checked 
            ? '#3b82f6' 
            : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          opacity: disabled ? 0.5 : 1,
        },
        style
      ]}
      disabled={disabled}
      {...props}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: isDark ? '#000000' : '#ffffff',
            transform: [{ translateX: thumbTranslate }],
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});