import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: any;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  style 
}: AnimatedCounterProps) {
  const animatedValue = useSharedValue(0);
  const textRef = useRef<Text>(null);
  const [displayValue, setDisplayValue] = React.useState('0');

  useEffect(() => {
    animatedValue.value = 0;
    animatedValue.value = withTiming(value, { duration: duration * 1000 });
  }, [value, duration]);

  const updateText = (val: number) => {
    setDisplayValue(Intl.NumberFormat('en-US').format(Math.floor(val)));
  };

  const animatedProps = useAnimatedProps(() => {
    runOnJS(updateText)(animatedValue.value);
    return {};
  });

  return (
    <AnimatedText 
      ref={textRef} 
      animatedProps={animatedProps}
      style={style}
    >
      {displayValue}
    </AnimatedText>
  );
}