"use client"
import React, { useRef, useState } from "react"
import { View, StyleSheet, Animated, PanResponder, ViewStyle, StyleProp } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../theme-provider"

interface GlareCardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  glareIntensity?: number
}

export const GlareCard: React.FC<GlareCardProps> = ({
  children,
  style,
  containerStyle,
  glareIntensity = 0.06,
}) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [isTouched, setIsTouched] = useState(false)
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const opacity = useRef(new Animated.Value(0)).current
  const cardDimensions = useRef({ width: 0, height: 0 })

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        setIsTouched(true)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start()
      },
      onPanResponderMove: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent
        position.setValue({ x: locationX, y: locationY })
      },
      onPanResponderRelease: () => {
        setIsTouched(false)
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start()
      },
    }),
  ).current

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout
    cardDimensions.current = { width, height }
  }

  return (
    <View style={[styles.container, containerStyle]} onLayout={handleLayout} {...panResponder.panHandlers}>
      <View
        style={[
          styles.content,
          style,
          {
            backgroundColor: isDark ? "#161B22" : "#FFFFFF",
            borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
            borderWidth: 1,
          },
        ]}
      >
        {children}
      </View>

      <Animated.View
        style={[
          styles.glareContainer,
          {
            opacity: opacity,
            transform: [
              {
                translateX: position.x.interpolate({
                  inputRange: [0, cardDimensions.current.width],
                  outputRange: [-150, cardDimensions.current.width + 150],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: position.y.interpolate({
                  inputRange: [0, cardDimensions.current.height],
                  outputRange: [-150, cardDimensions.current.height + 150],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={[
            `rgba(255,255,255,${glareIntensity * 2})`,
            `rgba(255,255,255,${glareIntensity})`,
            "transparent",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.3, 0.6]}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    marginVertical: 8,
  },
  content: {
    width: "100%",
    borderRadius: 16,
  },
  glareContainer: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    pointerEvents: "none",
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 150,
  },
})

export default GlareCard
