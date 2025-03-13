<template>
  <div class="q-pa-sm">
    <!-- <div class="row justify-center q-my-md">
      <span class="text-h5">Milk, Meat, Egg Production in Nepal</span>
    </div> -->
    <div class="row q-col-gutter-sm">
      <!-- Milk Production Chart -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Milk Production in Nepal (Cow & Buffalo)
            </div>
            <div
              id="milk_chart"
              ref="milkChartRef"
              class="chart-container"
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Egg Production Chart -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">Egg Production in Nepal</div>
            <div id="egg_chart" ref="eggChartRef" class="chart-container"></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Meat Production Chart -->
      <div class="col-12">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Meat Production Over the Years
            </div>
            <div
              id="meat_chart_div"
              ref="meatChartRef"
              class="chart-container"
              style="height: 420px"
            ></div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm q-my-sm">
      <!-- First GIF Card -->
      <div class="col-12">
        <q-card flat bordered class="gif-card">
          <q-card-section>
            <div class="gif-container relative-position">
              <q-img
                :src="isPlaying1 ? 'src/assets/charts/gif2.gif' : pausedImage1"
                spinner-color="primary"
                spinner-size="82px"
                fit="contain"
                class="full-height"
              >
                <template v-slot:loading>
                  <q-spinner-dots color="primary" />
                </template>
              </q-img>
              <q-btn
                :icon="isPlaying1 ? 'pause' : 'play_arrow'"
                round
                color="primary"
                class="absolute-bottom-right q-ma-sm"
                @click="togglePlay(1)"
              >
                <q-tooltip
                  >{{ isPlaying1 ? "Pause" : "Play" }} Animation</q-tooltip
                >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Second GIF Card -->
      <div class="col-12">
        <q-card flat bordered class="gif-card">
          <q-card-section>
            <div class="gif-container relative-position">
              <q-img
                :src="isPlaying2 ? 'src/assets/charts/gif1.gif' : pausedImage2"
                spinner-color="primary"
                spinner-size="82px"
                fit="contain"
                class="full-height"
              >
                <template v-slot:loading>
                  <q-spinner-dots color="primary" />
                </template>
              </q-img>
              <q-btn
                :icon="isPlaying2 ? 'pause' : 'play_arrow'"
                round
                color="primary"
                class="absolute-bottom-right q-ma-sm"
                @click="togglePlay(2)"
              >
                <q-tooltip
                  >{{ isPlaying2 ? "Pause" : "Play" }} Animation</q-tooltip
                >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Loading Overlay -->
    <q-inner-loading :showing="loading" class="bg-opacity">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const loading = ref(true);

// Chart references
const milkChartRef = ref<HTMLElement | null>(null);
const eggChartRef = ref<HTMLElement | null>(null);
const meatChartRef = ref<HTMLElement | null>(null);

const isPlaying1 = ref(true);
const isPlaying2 = ref(true);
const pausedImage1 = ref("");
const pausedImage2 = ref("");
let frameSequence1: string[] = [];
let frameSequence2: string[] = [];
let currentFrame1 = 0;
let currentFrame2 = 0;

// Chart data
const chartData = {
  milk: [
    ["Year", "Cow Milk", "Buffalo Milk"],
    ["2013", 532300, 1167773],
    ["2014", 587719, 1168006],
    ["2015", 643806, 1210441],
    ["2016", 665285, 1245954],
    ["2017", 754126, 1338277],
    ["2018", 795530, 1372905],
    ["2019", 920400, 1380600],
    ["2020", 1060487, 1419412],
    ["2021", 1101812, 1464802],
    ["2022", 1214046, 1399797],
  ],
  egg: [
    ["Year", "Hen Egg", "Duck Egg"],
    ["2013", 859515, 13403],
    ["2014", 865947, 13554],
    ["2015", 1294166, 13984],
    ["2016", 1338312, 14241],
    ["2017", 1498024, 15009],
    ["2018", 1534680, 15474],
    ["2019", 1604526, 15009],
    ["2020", 1475620, 17930],
    ["2021", 1306380, 24223],
    ["2022", 1547103, 60229],
  ],
  meat: [
    ["Year", "Buff", "Mutton", "Chevon", "Pork", "Chicken", "Duck"],
    ["2013/14", 173906, 2656, 59053, 19269, 43133, 227],
    ["2014/15", 174012, 2658, 60906, 20135, 45458, 232],
    ["2015/16", 175005, 2684, 65583, 23059, 50411, 237],
    ["2016/17", 180080, 2714, 67706, 24535, 57268, 241],
    ["2017/18", 185180, 2754, 70802, 25481, 60122, 280],
    ["2018/19", 188574, 2763, 73914, 28579, 62899, 352],
    ["2019/20", 189517, 2765, 75023, 29493, 255001, 387],
    ["2020/21", 188172, 2964, 70755, 31450, 226959, 442],
    ["2021/22", 194090, 2880, 74241, 36059, 204923, 596],
    ["2022/23", 116503, 1874, 77162, 32533, 200658, 1353],
  ],
};

