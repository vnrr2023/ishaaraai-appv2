import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { Box, Cpu, Layers, Mail, Github, ExternalLink, ChevronRight } from "react-native-feather"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../components/theme-provider"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useFonts } from "expo-font"
import GlareCard from "../components/ui/glare-card"
import Navbar from "../components/navbar"
import LayoutWithNavbar from "../components/LayoutWithNavbar"

const { width } = Dimensions.get("window")

const models = [
  {
    id: "gru",
    title: "GRU Based Sequence To Sequence Model",
    subtitle: "using Mediapipe",
    description: `Leveraging MediaPipe's powerful landmark detection capabilities, this model achieves an impressive 99% testing accuracy across 6 distinct actions. The model supports basic conversational signs including 'hello', 'how are you', 'sorry', 'welcome', and 'thank you', along with a 'blank' state for no action.

    Key Features:
    • Landmark extraction from student video data
    • Ready model implementation
    • Depth detection capabilities
    • ChatGPT integration for sentence creation
    • Automated sign processing`,
    gif: require("./../../../assets/modelgifs/rnn.gif"),
    icon: <Box stroke="#ffffff" width={24} height={24} />,
    metrics: ["99% Testing Accuracy", "6 Action Classes", "Real-time Processing"],
    githubLink: "https://github.com/vnrr2023/Ishaara_Ai.git",
  },
  {
    id: "convlstm",
    title: "ConvLSTM Based Model",
    subtitle: "Hybrid Architecture",
    description: `A sophisticated hybrid approach combining Convolutional layers with LSTM cells for advanced video classification. This model represents a perfect balance between spatial and temporal feature extraction, trained extensively on our custom dataset.

    Key Features:
    • Hybrid CNN-LSTM architecture
    • Comprehensive video classification
    • CPU-optimized training process
    • Efficient model storage system
    • Real-time prediction capabilities`,
    gif: require("./../../../assets/modelgifs/convlstm.gif"),
    icon: <Layers stroke="#ffffff" width={24} height={24} />,
    metrics: ["8 Hours Training", "Optimized Architecture", "Real-time Inference"],
    githubLink: "https://github.com/vnrr2023/Ishaara_Ai.git",
  },
  {
    id: "conv3d",
    title: "Conv3D Based Video Classification",
    subtitle: "Advanced Approach",
    description: `An ambitious implementation utilizing 3D convolutions for comprehensive spatio-temporal feature learning. While currently limited by hardware constraints, this model represents our vision for future development.

    Technical Requirements:
    • 32GB+ RAM
    • High-performance GPU
    • Powerful CPU
    • 3GB Model Size`,
    gif: require("./../../../assets/modelgifs/3d.gif"),
    icon: <Cpu stroke="#ffffff" width={24} height={24} />,
    metrics: ["3GB Model Size", "32GB+ RAM Required", "GPU Optimized"],
    contact: "chouhanvivek207@gmail.com",
  },
]

