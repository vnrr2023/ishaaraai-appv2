import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Moon, Sun } from "react-native-feather"
import { useTheme } from "../theme-provider"

export default function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "rgba(230, 237, 243, 0.05)" : "rgba(28, 28, 28, 0.05)",
        },
      ]}
      onPress={toggleTheme}
    >
      {isDark ? (
        <View style={styles.content}>
          <Moon width={16} height={16} stroke="#E6EDF3" style={styles.icon} />
          <Text style={[styles.text, { color: "#E6EDF3", fontFamily: "Manrope-Medium" }]}>Dark</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <Sun width={16} height={16} stroke="#1C1C1C" style={styles.icon} />
          <Text style={[styles.text, { color: "#1C1C1C", fontFamily: "Manrope-Medium" }]}>Light</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
  },
})
