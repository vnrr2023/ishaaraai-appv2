import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { VideoView } from "expo-video"
import { LinearGradient } from "expo-linear-gradient"
import { Download, ZoomIn, ZoomOut, Copy, X, Play, Camera, Image as ImageIcon } from "react-native-feather"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  FadeInDown,
} from "react-native-reanimated"
import { useTheme } from "../components/theme-provider"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import * as Clipboard from "expo-clipboard"
import * as Sharing from "expo-sharing"
import { useFonts } from "expo-font"
import Navbar from "../components/navbar"
import LayoutWithNavbar from "../components/LayoutWithNavbar"

const { width } = Dimensions.get("window")

const images = [
  { src: "https://i.ibb.co/FzMMxdW/IMG-20240428-WA0006.jpg", category: "Achievements" },
  { src: "https://i.ibb.co/K5Cq0GN/IMG-20240428-WA0007.jpg", category: "Mentor" },
  { src: "https://i.ibb.co/Jzj16Cw/IMG-20240428-WA0008.jpg", category: "Achievements" },
  { src: "https://i.ibb.co/THbKfdZ/IMG-20240428-WA0009.jpg", category: "School Survey" },
  { src: "https://i.ibb.co/P16PHjw/IMG-20240428-WA0010.jpg", category: "School Survey" },
  { src: "https://i.ibb.co/bBKHHfr/IMG-20240428-WA0011.jpg", category: "Team" },
  { src: "https://i.ibb.co/SNTthc4/IMG-20240428-WA0012.jpg", category: "School Survey" },
  { src: "https://i.ibb.co/7YnHVGN/IMG-20240428-WA0013.jpg", category: "School Survey" },
  { src: "https://i.ibb.co/Ny5HZVK/IMG-20240428-WA0016.jpg", category: "School Survey" },
]

// const videos = [
//   { src: require("./../../../assets/videos/video1.webm"), category: "School Survey" },
//   { src: require("./../../../assets/videos/video2.webm"), category: "School Survey" },
//   { src: require("./../../../assets/videos/video3.webm"), category: "School Survey" },
//   { src: require("./../../../assets/videos/video4.webm"), category: "School Survey" },
// ]

const categories = ["School Survey", "Mentor", "Achievements", "Team"]

const ImageModal = ({ visible, src, onClose }) => {
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const [scale, setScale] = useState(1)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5))

  const handleDownload = async () => {
    if (status === null) {
      await requestPermission()
    }

    if (status && status.granted) {
      const fileUri = `${FileSystem.cacheDirectory}image.jpg`

      try {
        const { uri } = await FileSystem.downloadAsync(src, fileUri)
        await MediaLibrary.saveToLibraryAsync(uri)
        alert("Image saved to gallery")
      } catch (error) {
        console.error("Error saving image:", error)
        alert("Failed to save image")
      }
    } else {
      alert("Permission to access media library is required")
    }
  }

  const handleCopy = async () => {
    await Clipboard.setStringAsync(src)
    alert("Image URL copied to clipboard")
  }

  const handleShare = async () => {
    try {
      const fileUri = `${FileSystem.cacheDirectory}image.jpg`
      await FileSystem.downloadAsync(src, fileUri)
      await Sharing.shareAsync(fileUri)
    } catch (error) {
      console.error("Error sharing image:", error)
      alert("Failed to share image")
    }
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: isDark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.8)" }]}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X stroke={isDark ? "#ffffff" : "#ffffff"} width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image source={{ uri: src }} style={[styles.modalImage, { transform: [{ scale }] }]} resizeMode="contain" />
          </View>

          <View style={styles.modalControls}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              ]}
              onPress={handleZoomIn}
            >
              <ZoomIn stroke={isDark ? "#ffffff" : "#ffffff"} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              ]}
              onPress={handleZoomOut}
            >
              <ZoomOut stroke={isDark ? "#ffffff" : "#ffffff"} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              ]}
              onPress={handleDownload}
            >
              <Download stroke={isDark ? "#ffffff" : "#ffffff"} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                { backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)" },
              ]}
              onPress={handleCopy}
            >
              <Copy stroke={isDark ? "#ffffff" : "#ffffff"} width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// Separate component for video player to avoid hook issues
const VideoPlayer = ({ source }) => {
  const videoRef = useRef(null)
  return (
    <View style={styles.videoPlayerContainer}>
      <VideoView
        style={styles.videoPlayer}
        videoProps={{
          source: source,
          shouldPlay: false,
          resizeMode: "cover",
          isLooping: true,
        }}
      />
    </View>
  )
}

