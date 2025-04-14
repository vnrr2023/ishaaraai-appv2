import React, { useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeIn,
  FadeInDown
} from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"
import { Twitter, Instagram, Linkedin, Github, ExternalLink } from "react-native-feather"
import { StatusBar } from "expo-status-bar"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../components/theme-provider"
import { useFonts } from "expo-font"
import LayoutWithNavbar from "../components/LayoutWithNavbar"

const { width } = Dimensions.get("window")

const projectInfo = [
  {
    content: "Over 63 million people in India, or about 6.3% of the population, are hard of hearing. This group is expected to grow due to factors such as aging. Though they do not regard their hearing loss as a disability, but rather a different way of life, their social interactions can be significantly limited.",
    image: "https://i.ibb.co/bBKHHfr/IMG-20240428-WA0011.jpg"
  },
  {
    content: "Our project focuses on creating a robust, scalable system to predict, interpret, and translate Indian Sign Language (ISL) in real-time, without requiring specialized hardware. ISL combines actions, facial expressions, and body language, differing from other sign languages like American Sign Language (ASL), which may use single-hand gestures; ISL usually uses both hands. This complexity presents challenges in developing an accurate machine learning model for ISL interpretation.",
    image: "https://i.ibb.co/P16PHjw/IMG-20240428-WA0010.jpg"
  },
  {
    content: "To create a more accessible solution, we started from scratch, building a new dataset of static actions frequently used in digital communication. We annotated these images and trained them using the MS COCO model. With the help of Roboflow, we were able to deploy our solution, ensuring real-time translation with low latency.",
    image: "https://i.ibb.co/K5Cq0GN/IMG-20240428-WA0007.jpg"
  }
]

const teamMembers = [
  { name: "Rehan Sayyed", role: "Fullstack Developer", image: require("./../../../assets/team/Rehan.jpg"), social: { twitter: "https://twitter.com/RehanFerozSayy1", instagram: "https://www.instagram.com/mr_rehan__06/", github: "https://github.com/rsayyed591/", linkedin: "https://www.linkedin.com/in/rehan42/" } },
  { name: "Vivek Chouhan", role: "Fullstack Developer", image: require("./../../../assets/team/Vivek.jpg"), social: { github: "https://github.com/Viv696969", linkedin: "https://www.linkedin.com/in/vivek-chouhan/" } },
  { name: "Nishikant Raut", role: "Fullstack Developer", image: require("./../../../assets/team/Nishi.png"), social: { instagram: "https://www.instagram.com/nishiuwu?igsh=MzRlODBiNWFlZA==", github: "https://github.com/Nishikant00", linkedin: "https://www.linkedin.com/in/nishidev/" } },
  { name: "Rohit Deshmukh", role: "Fullstack Developer", image: require("./../../../assets/team/Rohit.jpg"), social: { instagram: "https://www.instagram.com/__._.rohit_.__/", github: "https://github.com/ardie0727", linkedin: "https://www.linkedin.com/in/rohit-deshmukh-/" } },
]

const mentor = { name: "Fatima Anees Ansari", role: "Professor", image: require("./../../../assets/team/Fatima.jpg") }

