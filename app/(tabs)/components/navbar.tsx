import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Home, Camera, Image as ImageIcon, Info, Layers } from "react-native-feather"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { useTheme } from "./theme-provider"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

const { width } = Dimensions.get("window")

const navItems = [
  { name: "Home", route: "Home", icon: Home },
  { name: "Translate", route: "Translate", icon: Camera },
  { name: "Gallery", route: "Gallery", icon: ImageIcon },
  { name: "About", route: "About", icon: Info },
  { name: "Models", route: "Models", icon: Layers },
]

export default function Navbar() {
  const navigation = useNavigation()
  const route = useRoute()
  // const { resolvedTheme } = useTheme()
  const isDark = "dark"
  const insets = useSafeAreaInsets()

  const handleNavigation = (routeName: string) => {
    navigation.navigate(routeName as never)
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#161B22" : "#FFFFFF",
          borderTopColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
          paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
        },
      ]}
    >
      {navItems.map((item) => {
        const isActive = route.name === item.route
        const IconComponent = item.icon

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => handleNavigation(item.route)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                isActive && {
                  backgroundColor: isDark
                    ? "rgba(15, 98, 254, 0.15)"
                    : "rgba(15, 98, 254, 0.1)",
                },
              ]}
            >
              <IconComponent
                width={20}
                height={20}
                stroke={isActive ? "#0F62FE" : isDark ? "#8B949E" : "#5E6C84"}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </Animated.View>
            <Text
              style={[
                styles.navText,
                {
                  color: isActive ? "#0F62FE" : isDark ? "#8B949E" : "#5E6C84",
                  fontFamily: isActive ? "Manrope-SemiBold" : "Manrope-Medium",
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingTop: 12,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: width / 5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
})
