<template>
  <div class="q-pa-sm">
    <div class="q-my-md">
      <q-breadcrumbs gutter="sm">
        <q-breadcrumbs-el
          :to="{ name: 'Dashboard' }"
          icon="home"
          label="Dashboard"
        />
        <q-breadcrumbs-el icon="attach_money" label="Crop Price" />
      </q-breadcrumbs>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <FlourishChartComponent dataSrc="visualisation/22199657" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <FlourishChartComponent dataSrc="visualisation/22199240" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <FlourishChartComponent dataSrc="visualisation/22199548" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <FlourishChartComponent dataSrc="visualisation/22199389" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Monthly Price Comparison for Chilly (2014-2024)
            </div>
            <GChart
              type="LineChart"
              :data="chartData.chillyData"
              :options="chillyChartOption"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Monthly Price Comparison for Potato (2014-2024)
            </div>
            <GChart
              type="LineChart"
              :data="chartData.potatoData"
              :options="potatoChartOption"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Monthly Price Comparison for Lettuce (2014-2024)
            </div>
            <GChart
              type="LineChart"
              :data="chartData.lettuceData"
              :options="lettuceChartOption"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered class="chart-card">
          <q-card-section>
            <div class="text-h6 text-center">
              Monthly Price Comparison for Tomato (2014-2024)
            </div>
            <GChart
              type="LineChart"
              :data="chartData.tomatoData"
              :options="tomatoChartOption"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { GChart } from "vue-google-charts";
import { useQuasar } from "quasar";
import FlourishChartComponent from "@/components/FlourishChartComponent.vue";

const $q = useQuasar();