// Base chart styles
const getBaseChartStyles = () => ({
  backgroundColor: $q.dark.isActive ? "#1d1d1d" : "#ffffff",
  titleTextStyle: {
    color: $q.dark.isActive ? "#fff" : "#333",
    fontSize: 16,
    bold: true,
  },
  legend: {
    position: "top",
    alignment: "center",
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  hAxis: {
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
    titleTextStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  vAxis: {
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
    titleTextStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
});

function drawCharts() {
  loading.value = true;
  try {
    // Milk Production Chart
    const milkData = google.visualization.arrayToDataTable(chartData.milk);
    const milkChart = new google.visualization.AreaChart(milkChartRef.value);
    milkChart.draw(milkData, {
      ...getBaseChartStyles(),
      hAxis: { title: "Year" },
      vAxis: { title: "Production (Metric Tons)" },
      isStacked: true,
      colors: ["#1976D2", "#FF8F00"],
    });

    // Egg Production Chart
    const eggData = google.visualization.arrayToDataTable(chartData.egg);
    const eggChart = new google.visualization.AreaChart(eggChartRef.value);
    eggChart.draw(eggData, {
      ...getBaseChartStyles(),
      hAxis: { title: "Year" },
      vAxis: { title: "Production (000 Number)" },
      isStacked: true,
      colors: ["#FF9800", "#4CAF50"],
    });

    // Meat Production Chart
    const meatData = google.visualization.arrayToDataTable(chartData.meat);
    const meatChart = new google.visualization.BarChart(meatChartRef.value);
    meatChart.draw(meatData, {
      ...getBaseChartStyles(),
      isStacked: "percent",
      hAxis: { minValue: 0 },
      vAxis: { title: "Year" },
      colors: [
        "#E53935",
        "#8E24AA",
        "#43A047",
        "#FB8C00",
        "#1E88E5",
        "#00ACC1",
      ],
    });
  } catch (error) {
    console.error("Error drawing charts:", error);
    $q.notify({
      type: "negative",
      message: "Failed to render charts",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
}

// Simple throttle function
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const handleResize = throttle(() => {
  drawCharts();
}, 250);

const extractFrames = async (gifUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const frames: string[] = [];
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let frameCount = 0;
    let lastTimestamp = 0;

    function captureFrame(timestamp: number) {
      if (timestamp - lastTimestamp > 50) {
        // Capture every 50ms
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          frames.push(canvas.toDataURL());
          frameCount++;
          lastTimestamp = timestamp;
        }
      }

      if (frameCount < 20) {
        // Capture up to 20 frames
        requestAnimationFrame(captureFrame);
      } else {
        resolve(frames);
      }
    }

    img.onload = () => requestAnimationFrame(captureFrame);
    img.src = gifUrl;
  });
};

const initializeGif = async (gifNum: number) => {
  const gifUrl =
    gifNum === 1 ? "src/assets/charts/gif2.gif" : "src/assets/charts/gif1.gif";
  const frames = await extractFrames(gifUrl);

  if (gifNum === 1) {
    frameSequence1 = frames;
    pausedImage1.value = frames[frames.length]; // Set last frame
  } else {
    frameSequence2 = frames;
    pausedImage2.value = frames[frames.length]; // Set last frame
  }
};

const togglePlay = async (gifNum: number) => {
  if (gifNum === 1) {
    isPlaying1.value = !isPlaying1.value;
    if (!isPlaying1.value) {
      // When pausing, use the current frame
      const frames = frameSequence1;
      if (frames.length > 0) {
        pausedImage1.value = frames[frames.length - 1];
      }
    }
  } else {
    isPlaying2.value = !isPlaying2.value;
    if (!isPlaying2.value) {
      const frames = frameSequence2;
      if (frames.length > 0) {
        pausedImage2.value = frames[frames.length - 1];
      }
    }
  }
};

onMounted(async () => {
  try {
    await window.google.charts.load("current", { packages: ["corechart"] });
    drawCharts();
    window.addEventListener("resize", handleResize);
    initializeGif(1);
    initializeGif(2);
  } catch (error) {
    console.error("Error initializing charts:", error);
    $q.notify({
      type: "negative",
      message: "Failed to initialize charts",
      position: "top",
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.chart-container {
  height: 390px;
  width: 100%;
}

.chart-card {
  height: 100%;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .chart-container {
    height: 300px;
  }
}

.bg-opacity {
  background: rgba(0, 0, 0, 0.3);
}

.gif-card {
  background: #ffffff;
  transition: all 0.3s ease;
}

.gif-container {
  height: 600px;
  width: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Center the GIF and maintain aspect ratio */
.gif-container .q-img {
  max-width: 90%;
  margin: 0 auto;
  display: block;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .gif-container {
    height: 500px;
  }
}

@media (max-width: 600px) {
  .gif-container {
    height: 400px;
  }
}

.gif-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