export default function AboutScreen() {
  const navigation = useNavigation()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  
  // Load Manrope font
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./../../../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./../../../assets/fonts/Manrope-Bold.ttf"),
  })
  
  const openLink = (url) => {
    Linking.openURL(url)
  }

  if (!fontsLoaded) {
    return null
  }

  return (
    <LayoutWithNavbar>
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }
    ]} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Text style={[
            styles.pageTitle,
            { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }
          ]}>
            About Ishaara
          </Text>
        </Animated.View>

        {/* Project Information */}
        {projectInfo.map((info, index) => {
          const isEven = index % 2 === 0
          
          return (
            <Animated.View 
              key={index}
              entering={FadeInDown.duration(500).delay(200 + index * 100)}
              style={styles.infoContainer}
            >
              <View style={[
                styles.infoContent,
                { flexDirection: isEven ? "column" : "column-reverse" }
              ]}>
                <View style={styles.textContainer}>
                  <LinearGradient
                    colors={isDark ? 
                      ["rgba(15, 98, 254, 0.1)", "rgba(255, 87, 34, 0.05)"] : 
                      ["rgba(15, 98, 254, 0.05)", "rgba(255, 87, 34, 0.05)"]}
                    style={[
                      styles.cardGradient,
                      { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }
                    ]}
                  >
                    <Text style={[
                      styles.infoText,
                      { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Regular" }
                    ]}>
                      {info.content}
                    </Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: info.image }}
                    style={styles.infoImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </Animated.View>
          )
        })}

        {/* Legacy Website Section */}
        <Animated.View 
          entering={FadeInDown.duration(500).delay(500)}
          style={styles.sectionContainer}
        >
          <LinearGradient
            colors={isDark ? 
              ["rgba(15, 98, 254, 0.1)", "rgba(255, 87, 34, 0.05)"] : 
              ["rgba(15, 98, 254, 0.05)", "rgba(255, 87, 34, 0.05)"]}
            style={[
              styles.legacyCard,
              { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }
            ]}
          >
            <Text style={[
              styles.legacyTitle,
              { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }
            ]}>
              Our Journey
            </Text>
            <Text style={[
              styles.legacyText,
              { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
            ]}>
              We're excited to share that this current app represents an evolution of our project. Our team initially developed the Ishaara platform using React, which you can still explore at our legacy website. This original version served as the foundation for our current implementation, showcasing our commitment to continuous improvement and adoption of modern technologies.
            </Text>
            <TouchableOpacity
              style={[
                styles.legacyButton,
                { 
                  borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                  backgroundColor: isDark ? "rgba(230, 237, 243, 0.05)" : "rgba(28, 28, 28, 0.05)"
                }
              ]}
              onPress={() => openLink("https://ishaara.netlify.app/")}
            >
              <Text style={[
                styles.legacyButtonText,
                { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Medium" }
              ]}>
                Visit Legacy Website
              </Text>
              <ExternalLink 
                stroke={isDark ? "#E6EDF3" : "#1C1C1C"} 
                width={16} 
                height={16} 
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Thank You Section */}
        <Animated.View 
          entering={FadeInDown.duration(500).delay(600)}
          style={styles.sectionContainer}
        >
          <LinearGradient
            colors={isDark ? 
              ["rgba(15, 98, 254, 0.1)", "rgba(255, 87, 34, 0.05)"] : 
              ["rgba(15, 98, 254, 0.05)", "rgba(255, 87, 34, 0.05)"]}
            style={[
              styles.thanksCard,
              { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }
            ]}
          >
            <Text style={[
              styles.thanksTitle,
              { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }
            ]}>
              Special Thanks
            </Text>
            
            <View style={styles.thanksProfile}>
              <Image
                source={{ uri: "https://i.ibb.co/Ny78szP/nicholas.jpg" }}
                style={styles.thanksImage}
              />
              <View>
                <Text style={[
                  styles.thanksName,
                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }
                ]}>
                  Nicholas Renotte
                </Text>
                <Text style={[
                  styles.thanksRole,
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" }
                ]}>
                  AI Educator and Developer
                </Text>
              </View>
            </View>
            
            <Text style={[
              styles.thanksText,
              { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
            ]}>
              We extend our heartfelt thanks to Nicholas Renotte for his invaluable contributions to the field of artificial intelligence. His insightful YouTube videos have been an integral part of our project journey, providing clear explanations and practical demonstrations. His guidance through complex AI concepts has been superb, making difficult topics accessible and understandable.
            </Text>
            
            <TouchableOpacity
              style={styles.thanksButton}
              onPress={() => openLink("https://github.com/nicknochnack")}
            >
              <Text style={[styles.thanksButtonText, { fontFamily: "Manrope-Medium" }]}>
                Visit Nicholas's Github
              </Text>
              <Github stroke="#FFFFFF" width={16} height={16} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Team Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(700)}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }
          ]}>
            The Faces Behind Ishaara
          </Text>
        </Animated.View>
        
        <View style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.duration(500).delay(800 + index * 100)}
              style={styles.teamCardContainer}
            >
              <View style={[
                styles.teamCard,
                { 
                  backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                  borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
                }
              ]}>
                <View style={styles.teamCardInner}>
                  <Image
                    source={member.image}
                    style={styles.teamImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                    style={styles.teamOverlay}
                  >
                    <View style={styles.teamInfo}>
                      <Text style={[styles.teamName, { fontFamily: "Manrope-Bold" }]}>
                        {member.name}
                      </Text>
                      <Text style={[styles.teamRole, { fontFamily: "Manrope-Medium" }]}>
                        {member.role}
                      </Text>
                      <View style={styles.socialIcons}>
                        {member.social.twitter && (
                          <TouchableOpacity 
                            onPress={() => openLink(member.social.twitter)}
                            style={styles.socialIcon}
                          >
                            <Twitter stroke="#FFFFFF" width={18} height={18} />
                          </TouchableOpacity>
                        )}
                        {member.social.instagram && (
                          <TouchableOpacity 
                            onPress={() => openLink(member.social.instagram)}
                            style={styles.socialIcon}
                          >
                            <Instagram stroke="#FFFFFF" width={18} height={18} />
                          </TouchableOpacity>
                        )}
                        {member.social.github && (
                          <TouchableOpacity 
                            onPress={() => openLink(member.social.github)}
                            style={styles.socialIcon}
                          >
                            <Github stroke="#FFFFFF" width={18} height={18} />
                          </TouchableOpacity>
                        )}
                        {member.social.linkedin && (
                          <TouchableOpacity 
                            onPress={() => openLink(member.social.linkedin)}
                            style={styles.socialIcon}
                          >
                            <Linkedin stroke="#FFFFFF" width={18} height={18} />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Mentor Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(1200)}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }
          ]}>
            The Mentor Behind Ishaara
          </Text>
        </Animated.View>
        
        <View style={styles.mentorContainer}>
          <Animated.View 
            entering={FadeInDown.duration(500).delay(1300)}
            style={styles.mentorCardContainer}
          >
            <View style={[
              styles.mentorCard,
              { 
                backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
              }
            ]}>
              <View style={styles.mentorCardInner}>
                <Image
                  source={mentor.image}
                  style={styles.mentorImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                  style={styles.mentorOverlay}
                >
                  <View style={styles.mentorInfo}>
                    <Text style={[styles.mentorName, { fontFamily: "Manrope-Bold" }]}>
                      {mentor.name}
                    </Text>
                    <Text style={[styles.mentorRole, { fontFamily: "Manrope-Medium" }]}>
                      {mentor.role}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </Animated.View>
        </View>
        
        {/* Bottom padding for scrolling past bottom navbar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
    </LayoutWithNavbar>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoContent: {
    gap: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardGradient: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
  },
  imageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
  infoImage: {
    width: "100%",
    height: "100%",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  legacyCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  legacyTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  legacyText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  legacyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "center",
  },
  legacyButtonText: {
    fontSize: 14,
  },
  thanksCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  thanksTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  thanksProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  thanksImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  thanksName: {
    fontSize: 18,
  },
  thanksRole: {
    fontSize: 14,
  },
  thanksText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  thanksButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#0F62FE",
    alignSelf: "center",
  },
  thanksButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  teamCardContainer: {
    width: width / 2 - 24,
    marginBottom: 16,
  },
  teamCard: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  teamCardInner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  teamImage: {
    width: "100%",
    height: "100%",
  },
  teamOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-end",
  },
  teamInfo: {
    padding: 16,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  teamRole: {
    fontSize: 12,
    color: "#E6EDF3",
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 8,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  mentorContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  mentorCardContainer: {
    width: 200,
  },
  mentorCard: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  mentorCardInner: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  mentorImage: {
    width: "100%",
    height: "100%",
  },
  mentorOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-end",
  },
  mentorInfo: {
    padding: 16,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  mentorRole: {
    fontSize: 12,
    color: "#E6EDF3",
  },
})