const VideoModal = ({ visible, src, onClose }) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: isDark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.8)" }]}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X stroke={isDark ? "#ffffff" : "#ffffff"} width={24} height={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.videoContainer}>
            {src && (
              <VideoView
                style={styles.modalVideo}
                videoProps={{
                  source: src,
                  shouldPlay: true,
                  resizeMode: "contain",
                  isLooping: true,
                  useNativeControls: true,
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default function GalleryScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Load Manrope font
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./../../../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./../../../assets/fonts/Manrope-Bold.ttf"),
  })

  const slideAnimation = useSharedValue(0)
  const slideX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideX.value }],
      opacity: slideAnimation.value,
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      // Animate out
      slideAnimation.value = withTiming(0, { duration: 200 })
      slideX.value = withSequence(withTiming(0), withDelay(200, withTiming(-width, { duration: 0 })))

      // Change slide
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % categories.length)

        // Animate in
        slideX.value = width
        slideAnimation.value = 0

        setTimeout(() => {
          slideX.value = withTiming(0, { duration: 500 })
          slideAnimation.value = withTiming(1, { duration: 500 })
        }, 50)
      }, 250)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Initial animation
    slideX.value = width
    setTimeout(() => {
      slideX.value = withTiming(0, { duration: 500 })
      slideAnimation.value = withTiming(1, { duration: 500 })
    }, 100)
  }, [])

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory)

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
                style={[styles.header, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
              >
                Ishaara Gallery
              </Animated.Text>
              <Text 
                style={[
                  styles.headerSubtitle, 
                  { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Regular" }
                ]}
              >
                Explore our journey through images
              </Text>
            </LinearGradient>
          </View>

          {/* Carousel Section */}
          <Animated.View entering={FadeInDown.duration(500).delay(200)} style={styles.carouselContainer}>
            <Animated.View style={[styles.carouselSlide, animatedStyle]}>
              {images.find((img) => img.category === categories[currentSlide]) && (
                <Image
                  source={{ uri: images.find((img) => img.category === categories[currentSlide])?.src }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              )}
              <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.carouselOverlay}>
                <Text style={[styles.carouselTitle, { fontFamily: "Manrope-Bold" }]}>{categories[currentSlide]}</Text>
              </LinearGradient>
            </Animated.View>
          </Animated.View>

          {/* Category Filter */}
          <Animated.View entering={FadeInDown.duration(500).delay(300)} style={styles.categoryFilterContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.categoryFilterScroll}
            >
              <TouchableOpacity
                style={[
                  styles.categoryFilterButton,
                  activeCategory === "All" && styles.categoryFilterButtonActive,
                  { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }
                ]}
                onPress={() => setActiveCategory("All")}
              >
                <Text 
                  style={[
                    styles.categoryFilterText,
                    activeCategory === "All" ? styles.categoryFilterTextActive : {},
                    { fontFamily: "Manrope-Medium" }
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryFilterButton,
                    activeCategory === category && styles.categoryFilterButtonActive,
                    { borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)" }
                  ]}
                  onPress={() => setActiveCategory(category)}
                >
                  <Text 
                    style={[
                      styles.categoryFilterText,
                      activeCategory === category ? styles.categoryFilterTextActive : {},
                      { fontFamily: "Manrope-Medium" }
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>

          {/* Gallery Grid */}
          <Animated.View entering={FadeInDown.duration(500).delay(400)} style={styles.galleryGrid}>
            {filteredImages.map((img, index) => (
              <TouchableOpacity
                key={`img-${index}`}
                style={[
                  styles.mediaItem,
                  {
                    borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                    backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                  },
                ]}
                onPress={() => setSelectedImage(img.src)}
              >
                <Image source={{ uri: img.src }} style={styles.thumbnail} resizeMode="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.thumbnailOverlay}
                >
                  <View style={styles.thumbnailInfo}>
                    <ImageIcon width={16} height={16} stroke="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={[styles.thumbnailCategory, { fontFamily: "Manrope-Medium" }]}>
                      {img.category}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Image Modal */}
          <ImageModal
            visible={!!selectedImage}
            src={selectedImage || "/placeholder.svg"}
            onClose={() => setSelectedImage(null)}
          />

          {/* Video Modal */}
          <VideoModal visible={!!selectedVideo} src={selectedVideo} onClose={() => setSelectedVideo(null)} />

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
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  carouselContainer: {
    height: 300,
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  carouselSlide: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: 20,
  },
  carouselTitle: {
    color: "#ffffff",
    fontSize: 28,
  },
  categoryFilterContainer: {
    marginBottom: 24,
  },
  categoryFilterScroll: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    gap: 8,
  },
  categoryFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  categoryFilterButtonActive: {
    backgroundColor: "#0F62FE",
    borderColor: "#0F62FE",
  },
  categoryFilterText: {
    color: "#8B949E",
    fontSize: 14,
  },
  categoryFilterTextActive: {
    color: "#FFFFFF",
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  mediaItem: {
    width: (width - 44) / 2,
    height: 180,
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  thumbnailOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  thumbnailInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnailCategory: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  videoPlayerContainer: {
    width: "100%",
    height: "100%",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
  videoIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "transparent",
    borderRadius: 16,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
  },
  closeButton: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalVideo: {
    width: "100%",
    height: "100%",
  },
  modalControls: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
})