// Corrected chart data structure
const chartData = {
  chillyData: [
    [
      "Month",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    [
      "Jan",
      46.88,
      45.0,
      53.84,
      47.61,
      66.77,
      49.94,
      54.74,
      80.53,
      66.52,
      71.9,
      73.08,
    ],
    [
      "Feb",
      54.35,
      44.48,
      51.28,
      49.52,
      84.57,
      51.79,
      63.68,
      85.64,
      118.23,
      81.59,
      81.41,
    ],
    [
      "March",
      73.68,
      62.58,
      70.69,
      61.24,
      80.13,
      71.0,
      98.69,
      87.01,
      167.74,
      113.5,
      131.12,
    ],
    [
      "April",
      50.96,
      58.57,
      66.23,
      45.87,
      57.7,
      87.6,
      66.12,
      74.18,
      85.01,
      73.67,
      83.39,
    ],
    [
      "May",
      56.26,
      42.13,
      112.52,
      53.6,
      52.1,
      96.71,
      46.94,
      60.11,
      79.39,
      83.41,
      100.24,
    ],
    [
      "June",
      44.28,
      39.97,
      45.53,
      49.03,
      56.17,
      87.87,
      43.97,
      58.18,
      42.42,
      69.31,
      78.51,
    ],
    [
      "July",
      49.23,
      59.0,
      92.61,
      44.61,
      85.58,
      62.17,
      49.66,
      89.7,
      39.84,
      159.16,
      106.37,
    ],
    [
      "Aug",
      57.37,
      41.43,
      89.68,
      51.26,
      64.23,
      64.48,
      78.4,
      67.49,
      65.38,
      88.12,
      79.2,
    ],
    [
      "Sept",
      74.43,
      40.5,
      83.33,
      62.97,
      72.23,
      90.2,
      109.67,
      57.53,
      59.95,
      79.41,
      98.53,
    ],
    [
      "Oct",
      77.5,
      47.52,
      66.87,
      90.45,
      79.0,
      101.15,
      162.39,
      62.77,
      102.76,
      112.77,
      160.95,
    ],
    [
      "Nov",
      49.63,
      42.37,
      50.6,
      57.87,
      50.23,
      61.17,
      90.97,
      66.21,
      64.12,
      58.49,
      69.12,
    ],
    [
      "Dec",
      40.0,
      38.55,
      43.9,
      69.33,
      45.16,
      55.23,
      76.54,
      57.4,
      57.14,
      51.53,
      59.11,
    ],
  ],
  potatoData: [
    [
      "Month",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    [
      "Jan",
      21.25,
      19.14,
      22.06,
      19.23,
      24.7,
      24.23,
      24.23,
      23.98,
      26.21,
      24.18,
      25.62,
    ],
    [
      "Feb",
      16.27,
      17.04,
      18.62,
      15.0,
      19.29,
      19.07,
      19.07,
      18.86,
      20.0,
      19.01,
      29.0,
    ],
    [
      "March",
      19.82,
      15.04,
      18.03,
      13.28,
      21.9,
      19.0,
      19.0,
      21.3,
      21.86,
      18.02,
      30.89,
    ],
    [
      "April",
      23.18,
      12.82,
      20.4,
      16.47,
      29.5,
      21.0,
      28.5,
      23.74,
      22.57,
      24.12,
      41.53,
    ],
    [
      "May",
      24.74,
      11.47,
      29.0,
      18.23,
      26.48,
      22.31,
      27.1,
      33.04,
      25.73,
      27.69,
      43.0,
    ],
    [
      "June",
      30.24,
      14.67,
      32.7,
      16.83,
      29.87,
      26.07,
      28.17,
      32.83,
      32.99,
      34.76,
      44.94,
    ],
    [
      "July",
      32.74,
      17.3,
      34.58,
      19.19,
      35.73,
      29.97,
      42.6,
      34.34,
      44.58,
      35.13,
      50.7,
    ],
    [
      "Aug",
      37.17,
      19.23,
      32.94,
      26.87,
      41.1,
      34.23,
      42.6,
      36.88,
      50.27,
      39.42,
      53.35,
    ],
    [
      "Sept",
      38.11,
      22.3,
      33.0,
      29.0,
      48.4,
      34.37,
      42.6,
      42.63,
      52.21,
      48.02,
      55.59,
    ],
    [
      "Oct",
      42.59,
      29.19,
      33.0,
      31.55,
      48.0,
      45.48,
      89.29,
      45.28,
      73.14,
      48.84,
      68.0,
    ],
    [
      "Nov",
      39.73,
      25.57,
      33.26,
      34.63,
      41.5,
      39.38,
      66.59,
      47.6,
      48.41,
      38.96,
      61.88,
    ],
    [
      "Dec",
      25.76,
      22.29,
      23.77,
      31.46,
      34.29,
      42.75,
      46.55,
      32.04,
      38.71,
      32.31,
      55.11,
    ],
  ],
  lettuceData: [
    [
      "Month",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    [
      "Jan",
      45.38,
      72.86,
      56.71,
      42.74,
      80.57,
      91.45,
      65.0,
      65.16,
      149.7,
      46.94,
      90.22,
    ],
    [
      "Feb",
      33.14,
      87.24,
      54.97,
      39.37,
      48.71,
      47.36,
      64.66,
      78.27,
      105.93,
      49.02,
      77.32,
    ],
    [
      "March",
      34.55,
      62.0,
      40.89,
      38.69,
      51.0,
      42.83,
      48.5,
      58.61,
      67.0,
      54.89,
      66.39,
    ],
    [
      "April",
      55.57,
      47.43,
      63.1,
      48.0,
      89.73,
      60.03,
      33.0,
      66.06,
      80.83,
      45.72,
      66.39,
    ],
    [
      "May",
      83.04,
      43.73,
      74.74,
      55.63,
      88.77,
      69.84,
      33.0,
      45.58,
      85.11,
      97.64,
      82.42,
    ],
    [
      "June",
      72.44,
      44.57,
      56.83,
      56.57,
      64.53,
      60.67,
      33.0,
      59.73,
      114.25,
      63.01,
      94.71,
    ],
    [
      "July",
      67.13,
      53.26,
      47.52,
      56.84,
      72.81,
      77.9,
      85.0,
      215.08,
      90.46,
      87.53,
      310.38,
    ],
    [
      "Aug",
      58.0,
      139.0,
      78.23,
      58.0,
      158.67,
      96.67,
      100.33,
      104.68,
      152.9,
      274.41,
      159.61,
    ],
    [
      "Sept",
      57.89,
      99.0,
      73.17,
      59.62,
      172.33,
      95.0,
      64.29,
      333.04,
      180.06,
      182.17,
      98.22,
    ],
    [
      "Oct",
      60.79,
      90.74,
      63.32,
      59.13,
      79.52,
      240.71,
      174.62,
      405.86,
      219.54,
      78.23,
      212.95,
    ],
    [
      "Nov",
      82.83,
      70.34,
      62.33,
      88.27,
      58.6,
      105.33,
      123.72,
      96.73,
      108.71,
      105.12,
      124.5,
    ],
    [
      "Dec",
      60.8,
      66.61,
      57.19,
      104.79,
      58.55,
      62.1,
      61.24,
      105.0,
      45.16,
      93.77,
      102.68,
    ],
  ],
  tomatoData: [
    [
      "Month",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],
    [
      "Jan",
      27.75,
      26.96,
      22.35,
      24.68,
      30.2,
      24.94,
      30.13,
      22.25,
      21.42,
      18.31,
      19.51,
    ],
    [
      "Feb",
      30.78,
      16.48,
      26.14,
      18.11,
      23.32,
      26.36,
      17.83,
      16.31,
      24.05,
      15.39,
      26.84,
    ],
    [
      "March",
      43.86,
      40.11,
      35.03,
      29.03,
      36.83,
      45.93,
      43.69,
      27.21,
      33.36,
      34.16,
      37.03,
    ],
    [
      "April",
      37.78,
      35.96,
      29.67,
      30.63,
      29.4,
      39.17,
      31.65,
      24.63,
      36.77,
      23.89,
      34.63,
    ],
    [
      "May",
      22.13,
      50.0,
      58.42,
      35.7,
      31.97,
      73.81,
      27.83,
      22.87,
      69.83,
      37.87,
      29.84,
    ],
    [
      "June",
      26.76,
      45.0,
      52.17,
      40.5,
      35.6,
      38.2,
      23.7,
      22.98,
      39.73,
      12.94,
      17.68,
    ],
    [
      "July",
      20.16,
      52.23,
      66.9,
      31.97,
      20.35,
      51.65,
      21.07,
      24.73,
      39.27,
      31.36,
      29.13,
    ],
    [
      "Aug",
      38.67,
      51.94,
      58.16,
      55.13,
      28.97,
      66.61,
      47.58,
      17.89,
      31.39,
      62.74,
      31.94,
    ],
    [
      "Sept",
      42.32,
      28.8,
      47.27,
      48.79,
      42.5,
      39.03,
      68.3,
      15.31,
      30.81,
      52.44,
      30.21,
    ],
    [
      "Oct",
      43.0,
      23.68,
      61.45,
      51.55,
      48.1,
      54.7,
      60.55,
      53.67,
      34.2,
      42.68,
      95.75,
    ],
    [
      "Nov",
      25.47,
      54.07,
      35.03,
      68.53,
      22.8,
      47.27,
      45.13,
      70.05,
      27.1,
      28.98,
      71.68,
    ],
    [
      "Dec",
      32.33,
      47.58,
      31.29,
      50.21,
      19.81,
      35.74,
      46.64,
      52.58,
      19.06,
      15.54,
      64.68,
    ],
  ],
};

// Improved chart options
const baseChartOptions = computed(() => ({
  curveType: "function",
  legend: {
    position: "bottom",
    maxLines: 3,
    textStyle: {
      color: $q.dark.isActive ? "#ffffff" : "#333333",
    },
  },
  backgroundColor: $q.dark.isActive ? "#1d1d1d" : "#ffffff",
  chartArea: {
    width: "80%",
    height: "70%",
  },
  hAxis: {
    title: "Month",
    textStyle: {
      color: $q.dark.isActive ? "#ffffff" : "#333333",
    },
    titleTextStyle: {
      color: $q.dark.isActive ? "#ffffff" : "#333333",
    },
  },
  vAxis: {
    title: "Price (NPR)",
    textStyle: {
      color: $q.dark.isActive ? "#ffffff" : "#333333",
    },
    titleTextStyle: {
      color: $q.dark.isActive ? "#ffffff" : "#333333",
    },
  },
  lineWidth: 2,
  pointSize: 4,
  animation: {
    startup: true,
    duration: 1000,
    easing: "out",
  },
}));

const chillyChartOption = computed(() => ({
  ...baseChartOptions.value,
  colors: [
    "#FF5252",
    "#FF7F50",
    "#FFA726",
    "#FFD54F",
    "#81C784",
    "#4CAF50",
    "#26A69A",
    "#00BCD4",
    "#42A5F5",
    "#5C6BC0",
    "#7E57C2",
  ],
}));

const potatoChartOption = computed(() => ({
  ...baseChartOptions.value,
  colors: [
    "#FF5252",
    "#FF7F50",
    "#FFA726",
    "#FFD54F",
    "#81C784",
    "#4CAF50",
    "#26A69A",
    "#00BCD4",
    "#42A5F5",
    "#5C6BC0",
    "#7E57C2",
  ],
}));

const lettuceChartOption = computed(() => ({
  ...baseChartOptions.value,
  colors: [
    "#FF5252",
    "#FF7F50",
    "#FFA726",
    "#FFD54F",
    "#81C784",
    "#4CAF50",
    "#26A69A",
    "#00BCD4",
    "#42A5F5",
    "#5C6BC0",
    "#7E57C2",
  ],
}));

const tomatoChartOption = computed(() => ({
  ...baseChartOptions.value,
  colors: [
    "#FF5252",
    "#FF7F50",
    "#FFA726",
    "#FFD54F",
    "#81C784",
    "#4CAF50",
    "#26A69A",
    "#00BCD4",
    "#42A5F5",
    "#5C6BC0",
    "#7E57C2",
  ],
}));
</script>

<style scoped>
.chart-container {
  height: 450px;
  width: 100%;
  transition: all 0.3s ease;
}

.chart-card {
  height: 100%;
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .chart-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .chart-container {
    height: 350px;
  }
}

@media (max-width: 600px) {
  .chart-container {
    height: 300px;
  }
}

/* Print styles */
@media print {
  .chart-container {
    height: 500px;
    page-break-inside: avoid;
  }
}
</style>
