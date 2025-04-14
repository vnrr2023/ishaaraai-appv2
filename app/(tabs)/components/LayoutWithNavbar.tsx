import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./navbar";

export default function LayoutWithNavbar({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Enough space for Navbar
  },
});