export default function ModelsScreen() {
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

  const handleOpenLink = (url) => {
    Linking.openURL(url)
  }

  const handleContact = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const handleModelPress = (modelId) => {
    navigation.navigate("ModelDetail" as never, { modelId } as never)
  }

  if (!fontsLoaded) {
    return null
  }

  return (
    <LayoutWithNavbar>
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }]} edges={["top"]}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={isDark ? 
                ["rgba(15, 98, 254, 0.3)", "rgba(139, 92, 246, 0.3)"] : 
                ["rgba(240, 248, 255, 0.9)", "rgba(224, 242, 254, 0.9)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <Animated.Text
                entering={FadeInDown.duration(500).delay(100)}
                style={[styles.sectionTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
              >
                Research Models
              </Animated.Text>
              <Text 
                style={[
                  styles.headerSubtitle, 
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
                ]}
              >
                Explore our advanced sign language translation models
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.modelsContainer}>
            {models.map((model, index) => (
              <Animated.View
                key={model.id}
                entering={FadeInDown.delay(index * 200).duration(500)}
                style={styles.modelCardContainer}
              >
                <GlareCard>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleModelPress(model.id)}
                    style={[
                      styles.modelCard,
                      {
                        backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                        borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                      },
                    ]}
                  >
                    <View style={styles.modelImageContainer}>
                      <LinearGradient
                        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
                        style={styles.modelImageOverlay}
                      />
                      <Image source={model.gif} style={styles.modelImage} resizeMode="cover" />
                    </View>

                    <View style={styles.modelContent}>
                      <View style={styles.modelHeader}>
                        <LinearGradient 
                          colors={getGradientForModel(model.id)} 
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.iconContainer}
                        >
                          {model.icon}
                        </LinearGradient>
                        <View style={styles.titleContainer}>
                          <Text
                            style={[
                              styles.modelTitle,
                              { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" },
                            ]}
                          >
                            {model.title}
                          </Text>
                          <Text style={[styles.modelSubtitle, { color: "#0F62FE", fontFamily: "Manrope-Medium" }]}>
                            {model.subtitle}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={[
                          styles.modelDescription,
                          { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" },
                        ]}
                      >
                        {model.description}
                      </Text>

                      <View style={styles.metricsContainer}>
                        {model.metrics.map((metric, idx) => (
                          <View
                            key={idx}
                            style={[
                              styles.metricBadge,
                              { backgroundColor: isDark ? "rgba(15, 98, 254, 0.1)" : "rgba(15, 98, 254, 0.1)" },
                            ]}
                          >
                            <Text style={[styles.metricText, { color: "#0F62FE", fontFamily: "Manrope-Medium" }]}>
                              {metric}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.actionsContainer}>
                        {model.githubLink && (
                          <TouchableOpacity
                            style={[
                              styles.actionButton,
                              {
                                borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                                backgroundColor: isDark ? "rgba(230, 237, 243, 0.05)" : "rgba(28, 28, 28, 0.05)",
                              },
                            ]}
                            onPress={() => handleOpenLink(model.githubLink)}
                          >
                            <View style={styles.buttonContent}>
                              <Github
                                stroke={isDark ? "#E6EDF3" : "#1C1C1C"}
                                width={16}
                                height={16}
                                style={styles.buttonIcon}
                              />
                              <Text
                                style={[
                                  styles.buttonText,
                                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Medium" },
                                ]}
                              >
                                View on GitHub
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}

                        {model.contact && (
                          <TouchableOpacity
                            style={[
                              styles.actionButton,
                              {
                                borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                                backgroundColor: isDark ? "rgba(230, 237, 243, 0.05)" : "rgba(28, 28, 28, 0.05)",
                              },
                            ]}
                            onPress={() => handleContact(model.contact)}
                          >
                            <View style={styles.buttonContent}>
                              <Mail
                                stroke={isDark ? "#E6EDF3" : "#1C1C1C"}
                                width={16}
                                height={16}
                                style={styles.buttonIcon}
                              />
                              <Text
                                style={[
                                  styles.buttonText,
                                  { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Medium" },
                                ]}
                              >
                                Contact for Dataset
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.viewDetailsButton}
                        onPress={() => handleModelPress(model.id)}
                      >
                        <Text style={[styles.viewDetailsText, { fontFamily: "Manrope-SemiBold" }]}>
                          View Details
                        </Text>
                        <ChevronRight width={16} height={16} stroke="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </GlareCard>
              </Animated.View>
            ))}
          </View>

          {/* Bottom padding for scrolling past bottom navbar */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </LayoutWithNavbar>
  )
}

// Helper function to get gradient colors for models
function getGradientForModel(modelId) {
  switch(modelId) {
    case "gru":
      return ["#0F62FE", "#2196F3"];
    case "convlstm":
      return ["#8B5CF6", "#A78BFA"];
    case "conv3d":
      return ["#FF5722", "#FF9800"];
    default:
      return ["#10B981", "#34D399"];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerGradient: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  modelsContainer: {
    gap: 24,
  },
  modelCardContainer: {
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  modelCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  modelImageContainer: {
    height: 220,
    width: "100%",
    backgroundColor: "#000",
    position: "relative",
  },
  modelImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modelImage: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  modelContent: {
    padding: 20,
  },
  modelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  modelTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  modelSubtitle: {
    fontSize: 14,
  },
  modelDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  metricBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  metricText: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    minWidth: 150,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F62FE",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#0F62FE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  viewDetailsText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 8,
  },
})