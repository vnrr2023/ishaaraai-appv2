import { useState, useCallback, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CameraView, type CameraType, useCameraPermissions } from "expo-camera"
import { StatusBar } from "expo-status-bar"
import { debounce } from "lodash"
import { LinearGradient } from "expo-linear-gradient"
import {
  AlertCircle,
  Play,
  Square,
  CameraOff,
  Camera,
  RefreshCw,
  Trash2,
  Info,
  CheckCircle,
  Zap,
} from "react-native-feather"
import { useTheme } from "./../components/theme-provider"
import { useFonts } from "expo-font"
import * as Haptics from "expo-haptics"
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from "react-native-reanimated"
import Navbar from "../components/navbar"

const { width } = Dimensions.get("window")

// Replace with your actual API key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`

// Assuming labels.json is imported correctly
const validSigns = [
  "I", "afternoon", "bye", "deaf", "good", "hello", "home",
  "how are you", "i am fine", "indian", "live", "morning",
  "namaste", "name", "sorry", "thank you", "time", "yes",
]

export default function TranslateScreen() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Load Manrope font
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./../../../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./../../../assets/fonts/Manrope-Bold.ttf"),
  })

  const [inferRunning, setInferRunning] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [translation, setTranslation] = useState("")
  const [error, setError] = useState("")
  const [currentLabel, setCurrentLabel] = useState("")
  const [detectedWords, setDetectedWords] = useState([])
  const [facing, setFacing] = useState<CameraType>("front")
  const [permission, requestPermission] = useCameraPermissions()
  const [showInstructions, setShowInstructions] = useState(true)

  const detectionInterval = useRef(null)
  const scrollViewRef = useRef(null)

  const toggleCamera = async () => {
    if (isCameraOn) {
      setIsCameraOn(false)
      if (inferRunning) {
        stopInfer()
      }
    } else {
      if (!permission?.granted) {
        Alert.alert("Camera Permission Required", "Please grant camera permission to use this feature", [
          { text: "OK", onPress: requestPermission },
        ])
        return
      }

      setIsCameraOn(true)
      setError("")

      // Haptic feedback
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }
    }
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"))

    // Haptic feedback
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  // Simplified mock detection function
  const mockDetection = () => {
    // Simulate detection with a random sign
    const randomIndex = Math.floor(Math.random() * validSigns.length)
    const randomSign = validSigns[randomIndex]

    return { label: randomSign, confidence: 0.95 }
  }

  const startInfer = () => {
    try {
      setInferRunning(true)

      // Haptic feedback
      if (Platform.OS === "ios") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }

      // Start simulating detections at regular intervals
      detectionInterval.current = setInterval(() => {
        try {
          // Get a mock detection result
          const result = mockDetection()

          if (result && result.label) {
            setCurrentLabel(result.label)
            setDetectedWords((prevWords) => {
              const newWords = [...prevWords, result.label]
              debouncedFetchTranslation(newWords)
              return newWords
            })

            // Haptic feedback for detection
            if (Platform.OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            }
          }
        } catch (err) {
          console.error("Detection error:", err)
        }
      }, 2000) // Detect every 2 seconds
    } catch (error) {
      console.error("Error starting inference:", error)
      setError("Failed to start inference. Please try again.")
      setInferRunning(false)
    }
  }

  const stopInfer = () => {
    setInferRunning(false)

    // Haptic feedback
    if (Platform.OS === "ios") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    }

    if (detectionInterval.current) {
      clearInterval(detectionInterval.current)
      detectionInterval.current = null
    }
  }

  const fetchTranslation = async (words) => {
    if (words.length === 0) return

    // If we have 2-3 words that form a sentence, use them directly
    if (words.length >= 2 && words.length <= 3) {
      const sentence = words.join(" ")
      setTranslation(sentence)
      setDetectedWords([])
      return
    }

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Convert these sign language gestures into a meaningful sentence, focusing only on the content without mentioning sign language or gestures: ${words.join(", ")}`,
                },
              ],
            },
          ],
        }),
      })

      const data = await response.json()
      const sentence = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
      setTranslation(sentence)
      setDetectedWords([])

      // Haptic feedback for successful translation
      if (Platform.OS === "ios") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }

      // Scroll to translation
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    } catch (error) {
      console.error("Error fetching translation:", error)
      setError("Failed to translate. Please try again.")
    }
  }

  const debouncedFetchTranslation = useCallback(
    debounce((words) => fetchTranslation(words), 2000),
    [],
  )

  const clearTranslation = () => {
    setTranslation("")
    setDetectedWords([])

    // Haptic feedback
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  // Custom Alert component
  const CustomAlert = ({ title, message, variant = "default" }) => {
    const backgroundColor = variant === "destructive" ? "#FF5722" : "#0F62FE"

    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(300)}
        style={[styles.alert, { backgroundColor }]}
      >
        <View style={styles.alertIcon}>
          <AlertCircle width={16} height={16} color="#ffffff" />
        </View>
        <View>
          <Text style={[styles.alertTitle, { fontFamily: "Manrope-Bold" }]}>{title}</Text>
          <Text style={[styles.alertDescription, { fontFamily: "Manrope-Regular" }]}>{message}</Text>
        </View>
      </Animated.View>
    )
  }

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0F62FE" />
      </View>
    )
  }

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#0D1117" : "#F8FAFC", justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#0F62FE" />
        <Text style={{ color: isDark ? "#E6EDF3" : "#1C1C1C", marginTop: 16, fontFamily: "Manrope-Medium" }}>
          Loading camera permissions...
        </Text>
      </View>
    )
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? "#0D1117" : "#F8FAFC",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          },
        ]}
      >
        <Camera width={64} height={64} color={isDark ? "#8B949E" : "#5E6C84"} />
        <Text
          style={{
            color: isDark ? "#E6EDF3" : "#1C1C1C",
            fontSize: 20,
            textAlign: "center",
            marginTop: 24,
            marginBottom: 12,
            fontFamily: "Manrope-Bold",
          }}
        >
          Camera Access Required
        </Text>
        <Text
          style={{
            color: isDark ? "#8B949E" : "#5E6C84",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 32,
            fontFamily: "Manrope-Regular",
            paddingHorizontal: 20,
          }}
        >
          We need camera access to detect and translate sign language gestures in real-time
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#0F62FE",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={requestPermission}
        >
          <Text style={{ color: "white", fontFamily: "Manrope-SemiBold", fontSize: 16, marginRight: 8 }}>
            Grant Permission
          </Text>
          <Zap width={20} height={20} color="white" />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }]} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }]}>
        <Text style={[styles.headerTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}>
          Sign Language Translator
        </Text>
        <TouchableOpacity style={styles.infoButton} onPress={() => setShowInstructions(!showInstructions)}>
          <Info width={20} height={20} color={isDark ? "#8B949E" : "#5E6C84"} />
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Camera Section */}
        <Animated.View 
          entering={FadeInDown.duration(500).delay(100)} 
          style={[styles.card, { backgroundColor: isDark ? "#161B22" : "#FFFFFF" }]}
        >
          <LinearGradient
            colors={isDark ? ["#0F62FE", "#0D47A1"] : ["#0F62FE", "#2196F3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardHeader}
          >
            <Text style={[styles.cardHeaderTitle, { fontFamily: "Manrope-Bold" }]}>Camera</Text>
          </LinearGradient>

          <View style={styles.cardContent}>
            <View
              style={[
                styles.cameraContainer,
                { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" },
              ]}
            >
              {isCameraOn ? (
                <CameraView style={styles.camera} facing={facing}>
                  <View style={styles.cameraControls}>
                    <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraFacing}>
                      <RefreshCw width={20} height={20} color="white" />
                    </TouchableOpacity>

                    {inferRunning && (
                      <View style={styles.recordingIndicator}>
                        <View style={styles.recordingDot} />
                        <Text style={[styles.recordingText, { fontFamily: "Manrope-Medium" }]}>Detecting</Text>
                      </View>
                    )}
                  </View>
                </CameraView>
              ) : (
                <View style={styles.cameraPlaceholder}>
                  <CameraOff width={64} height={64} color={isDark ? "#8B949E" : "#5E6C84"} />
                  <Text
                    style={[
                      styles.cameraPlaceholderText,
                      { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" },
                    ]}
                  >
                    Camera is turned off
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.cameraToggleContainer}>
              <Text
                style={[
                  styles.cameraToggleLabel,
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" },
                ]}
              >
                Camera {isCameraOn ? "On" : "Off"}
              </Text>
              <TouchableOpacity
                style={[
                  styles.cameraToggleButton,
                  isCameraOn ? { backgroundColor: "#0F62FE" } : { backgroundColor: isDark ? "#161B22" : "#E2E8F0" },
                ]}
                onPress={toggleCamera}
              >
                <View style={[styles.cameraToggleThumb, isCameraOn ? { transform: [{ translateX: 22 }] } : {}]} />
              </TouchableOpacity>
            </View>

            {error ? <CustomAlert title="Error" message={error} variant="destructive" /> : null}
          </View>
        </Animated.View>

        {/* Instructions Section */}
        {showInstructions && (
          <Animated.View 
            entering={FadeInDown.duration(500).delay(200)} 
            style={[styles.card, { backgroundColor: isDark ? "#161B22" : "#FFFFFF" }]}
          >
            <LinearGradient
              colors={isDark ? ["#FF9800", "#FF5722"] : ["#FF5722", "#FF9800"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cardHeader}
            >
              <Text style={[styles.cardHeaderTitle, { fontFamily: "Manrope-Bold" }]}>How to Use</Text>
            </LinearGradient>

            <View style={styles.cardContent}>
              <View style={styles.instructionsList}>
                {[
                  "Position yourself in front of the camera",
                  'Click the "Start" button to begin sign language detection',
                  "Perform sign language gestures clearly",
                  "View the translated text in the box below",
                  'Click "Stop" when you\'re finished',
                ].map((instruction, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionBullet}>
                      <Text style={[styles.instructionBulletText, { fontFamily: "Manrope-Bold" }]}>{index + 1}</Text>
                    </View>
                    <Text
                      style={[
                        styles.instructionText,
                        { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Regular" },
                      ]}
                    >
                      {instruction}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Current Label Section */}
        <Animated.View 
          entering={FadeInDown.duration(500).delay(300)} 
          style={[styles.card, { backgroundColor: isDark ? "#161B22" : "#FFFFFF" }]}
        >
          <LinearGradient
            colors={isDark ? ["#8B5CF6", "#6366F1"] : ["#8B5CF6", "#A78BFA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardHeader}
          >
            <Text style={[styles.cardHeaderTitle, { fontFamily: "Manrope-Bold" }]}>Current Detection</Text>
          </LinearGradient>

          <View style={styles.cardContent}>
            <View style={styles.currentLabelContainer}>
              {currentLabel ? (
                <Animated.Text
                  key={currentLabel}
                  entering={FadeIn.duration(300)}
                  style={[styles.currentLabel, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
                >
                  {currentLabel}
                </Animated.Text>
              ) : (
                <Text
                  style={[
                    styles.noDetectionText,
                    { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" },
                  ]}
                >
                  No sign detected
                </Text>
              )}

              {currentLabel && (
                <View style={styles.confidenceBadge}>
                  <CheckCircle width={12} height={12} color="#10B981" style={{ marginRight: 4 }} />
                  <Text style={[styles.confidenceText, { fontFamily: "Manrope-Medium" }]}>High confidence</Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* Translation Section */}
        <Animated.View 
          entering={FadeInDown.duration(500).delay(400)} 
          style={[styles.card, { backgroundColor: isDark ? "#161B22" : "#FFFFFF" }]}
        >
          <LinearGradient
            colors={isDark ? ["#10B981", "#059669"] : ["#10B981", "#34D399"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardHeader}
          >
            <Text style={[styles.cardHeaderTitle, { fontFamily: "Manrope-Bold" }]}>Translation</Text>
          </LinearGradient>

          <View style={styles.cardContent}>
            <View style={styles.translationContent}>
              <View
                style={[
                  styles.textareaContainer,
                  {
                    backgroundColor: isDark ? "rgba(13, 17, 23, 0.5)" : "rgba(248, 250, 252, 0.5)",
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.translationText,
                    {
                      color: translation ? (isDark ? "#E6EDF3" : "#1C1C1C") : isDark ? "#8B949E" : "#5E6C84",
                      fontFamily: "Manrope-Regular",
                      fontStyle: translation ? "normal" : "italic",
                    },
                  ]}
                >
                  {translation || "Translation will appear here..."}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    inferRunning ? styles.stopButton : styles.startButton,
                    !isCameraOn && styles.disabledButton,
                  ]}
                  onPress={inferRunning ? stopInfer : startInfer}
                  disabled={!isCameraOn}
                >
                  <View style={styles.buttonContent}>
                    {inferRunning ? (
                      <Square width={18} height={18} color="white" style={styles.buttonIcon} />
                    ) : (
                      <Play width={18} height={18} color="white" style={styles.buttonIcon} />
                    )}
                    <Text style={[styles.buttonText, { fontFamily: "Manrope-SemiBold" }]}>
                      {inferRunning ? "Stop" : "Start"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.clearButton,
                    { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" },
                  ]}
                  onPress={clearTranslation}
                >
                  <View style={styles.buttonContent}>
                    <Trash2 width={18} height={18} color={isDark ? "#E6EDF3" : "#1C1C1C"} style={styles.buttonIcon} />
                    <Text
                      style={[
                        styles.buttonText,
                        { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" },
                      ]}
                    >
                      Clear
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.detectedWordsContainer}>
                <Text
                  style={[
                    styles.detectedWordsTitle,
                    { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-SemiBold" },
                  ]}
                >
                  Detected Signs:
                </Text>
                <View style={styles.detectedWordsList}>
                  {detectedWords.map((word, index) => (
                    <Animated.View
                      key={index}
                      entering={FadeInUp.duration(300)}
                      style={[
                        styles.detectedWordBadge,
                        { backgroundColor: isDark ? "rgba(15, 98, 254, 0.2)" : "rgba(15, 98, 254, 0.1)" },
                      ]}
                    >
                      <Text style={[styles.detectedWordText, { color: "#0F62FE", fontFamily: "Manrope-Medium" }]}>
                        {word}
                      </Text>
                    </Animated.View>
                  ))}
                  {detectedWords.length === 0 && (
                    <Text
                      style={[
                        styles.noDetectionsText,
                        { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" },
                      ]}
                    >
                      No signs detected yet
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Bottom padding for scrolling past bottom navbar */}
        <View style={{ height: 100 }} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
  },
  infoButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
  },
  cardHeaderTitle: {
    fontSize: 18,
    color: "white",
  },
  cardContent: {
    padding: 16,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000000",
    borderWidth: 1,
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  cameraPlaceholderText: {
    marginTop: 16,
    fontSize: 16,
  },
  cameraControls: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 16,
    justifyContent: "space-between",
  },
  flipCameraButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 87, 34, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginRight: 6,
  },
  recordingText: {
    color: "white",
    fontSize: 12,
  },
  cameraToggleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 12,
  },
  cameraToggleLabel: {
    marginRight: 12,
    fontSize: 14,
  },
  cameraToggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  cameraToggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  instructionBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  instructionBulletText: {
    color: "white",
    fontSize: 12,
  },
  instructionText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  currentLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  currentLabel: {
    fontSize: 32,
    textAlign: "center",
  },
  noDetectionText: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  confidenceBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 8,
  },
  confidenceText: {
    fontSize: 12,
    color: "#10B981",
  },
  translationContent: {
    gap: 16,
  },
  textareaContainer: {
    minHeight: 120,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
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
    color: "white",
    fontSize: 16,
  },
  startButton: {
    backgroundColor: "#0F62FE",
  },
  stopButton: {
    backgroundColor: "#FF5722",
  },
  clearButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  detectedWordsContainer: {
    marginTop: 8,
  },
  detectedWordsTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  detectedWordsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detectedWordBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detectedWordText: {
    fontSize: 14,
  },
  noDetectionsText: {
    fontStyle: "italic",
  },
  alert: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  alertIcon: {
    marginRight: 12,
  },
  alertTitle: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 4,
  },
  alertDescription: {
    color: "#ffffff",
    fontSize: 14,
  },
})