import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useRoute } from "@react-navigation/native"
import { useTheme } from "../components/theme-provider"
import Animated, { FadeInDown } from "react-native-reanimated"
import { LineChart } from "react-native-chart-kit"
import { Card, CardContent } from "../components/ui/card"
import { useFonts } from "expo-font"
import Navbar from "../components/navbar"

const { width } = Dimensions.get("window")

type ModelId = "alphanet" | "lexnet" | "ishaaranet" | "gru" | "convlstm" | "conv3d"

const modelData = {
  alphanet: {
    name: "Alphanet",
    accuracy: "95%",
    precision: "93%",
    recall: "94%",
  },
  lexnet: {
    name: "Lexnet",
    precision: "99.8%",
    recall: "98.7%",
    mAp50: "99%",
    "mAp50-95": "88.9%",
  },
  ishaaranet: {
    name: "Ishaara Net",
    accuracy: "94%",
    precision: "92%",
    recall: "93%",
  },
  gru: {
    name: "GRU Based Model",
    accuracy: "99%",
    precision: "98%",
    recall: "97%",
  },
  convlstm: {
    name: "ConvLSTM Model",
    accuracy: "97%",
    precision: "96%",
    recall: "95%",
  },
  conv3d: {
    name: "Conv3D Model",
    accuracy: "98%",
    precision: "97%",
    recall: "96%",
  },
}

const lexnetGraphData = {
  epoch: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
  "train/box_loss": [
    0.90382, 0.73694, 0.62087, 0.58559, 0.56051, 0.55557, 0.53759, 0.53175, 0.52425, 0.52134, 0.51506, 0.5128, 0.49946,
    0.49524, 0.49471,
  ],
  "train/cls_loss": [
    1.10381, 0.42955, 0.32817, 0.30045, 0.28719, 0.27985, 0.27258, 0.26577, 0.26123, 0.25919, 0.25318, 0.25358, 0.24407,
    0.24287, 0.23825,
  ],
  "metrics/mAP50(B)": [
    0.98483, 0.98565, 0.98667, 0.98912, 0.98979, 0.99005, 0.98994, 0.99026, 0.9903, 0.99059, 0.99075, 0.9908, 0.99077,
    0.99074, 0.99092,
  ],
  "metrics/mAP50-95(B)": [
    0.77313, 0.82878, 0.85607, 0.86824, 0.87465, 0.87472, 0.87502, 0.87731, 0.87657, 0.87749, 0.8817, 0.88108, 0.88069,
    0.88174, 0.88115,
  ],
  "val/box_loss": [
    0.89316, 0.72883, 0.65937, 0.62769, 0.61806, 0.61434, 0.61221, 0.61043, 0.60776, 0.60717, 0.60526, 0.60358, 0.60007,
    0.59859, 0.59711,
  ],
  "val/cls_loss": [
    0.35681, 0.31011, 0.25303, 0.22632, 0.22088, 0.21754, 0.21576, 0.21431, 0.21294, 0.21134, 0.21086, 0.21008, 0.20806,
    0.20663, 0.20433,
  ],
}

