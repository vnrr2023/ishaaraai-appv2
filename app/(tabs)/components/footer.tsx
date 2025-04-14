import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Facebook, Twitter, Instagram, Linkedin, Github, ExternalLink } from "react-native-feather"
import { useTheme } from "./theme-provider"
import { LinearGradient } from "expo-linear-gradient"

export function Footer() {
  const navigation = useNavigation()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <View style={[styles.footer, { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }]}>
      <LinearGradient
        colors={
          isDark
            ? ["rgba(15, 98, 254, 0.1)", "rgba(255, 87, 34, 0.1)"]
            : ["rgba(15, 98, 254, 0.05)", "rgba(255, 87, 34, 0.05)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.grid}>
          <View style={styles.section}>
            <Text style={[styles.title, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
              Ishaara
            </Text>
            <Text style={[styles.description, { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }]}>
              Converting Indian Sign Language to text in real-time.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.linkTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }]}>
              Quick Links
            </Text>
            <View style={styles.linkList}>
              {[
                { name: "Home", route: "Home" },
                { name: "Translate", route: "Translate" },
                { name: "Gallery", route: "Gallery" },
                { name: "About", route: "About" },
              ].map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => navigation.navigate(item.route as never)}
                  style={styles.linkItem}
                >
                  <Text
                    style={[styles.link, { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" }]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.linkTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }]}>
              Connect With Us
            </Text>
            <View style={styles.socialContainer}>
              {[
                { icon: Github, url: "https://Github.com/ishaara" },
                { icon: Twitter, url: "https://twitter.com/ishaara" },
                { icon: Instagram, url: "https://instagram.com/ishaara" },
                { icon: Linkedin, url: "https://linkedin.com/company/ishaara" },
              ].map((social, index) => {
                const IconComponent = social.icon
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.socialButton,
                      { backgroundColor: isDark ? "rgba(230, 237, 243, 0.05)" : "rgba(28, 28, 28, 0.05)" },
                    ]}
                    onPress={() => openLink(social.url)}
                  >
                    <IconComponent stroke={isDark ? "#8B949E" : "#5E6C84"} width={18} height={18} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>

        <View style={[styles.divider, { borderTopColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }]} />

        <View style={styles.bottomSection}>
          <Text style={[styles.copyright, { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }]}>
            © {new Date().getFullYear()} Ishaara. All rights reserved.
          </Text>
          <TouchableOpacity
            style={styles.legacyLink}
            onPress={() => openLink("https://ishaara.netlify.app/")}
          >
            <Text style={[styles.legacyText, { color: "#0F62FE", fontFamily: "Manrope-Medium" }]}>
              Legacy Website
            </Text>
            <ExternalLink stroke="#0F62FE" width={14} height={14} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    paddingBottom: 80, // Space for bottom navbar
  },
  gradientContainer: {
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  grid: {
    flexDirection: "column",
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  linkList: {
    gap: 10,
  },
  linkItem: {
    paddingVertical: 4,
  },
  link: {
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    borderTopWidth: 1,
    marginVertical: 16,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyright: {
    fontSize: 12,
  },
  legacyLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  legacyText: {
    fontSize: 12,
  },
})

export default Footer
