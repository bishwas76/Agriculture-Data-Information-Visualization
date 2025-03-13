<template>
  <div class="">
    <div class="row q-col-gutter-sm">
      <!-- Total Land Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">Total Land Use per Province</div>
            <div
              id="totalLandChart"
              ref="totalLandChartRef"
              class="chart-container"
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Agricultural Land Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Agricultural Land Use per Province
            </div>
            <div
              id="agriculturalChart"
              ref="agriculturalChartRef"
              class="chart-container"
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Percentage Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">Agricultural Land Percentage</div>
            <div
              id="percentageChart"
              ref="percentageChartRef"
              class="chart-container"
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Land Use Distribution Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Land Use Distribution in Nepal
            </div>
            <div
              id="landUseChart"
              ref="landUseChartRef"
              class="chart-container"
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Land Use Distribution by Province Chart -->
      <div class="col-12">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Land Use Distribution by Province
            </div>
            <div
              id="land_use_chart"
              ref="landUseByProvinceRef"
              class="chart-container"
              style="height: 450px"
            ></div>
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
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const loading = ref(true);

// Chart references
const totalLandChartRef = ref<HTMLElement | null>(null);
const agriculturalChartRef = ref<HTMLElement | null>(null);
const percentageChartRef = ref<HTMLElement | null>(null);
const landUseChartRef = ref<HTMLElement | null>(null);
const landUseByProvinceRef = ref<HTMLElement | null>(null);

// Base chart styles
const getBaseChartStyles = () => ({
  backgroundColor: $q.dark.isActive ? "#1d1d1d" : "#ffffff",
  titleTextStyle: {
    color: $q.dark.isActive ? "#fff" : "#333",
    fontSize: 16,
    bold: true,
  },
  hAxis: {
    titleTextStyle: {
      color: $q.dark.isActive ? "#e0e0e0" : "#666",
      italic: false,
    },
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  vAxis: {
    titleTextStyle: {
      color: $q.dark.isActive ? "#e0e0e0" : "#666",
      italic: false,
    },
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
    gridlines: { color: $q.dark.isActive ? "#424242" : "#f5f5f5" },
  },
  animation: {
    duration: 1000,
    easing: "out",
    startup: true,
  },
});

// Chart configurations
const getChartConfigs = () => ({
  totalLand: {
    ...getBaseChartStyles(),
    title: "Total Land Use per Province",
    hAxis: { title: "Province" },
    vAxis: { title: "Land (Square KM)" },
    bars: "vertical",
    legend: "none",
  },
  agricultural: {
    ...getBaseChartStyles(),
    title: "Agricultural Land Use per Province (Ranked)",
    hAxis: { title: "Province" },
    vAxis: { title: "Land (Square KM)" },
    bars: "vertical",
    legend: "none",
  },
  percentage: {
    ...getBaseChartStyles(),
    title: "Agricultural Land as Percentage of Total Land",
    hAxis: { title: "Percentage (%)" },
    vAxis: { title: "Province" },
    bars: "horizontal",
    legend: "none",
    bar: { groupWidth: "50%" },
  },
  landUse: {
    ...getBaseChartStyles(),
    title: "Land Use Distribution in Nepal",
    pieHole: 0.4,
    legend: {
      position: "right",
      textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
    },
    tooltip: { trigger: "focus" },
    chartArea: { width: "70%", height: "80%" },
  },
});

// Chart data
const chartData = {
  totalLand: [
    ["Province", "Total Land", { role: "style" }],
    ["Koshi", 26290.05, "#ff7f0e"],
    ["Madhesh", 14149.27, "#e377c2"],
    ["Bagmati", 19113.86, "#9467bd"],
    ["Gandaki", 21491.99, "#2ca02c"],
    ["Lumbini", 22893.04, "#d62728"],
    ["Karnali", 31562.47, "#1f77b4"],
    ["Sudurpashchim", 17419.63, "#8c564b"],
  ],
  agricultural: [
    ["Province", "Agricultural Land", { role: "style" }],
    ["Koshi", 10085.79, "#ff7f0e"],
    ["Lumbini", 6796.13, "#d62728"],
    ["Bagmati", 6094.2, "#9467bd"],
    ["Madhesh", 5643.78, "#e377c2"],
    ["Gandaki", 4465.12, "#2ca02c"],
    ["Sudurpashchim", 4555.9, "#8c564b"],
    ["Karnali", 3634.61, "#1f77b4"],
  ],
  percentage: [
    ["Province", "Agricultural %", { role: "style" }],
    ["Madhesh", 39.9, "#e377c2"],
    ["Koshi", 38.4, "#ff7f0e"],
    ["Bagmati", 31.9, "#9467bd"],
    ["Lumbini", 29.7, "#d62728"],
    ["Sudurpashchim", 26.2, "#8c564b"],
    ["Gandaki", 20.8, "#2ca02c"],
    ["Karnali", 11.5, "#1f77b4"],
  ],
  landUse: [
    ["Type", "Area (Square KM)"],
    ["Forest", 61739.98],
    ["Agricultural", 41275.54],
    ["Public Use", 11405.75],
    ["Water Bodies", 4937.32],
    ["Residential", 1980.11],
    ["Other", 21884.59],
    ["Industrial", 94.98],
    ["Commercial", 79.43],
    ["Mines and Minerals", 25.85],
    ["Cultural and Archaeological", 14.33],
  ],
};

// Add configuration for Land Use by Province
const getLandUseByProvinceOptions = () => ({
  ...getBaseChartStyles(),
  bars: "group",
  isStacked: false,
  chartArea: { width: "80%", height: "70%" },
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  colors: ["#1976D2", "#388E3C", "#FFA000", "#D32F2F", "#7B1FA2", "#0097A7"],
});

async function loadLandUseByProvinceData() {
  try {
    const response = await fetch(
      "src/assets/labels/Processed Data(Land Use Distribution By Use).csv"
    );
    const data = await response.text();
    const rows = data.split("\n").map((row) => row.split(","));

    const categories = rows.slice(2).map((row) => row[0]);
    const provinces = rows[1].slice(0);
    const landUseData = [["Province", ...categories]];

    for (let i = 1; i < provinces.length; i++) {
      const provinceData = [
        provinces[i],
        ...rows.slice(2).map((row) => parseFloat(row[i]) || 0),
      ];
      landUseData.push(provinceData);
    }

    return google.visualization.arrayToDataTable(landUseData);
  } catch (error) {
    console.error("Error loading chart data:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load chart data",
      position: "top",
    });
    return null;
  }
}

