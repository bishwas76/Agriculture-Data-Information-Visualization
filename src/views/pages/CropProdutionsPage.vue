<template>
  <div class="q-pa-sm">
    <div class="q-my-md">
      <q-breadcrumbs gutter="sm">
        <q-breadcrumbs-el
          :to="{ name: 'Dashboard' }"
          icon="home"
          label="Dashboard"
        />
        <q-breadcrumbs-el icon="eco" label="Crop Production" />
      </q-breadcrumbs>
    </div>
    <div class="row q-col-gutter-sm">
      <!-- Map Component -->
      <div class="col-12">
        <CropCeralProductionMapComponent />
      </div>

      <div class="col-12">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <q-img src="/nepal-paddy-hexagons-district.png" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Area Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Cereal Crop Production in Nepal (100% Area Chart)
            </div>
            <GChart
              type="AreaChart"
              :data="cerealProductionData"
              :options="areaChartOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Bar Chart -->
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Total Cereal Crop Production in Nepal (Stacked Bar Chart)
            </div>
            <GChart
              type="BarChart"
              :data="cerealProductionData"
              :options="barChartOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Tree Map -->
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center q-mb-md">
              Cereal Production in Nepal (FY 2079/80)
            </div>
            <GChart
              type="TreeMap"
              :data="treeMapData"
              :options="treeMapOptions"
              :settings="{ packages: ['treemap'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { GChart } from "vue-google-charts";
import CropCeralProductionMapComponent from "@/components/CropCeralProductionMapComponent.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Chart Data
const cerealProductionData = [
  ["Year", "Paddy", "Maize", "Millet", "Buckwheat", "Wheat", "Barley"],
  ["2012/13", 4504503, 1999010, 305588, 10056, 1882220, 36973],
  ["2013/14", 5047047, 2283222, 304105, 10335, 1883147, 34824],
  ["2014/15", 4788612, 2145291, 308488, 10870, 1975625, 37354],
  ["2015/16", 4299079, 2231517, 302397, 11641, 1736849, 32801],
  ["2016/17", 5230327, 2300121, 306704, 12039, 1879191, 30510],
  ["2017/18", 5151925, 2555847, 313987, 11472, 1949001, 30510],
  ["2018/19", 5610011, 2713635, 314225, 11464, 2005665, 30550],
  ["2019/20", 5550878, 2835674, 320953, 11724, 2185289, 31147],
  ["2020/21", 5621710, 2997733, 326443, 15917, 2127276, 29433],
  ["2021/22", 5130625, 3106397, 339462, 19290, 2144568, 32156],
  ["2022/23", 5486472, 2976490, 310847, 15083, 2098462, 25912],
];

