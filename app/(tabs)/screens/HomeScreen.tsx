import React, { useEffect } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  Target, 
  Smartphone, 
  ExternalLink,
  ChevronRight
} from "react-native-feather"
import { useTheme } from "../components/theme-provider"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { StatusBar } from "expo-status-bar"
import { useFonts } from "expo-font"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import AnimatedCounter from "../components/ui/animated-counter"
import LayoutWithNavbar from "../components/LayoutWithNavbar"

const { width } = Dimensions.get("window")

export default function HomeScreen() {
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

  if (!fontsLoaded) {
    return null
  }

  return (
    <LayoutWithNavbar>
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }]} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(800).delay(100)} style={styles.heroSection}>
          <LinearGradient
            colors={isDark ? ["rgba(15, 98, 254, 0.2)", "rgba(255, 87, 34, 0.2)"] : ["rgba(15, 98, 254, 0.1)", "rgba(255, 87, 34, 0.1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <Text style={[styles.heroTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
              Convert <Text style={{ color: "#0F62FE" }}>Indian Sign Language</Text> To Text In Real-Time
            </Text>
            <Text style={[styles.heroSubtitle, { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }]}>
              Trained on <Text style={{ color: "#0F62FE", fontFamily: "Manrope-SemiBold" }}>41k+</Text> images using <Text style={{ color: "#0F62FE", fontFamily: "Manrope-SemiBold" }}>RTX 4060</Text>, 
              refined over <Text style={{ color: "#0F62FE", fontFamily: "Manrope-SemiBold" }}>34 hrs</Text> for unmatched accuracy
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => navigation.navigate("Translate" as never)}
              >
                <Text style={[styles.buttonText, styles.primaryButtonText, { fontFamily: "Manrope-SemiBold" }]}>
                  Get Started
                </Text>
                <ArrowRight width={18} height={18} stroke="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.secondaryButton, 
                  { borderColor: isDark ? "rgba(230, 237, 243, 0.2)" : "rgba(28, 28, 28, 0.2)" }
                ]}
              >
                <Text style={[
                  styles.buttonText, 
                  styles.secondaryButtonText, 
                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }
                ]}>
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Counter Section */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(200)} 
          style={[
            styles.section, 
            { backgroundColor: isDark ? "#161B22" : "#FFFFFF", borderRadius: 16, marginHorizontal: 16 }
          ]}
        >
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Statistics
          </Text>
          <View style={styles.counterGrid}>
            {[
              { title: "Deaf and Mute People in India", count: 63000000 },
              { title: "Users of Indian Sign Language", count: 8435000 },
              { title: "ISL Translators", count: 250 },
            ].map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.counterCard, 
                  { 
                    backgroundColor: isDark ? "rgba(13, 17, 23, 0.5)" : "rgba(248, 250, 252, 0.5)",
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
                  }
                ]}
              >
                <Text style={[
                  styles.counterTitle, 
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" }
                ]}>
                  {item.title}
                </Text>
                <Text style={[styles.counterValue, { color: "#0F62FE", fontFamily: "Manrope-Bold" }]}>
                  <AnimatedCounter value={item.count} />
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Ishaara Models Section */}
        <Animated.View entering={FadeInDown.duration(800).delay(300)} style={styles.sectionContainer}>
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Ishaara Models
          </Text>
          <View style={styles.modelsGrid}>
            {[
              {
                name: "Alphanet",
                image: require("./../../../assets/models/A.png"),
                details: "Alphabets Only",
                version: "releasing soon",
                link: "alphanet"
              },
              {
                name: "Lexnet",
                image: require("./../../../assets/models/A1.png"),
                details: "Words Only",
                version: "2.0",
                link: "lexnet"
              },
              {
                name: "Ishaara Net",
                image: require("./../../../assets/models/A2.png"),
                details: "Alphabets + Words",
                version: "releasing soon",
                link: "ishaaranet"
              }
            ].map((model, index) => (
              <View 
                key={index} 
                style={[
                  styles.modelCard, 
                  { 
                    backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
                  }
                ]}
              >
                <View style={styles.modelImageContainer}>
                  <Image 
                    source={model.image} 
                    style={styles.modelImage}
                  />
                </View>
                <View style={styles.modelContent}>
                  <Text style={[
                    styles.modelName, 
                    { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }
                  ]}>
                    {model.name}
                  </Text>
                  <Text style={[
                    styles.modelDetails, 
                    { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
                  ]}>
                    {model.details}
                  </Text>
                  <View style={styles.modelFooter}>
                    <Text style={[
                      styles.modelVersion,
                      model.version === "releasing soon" ? styles.versionReleasing : styles.versionAvailable,
                      { fontFamily: "Manrope-Medium" }
                    ]}>
                      {model.version === "releasing soon" ? "Coming Soon" : `Version ${model.version}`}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.modelButton,
                        model.version === "releasing soon" ? styles.disabledButton : {},
                        { backgroundColor: model.version === "releasing soon" ? (isDark ? "#161B22" : "#F1F5F9") : "#0F62FE" }
                      ]}
                      disabled={model.version === "releasing soon"}
                      onPress={() => navigation.navigate("ModelDetail" as never, { model: model.link } as never)}
                    >
                      <ChevronRight 
                        width={16} 
                        height={16} 
                        stroke={model.version === "releasing soon" ? (isDark ? "#8B949E" : "#5E6C84") : "#FFFFFF"} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Services Section */}
        <Animated.View entering={FadeInDown.duration(800).delay(400)} style={styles.sectionContainer}>
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Our Services
          </Text>
          <View style={styles.servicesGrid}>
            {[
              {
                title: "Real-time Translation",
                description: "Convert Indian Sign Language to text instantly.",
                icon: <ArrowRight stroke="#FFFFFF" width={24} height={24} />,
                gradient: ["#0F62FE", "#2196F3"],
              },
              {
                title: "Fast Processing",
                description: "Lightning-fast processing for seamless communication.",
                icon: <Zap stroke="#FFFFFF" width={24} height={24} />,
                gradient: ["#FF5722", "#FF9800"],
              },
              {
                title: "Secure Platform",
                description: "Your data is protected with enterprise-grade security.",
                icon: <Shield stroke="#FFFFFF" width={24} height={24} />,
                gradient: ["#10B981", "#34D399"],
              },
              {
                title: "Community Support",
                description: "Join a growing community of users and contributors.",
                icon: <Users stroke="#FFFFFF" width={24} height={24} />,
                gradient: ["#8B5CF6", "#A78BFA"],
              },
            ].map((service, index) => (
              <View 
                key={index} 
                style={[
                  styles.serviceCard, 
                  { 
                    backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
                  }
                ]}
              >
                <LinearGradient
                  colors={service.gradient}
                  style={styles.serviceIcon}
                >
                  {service.icon}
                </LinearGradient>
                <Text style={[
                  styles.serviceTitle, 
                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }
                ]}>
                  {service.title}
                </Text>
                <Text style={[
                  styles.serviceDescription, 
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
                ]}>
                  {service.description}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Features Section */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(500)} 
          style={[
            styles.section, 
            { backgroundColor: isDark ? "#161B22" : "#FFFFFF", borderRadius: 16, marginHorizontal: 16 }
          ]}
        >
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Key Features
          </Text>
          <View style={styles.featuresGrid}>
            {[
              {
                title: "Sign to Text Conversion",
                description: "Advanced algorithms for accurate sign language interpretation",
                icon: <Zap stroke="#FFFFFF" width={24} height={24} />,
              },
              {
                title: "Real-time Processing",
                description: "Instant translation with minimal latency",
                icon: <Clock stroke="#FFFFFF" width={24} height={24} />,
              },
              {
                title: "High Accuracy",
                description: "Precise recognition powered by AI",
                icon: <Target stroke="#FFFFFF" width={24} height={24} />,
              },
              {
                title: "User-friendly Interface",
                description: "Intuitive design for seamless experience",
                icon: <Smartphone stroke="#FFFFFF" width={24} height={24} />,
              },
            ].map((feature, index) => (
              <View 
                key={index} 
                style={[
                  styles.featureCard, 
                  { 
                    backgroundColor: isDark ? "rgba(13, 17, 23, 0.5)" : "rgba(248, 250, 252, 0.5)",
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" 
                  }
                ]}
              >
                <LinearGradient
                  colors={["#0F62FE", "#2196F3"]}
                  style={styles.featureIcon}
                >
                  {feature.icon}
                </LinearGradient>
                <Text style={[
                  styles.featureTitle, 
                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" }
                ]}>
                  {feature.title}
                </Text>
                <Text style={[
                  styles.featureDescription, 
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
                ]}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Use Case Section */}
        <Animated.View entering={FadeInDown.duration(800).delay(600)} style={styles.sectionContainer}>
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Use Cases
          </Text>
          <View style={styles.useCasesGrid}>
            {[
              {
                title: "Education",
                description: "Enabling inclusive education through real-time sign language translation.",
                image: require("./../../../assets/usecases/education.jpg"),
              },
              {
                title: "Healthcare",
                description: "Improving medical communication for deaf and mute patients.",
                image: require("./../../../assets/usecases/healthcare.jpg"),
              },
              {
                title: "Public Services",
                description: "Making government services accessible to everyone.",
                image: require("./../../../assets/usecases/government.jpeg"),
              },
              {
                title: "Workplace Communication",
                description: "Creating inclusive workplaces with seamless communication.",
                image: require("./../../../assets/usecases/workplace.jpg"),
              },
            ].map((useCase, index) => (
              <View key={index} style={styles.useCaseCard}>
                <ImageBackground
                  source={useCase.image}
                  style={styles.useCaseImage}
                  imageStyle={{ borderRadius: 16 }}
                >
                  <LinearGradient
                    colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
                    style={styles.useCaseOverlay}
                  >
                    <Text style={[styles.useCaseTitle, { fontFamily: "Manrope-Bold" }]}>
                      {useCase.title}
                    </Text>
                    <Text style={[styles.useCaseDescription, { fontFamily: "Manrope-Regular" }]}>
                      {useCase.description}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Try It Now Section */}
        <Animated.View entering={FadeInDown.duration(800).delay(700)} style={styles.ctaContainer}>
          <LinearGradient
            colors={["#0F62FE", "#2196F3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaSection}
          >
            <Text style={[styles.ctaTitle, { fontFamily: "Manrope-Bold" }]}>
              Experience Ishaara Now
            </Text>
            <Text style={[styles.ctaDescription, { fontFamily: "Manrope-Regular" }]}>
              Join thousands of users who are already breaking communication barriers with Ishaara.
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => navigation.navigate("Translate" as never)}
            >
              <Text style={[styles.ctaButtonText, { fontFamily: "Manrope-SemiBold" }]}>
                Try It Now
              </Text>
              <ArrowRight stroke="#0F62FE" width={20} height={20} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* Architecture Section */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(800)} 
          style={[
            styles.section, 
            { backgroundColor: isDark ? "#161B22" : "#FFFFFF", borderRadius: 16, marginHorizontal: 16 }
          ]}
        >
          <Text style={[styles.sectionHeader, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
            Our Architecture
          </Text>
          <View style={styles.architectureContainer}>
            <Image
              source={require("./../../../assets/architecture.gif")}
              style={styles.architectureImage}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  </LayoutWithNavbar>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Space for bottom navbar
  },
  heroSection: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  heroGradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 140,
  },
  primaryButton: {
    backgroundColor: "#0F62FE",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#000000",
  },
  section: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  counterGrid: {
    gap: 16,
  },
  counterCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  counterTitle: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  counterValue: {
    fontSize: 28,
    textAlign: "center",
  },
  modelsGrid: {
    gap: 16,
  },
  modelCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 16,
  },
  modelImageContainer: {
    height: 180,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  modelImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modelContent: {
    padding: 16,
  },
  modelName: {
    fontSize: 18,
    marginBottom: 4,
  },
  modelDetails: {
    fontSize: 14,
    marginBottom: 16,
  },
  modelFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modelVersion: {
    fontSize: 14,
  },
  versionReleasing: {
    color: "#FF9800",
  },
  versionAvailable: {
    color: "#10B981",
  },
  modelButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  useCasesGrid: {
    gap: 16,
  },
  useCaseCard: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  useCaseImage: {
    width: "100%",
    height: "100%",
  },
  useCaseOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  useCaseTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  useCaseDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  ctaContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  ctaSection: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  ctaDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 24,
    textAlign: "center",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    color: "#0F62FE",
    marginRight: 8,
  },
  architectureContainer: {
    alignItems: "center",
  },
  architectureImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
})
