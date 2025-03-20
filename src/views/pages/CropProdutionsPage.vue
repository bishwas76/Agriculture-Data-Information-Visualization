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
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Cereal Production in Nepal (FY 2079/80)
            </div>
            <FlourishChartComponent dataSrc="visualisation/22210792" />
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
import FlourishChartComponent from "@/components/FlourishChartComponent.vue";
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