const treeMapData = [
  ["Province/Crop", "Parent", "Total Production (MT)"],
  ["NEPAL", null, 0],
  ["KOSHI", "NEPAL", 2571222],
  ["KOSHI - Paddy", "KOSHI", 1336057],
  ["KOSHI - Maize", "KOSHI", 972073],
  ["KOSHI - Wheat", "KOSHI", 147331],
  ["KOSHI - Millet", "KOSHI", 108375],
  ["KOSHI - Barley", "KOSHI", 1733],
  ["KOSHI - Buckwheat", "KOSHI", 5654],
  ["MADHESH", "NEPAL", 2257468],
  ["MADHESH - Paddy", "MADHESH", 1388841],
  ["MADHESH - Maize", "MADHESH", 190816],
  ["MADHESH - Wheat", "MADHESH", 674382],
  ["MADHESH - Millet", "MADHESH", 3259],
  ["MADHESH - Barley", "MADHESH", 171],
  ["BAGMATI", "NEPAL", 1410282],
  ["BAGMATI - Paddy", "BAGMATI", 500446],
  ["BAGMATI - Maize", "BAGMATI", 678365],
  ["BAGMATI - Wheat", "BAGMATI", 153441],
  ["BAGMATI - Millet", "BAGMATI", 72228],
  ["BAGMATI - Barley", "BAGMATI", 2076],
  ["BAGMATI - Buckwheat", "BAGMATI", 3725],
  ["GANDAKI", "NEPAL", 942460],
  ["GANDAKI - Paddy", "GANDAKI", 391121],
  ["GANDAKI - Maize", "GANDAKI", 387904],
  ["GANDAKI - Wheat", "GANDAKI", 81124],
  ["GANDAKI - Millet", "GANDAKI", 79619],
  ["GANDAKI - Barley", "GANDAKI", 1215],
  ["GANDAKI - Buckwheat", "GANDAKI", 1477],
  ["LUMBINI", "NEPAL", 2136751],
  ["LUMBINI - Paddy", "LUMBINI", 1151313],
  ["LUMBINI - Maize", "LUMBINI", 433416],
  ["LUMBINI - Wheat", "LUMBINI", 535020],
  ["LUMBINI - Millet", "LUMBINI", 12579],
  ["LUMBINI - Barley", "LUMBINI", 3352],
  ["LUMBINI - Buckwheat", "LUMBINI", 1072],
  ["KARNALI", "NEPAL", 529248],
  ["KARNALI - Paddy", "KARNALI", 129473],
  ["KARNALI - Maize", "KARNALI", 212459],
  ["KARNALI - Wheat", "KARNALI", 151598],
  ["KARNALI - Millet", "KARNALI", 20705],
  ["KARNALI - Barley", "KARNALI", 11924],
  ["KARNALI - Buckwheat", "KARNALI", 3088],
  ["SUDURPASHCHIM", "NEPAL", 1065835],
  ["SUDURPASHCHIM - Paddy", "SUDURPASHCHIM", 589221],
  ["SUDURPASHCHIM - Maize", "SUDURPASHCHIM", 101456],
  ["SUDURPASHCHIM - Wheat", "SUDURPASHCHIM", 355567],
  ["SUDURPASHCHIM - Millet", "SUDURPASHCHIM", 14082],
  ["SUDURPASHCHIM - Barley", "SUDURPASHCHIM", 5442],
  ["SUDURPASHCHIM - Buckwheat", "SUDURPASHCHIM", 68],
];

// Base chart styles
const baseChartStyles = computed(() => ({
  backgroundColor: $q.dark.isActive ? "#1d1d1d" : "#ffffff",
  titleTextStyle: {
    color: $q.dark.isActive ? "#fff" : "#333",
    fontSize: 16,
    bold: true,
  },
  legend: {
    position: "bottom",
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
}));

// Chart Options
const areaChartOptions = computed(() => ({
  ...baseChartStyles.value,
  isStacked: "percent",
  height: 450,
  hAxis: {
    ...baseChartStyles.value.hAxis,
    title: "Year",
  },
  vAxis: {
    ...baseChartStyles.value.vAxis,
    title: "Percentage of Production",
  },
  colors: ["#1976D2", "#388E3C", "#FFA000", "#D32F2F", "#7B1FA2", "#00ACC1"],
}));

const barChartOptions = computed(() => ({
  ...baseChartStyles.value,
  isStacked: true,
  height: 450,
  hAxis: {
    ...baseChartStyles.value.hAxis,
    title: "Total Production (Mt)",
  },
  vAxis: {
    ...baseChartStyles.value.vAxis,
    title: "Year",
  },
  colors: ["#1976D2", "#388E3C", "#FFA000", "#D32F2F", "#7B1FA2", "#00ACC1"],
}));

const treeMapOptions = computed(() => ({
  ...baseChartStyles.value,
  minColor: "#c8e6c9",
  midColor: "#66bb6a",
  maxColor: "#1b5e20",
  headerHeight: 15,
  fontColor: $q.dark.isActive ? "#fff" : "black",
  showScale: true,
  height: 450,
  generateTooltip: (row: number, size: number, value: number) => {
    return `
      <div style="background:#fd9; padding:10px; border-style:solid">
        <span style="font-family:Courier"><b>${treeMapData[row][0]}</b>, 
        ${treeMapData[row][2]} MT</span>
      </div>
    `;
  },
}));
</script>

<style scoped>
.chart-container {
  height: 490px;
  width: 100%;
}

.chart-container.large {
  height: 450px;
}
@media (max-width: 600px) {
  .chart-container {
    height: 300px;
  }
  .chart-container.large {
    height: 350px;
  }
}

.chart-card {
  height: 100%;
}
</style>