export default function ModelDetailScreen() {
  const route = useRoute()
  const { modelId } = route.params as { modelId: ModelId }
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

  const modelInfo = modelData[modelId] || {
    name: "Unknown Model",
    precision: "N/A",
    recall: "N/A",
    mAp50: "N/A",
    "mAp50-95": "N/A",
  }

  const chartConfig = {
    backgroundGradientFrom: isDark ? "#161B22" : "#FFFFFF",
    backgroundGradientTo: isDark ? "#161B22" : "#FFFFFF",
    decimalPlaces: 2,
    color: (opacity = 1) => (isDark ? `rgba(230, 237, 243, ${opacity})` : `rgba(28, 28, 28, ${opacity})`),
    labelColor: (opacity = 1) => (isDark ? `rgba(230, 237, 243, ${opacity})` : `rgba(28, 28, 28, ${opacity})`),
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#0F62FE",
    },
  }

  const boxLossData = {
    labels: ["1", "15", "30", "45", "60", "72"],
    datasets: [
      {
        data: lexnetGraphData["train/box_loss"],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: lexnetGraphData["val/box_loss"],
        color: (opacity = 1) => `rgba(53, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Train Box Loss", "Val Box Loss"],
  }

  const clsLossData = {
    labels: ["1", "15", "30", "45", "60", "72"],
    datasets: [
      {
        data: lexnetGraphData["train/cls_loss"],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: lexnetGraphData["val/cls_loss"],
        color: (opacity = 1) => `rgba(53, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Train Cls Loss", "Val Cls Loss"],
  }

  const mAPData = {
    labels: ["1", "15", "30", "45", "60", "72"],
    datasets: [
      {
        data: lexnetGraphData["metrics/mAP50(B)"],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: lexnetGraphData["metrics/mAP50-95(B)"],
        color: (opacity = 1) => `rgba(53, 162, 235, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["mAP50", "mAP50-95"],
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0D1117" : "#F8FAFC" }]} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.Text
          entering={FadeInDown.duration(500).delay(100)}
          style={[styles.header, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
        >
          {modelInfo.name}
        </Animated.Text>

        <View style={styles.metricsGrid}>
          {Object.entries(modelInfo).map(
            ([key, value]) =>
              key !== "name" && (
                <Animated.View key={key} entering={FadeInDown.duration(500)} style={styles.metricCardContainer}>
                  <Card
                    style={[
                      styles.metricCard,
                      {
                        backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                        borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                      },
                    ]}
                  >
                    <View style={styles.metricCardHeader}>
                      <Text
                        style={[
                          styles.metricTitle,
                          { color: isDark ? "#8B949E" : "#5E6C84", fontFamily: "Manrope-Medium" },
                        ]}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Text>
                    </View>
                    <CardContent>
                      <Text
                        style={[
                          styles.metricValue,
                          { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" },
                        ]}
                      >
                        {value}
                      </Text>
                    </CardContent>
                  </Card>
                </Animated.View>
              ),
          )}
        </View>

        <View style={styles.chartsContainer}>
          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.chartCardContainer}>
            <Card
              style={[
                styles.chartCard,
                {
                  backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                  borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                },
              ]}
            >
              <View style={styles.chartCardHeader}>
                <Text
                  style={[styles.chartTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
                >
                  Box Loss
                </Text>
              </View>
              <CardContent>
                <LineChart
                  data={boxLossData}
                  width={width - 64}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </CardContent>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.chartCardContainer}>
            <Card
              style={[
                styles.chartCard,
                {
                  backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                  borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                },
              ]}
            >
              <View style={styles.chartCardHeader}>
                <Text
                  style={[styles.chartTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
                >
                  Classification Loss
                </Text>
              </View>
              <CardContent>
                <LineChart
                  data={clsLossData}
                  width={width - 64}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </CardContent>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.chartCardContainer}>
            <Card
              style={[
                styles.chartCard,
                {
                  backgroundColor: isDark ? "#161B22" : "#FFFFFF",
                  borderColor: isDark ? "rgba(230, 237, 243, 0.1)" : "rgba(28, 28, 28, 0.1)",
                },
              ]}
            >
              <View style={styles.chartCardHeader}>
                <Text
                  style={[styles.chartTitle, { color: isDark ? "#E6EDF3" : "#1C1C1C", fontFamily: "Manrope-Bold" }]}
                >
                  mAP Metrics
                </Text>
              </View>
              <CardContent>
                <LineChart
                  data={mAPData}
                  width={width - 64}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
                />
              </CardContent>
            </Card>
          </Animated.View>
        </View>

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
  scrollContent: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    marginBottom: 24,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metricCardContainer: {
    width: (width - 40) / 2,
    marginBottom: 16,
  },
  metricCard: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  metricCardHeader: {
    padding: 16,
    paddingBottom: 0,
  },
  metricTitle: {
    fontSize: 14,
  },
  metricValue: {
    fontSize: 24,
  },
  chartsContainer: {
    gap: 16,
  },
  chartCardContainer: {
    marginBottom: 16,
  },
  chartCard: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  chartCardHeader: {
    padding: 16,
    paddingBottom: 0,
  },
  chartTitle: {
    fontSize: 18,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
})