const drawCharts = async () => {
  loading.value = true;
  try {
    const configs = getChartConfigs();

    // Draw existing charts
    const totalLandData = google.visualization.arrayToDataTable(
      chartData.totalLand
    );
    const totalLandChart = new google.visualization.ColumnChart(
      totalLandChartRef.value
    );
    totalLandChart.draw(totalLandData, configs.totalLand);

    const agriculturalData = google.visualization.arrayToDataTable(
      chartData.agricultural
    );
    const agriculturalChart = new google.visualization.ColumnChart(
      agriculturalChartRef.value
    );
    agriculturalChart.draw(agriculturalData, configs.agricultural);

    const percentageData = google.visualization.arrayToDataTable(
      chartData.percentage
    );
    const percentageChart = new google.visualization.BarChart(
      percentageChartRef.value
    );
    percentageChart.draw(percentageData, configs.percentage);

    const landUseData = google.visualization.arrayToDataTable(
      chartData.landUse
    );
    const landUseChart = new google.visualization.PieChart(
      landUseChartRef.value
    );
    landUseChart.draw(landUseData, configs.landUse);

    // Draw Land Use by Province chart
    const landUseByProvinceData = await loadLandUseByProvinceData();
    if (landUseByProvinceData && landUseByProvinceRef.value) {
      const landUseByProvinceChart = new google.visualization.ColumnChart(
        landUseByProvinceRef.value
      );
      landUseByProvinceChart.draw(
        landUseByProvinceData,
        getLandUseByProvinceOptions()
      );
    }
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
};

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

// Watch for theme changes
watch(
  () => $q.dark.isActive,
  () => {
    drawCharts();
  }
);

onMounted(async () => {
  try {
    await google.charts.load("current", { packages: ["corechart"] });
    await drawCharts();
    window.addEventListener("resize", handleResize);
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
</style>
