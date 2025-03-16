<template>
  <div>
    <div class="row q-col-gutter-sm">
      <!-- Total Land Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Total Land Use per Province (FY 2079/80)
            </div>
            <GChart
              type="ColumnChart"
              :data="chartData.totalLand"
              :options="totalLandOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Agricultural Land Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Agricultural Land Use per Province (FY 2079/80)
            </div>
            <GChart
              type="ColumnChart"
              :data="chartData.agricultural"
              :options="agriculturalOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Percentage Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Agricultural Land Percentage (FY 2079/80)
            </div>
            <GChart
              type="BarChart"
              :data="chartData.percentage"
              :options="percentageOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Land Use Distribution Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Land Use Distribution in Nepal (FY 2079/80)
            </div>
            <GChart
              type="PieChart"
              :data="chartData.landUse"
              :options="landUseOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Land Use Distribution by Province Chart -->
      <div class="col-12">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Land Use Distribution by Province (FY 2079/80)
            </div>
            <GChart
              v-if="landUseByProvinceData"
              type="ColumnChart"
              :data="landUseByProvinceData"
              :options="landUseByProvinceOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container large"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-dots size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { GChart } from "vue-google-charts";
import { useQuasar } from "quasar";

const $q = useQuasar();
const loading = ref(true);
const landUseByProvinceData = ref(null);

// Base chart styles
const baseChartStyles = computed(() => ({
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
  height: 390,
}));

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

// Chart options
const totalLandOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Total Land Use per Province",
  hAxis: { ...baseChartStyles.value.hAxis, title: "Province" },
  vAxis: { ...baseChartStyles.value.vAxis, title: "Land (Square KM)" },
  bars: "vertical",
  legend: "none",
}));

const agriculturalOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Agricultural Land Use per Province (Ranked)",
  hAxis: { ...baseChartStyles.value.hAxis, title: "Province" },
  vAxis: { ...baseChartStyles.value.vAxis, title: "Land (Square KM)" },
  bars: "vertical",
  legend: "none",
}));

const percentageOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Agricultural Land as Percentage of Total Land",
  hAxis: { ...baseChartStyles.value.hAxis, title: "Percentage (%)" },
  vAxis: { ...baseChartStyles.value.vAxis, title: "Province" },
  bars: "horizontal",
  legend: "none",
  bar: { groupWidth: "50%" },
}));

const landUseOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Land Use Distribution in Nepal",
  pieHole: 0.4,
  legend: {
    position: "right",
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  tooltip: { trigger: "focus" },
  chartArea: { width: "70%", height: "80%" },
}));

const landUseByProvinceOptions = computed(() => ({
  ...baseChartStyles.value,
  height: 450,
  bars: "group",
  isStacked: false,
  chartArea: { width: "80%", height: "70%" },
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: { color: $q.dark.isActive ? "#e0e0e0" : "#666" },
  },
  colors: ["#1976D2", "#388E3C", "#FFA000", "#D32F2F", "#7B1FA2", "#0097A7"],
}));

// Load Land Use by Province data
const loadLandUseByProvinceData = async () => {
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
      landUseData.push(provinceData as any);
    }

    landUseByProvinceData.value = landUseData as any;
    loading.value = false;
  } catch (error) {
    console.error("Error loading chart data:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load chart data",
      position: "top",
    });
  }
};

onMounted(() => {
  loadLandUseByProvinceData();
});
</script>

<style scoped>
.chart-container {
  height: 390px;
  width: 100%;
}

.chart-container.large {
  height: 450px;
}

.chart-card {
  height: 100%;
}

@media (max-width: 600px) {
  .chart-container {
    height: 300px;
  }
  .chart-container.large {
    height: 350px;
  }
}
</style>
