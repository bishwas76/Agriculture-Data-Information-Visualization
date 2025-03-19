<template>
  <div class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              National Seed Production Status
            </div>
            <GChart
              type="AreaChart"
              :data="seedProductionStatusData"
              :options="seedProductionStatusOptions"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">Paddy Seed Supply</div>
            <GChart
              type="AreaChart"
              :data="seedPaddySupplyData"
              :options="seedPaddySupplyOptions"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card class="chart-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Seed Balance for Selected Agriculture Commodities
            </div>
            <GChart
              type="ComboChart"
              :data="chartData.seedBalance"
              :options="seedBalanceOptions"
              :settings="{ packages: ['corechart'] }"
              class="chart-container"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center q-mb-md">
              Total Sales of Fertilizers (FY 2079/80)
            </div>
            <FlourishChartComponent dataSrc="visualisation/22139746" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { GChart } from "vue-google-charts";
import { useQuasar } from "quasar";
import FlourishChartComponent from "@/components/FlourishChartComponent.vue";
const $q = useQuasar();

const seedProductionStatus = ref([
  ["Year", "Paddy", "Maize", "Wheat", "Lentil", "Rapeseed"],
] as any[]);
const seedPaddySupply = ref([
  [
    "Year",
    "Breeder Seed (BS)",
    "Foundation Seed (FS)",
    "Certified Seed (CS)",
    "Improved Seed (IS)",
  ],
] as any[]);

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

const chartData = {
  seedBalance: [
    [
      "Year",
      "Paddy (Req)",
      "Paddy (Supply)",
      "Paddy (SRR)",
      "Maize (Req)",
      "Maize (Supply)",
      "Maize (SRR)",
      "Wheat (Req)",
      "Wheat (Supply)",
      "Wheat (SRR)",
    ],
    ["FY 2073/74", 71195, 297, 14.46, 19552, 2989, 15.29, 92703, 3193, 15.08],
    ["FY 2074/75", 73477, 1533, 18.42, 23854, 3683, 15.44, 84821, 2910, 15.22],
    [
      "FY 2075/76",
      70252,
      16453,
      23.48,
      23911,
      3721,
      15.56,
      84479,
      16068,
      19.02,
    ],
    [
      "FY 2076/77",
      70885,
      16998,
      23.98,
      23911,
      3303,
      13.81,
      84479,
      15792,
      22.04,
    ],
    [
      "FY 2077/78",
      67252,
      17749,
      26.39,
      23941,
      3210,
      13.41,
      82210,
      18025,
      20.74,
    ],
    ["FY 2078/79", 69326, 16904, 27.87, 24639, 3407, 13.83, 84825, 18625, 22.0],
  ],
  seedProductionStatus: [
    ["FY 2074/75", "FY 2075/76", "FY 2076/77", "FY 2077/78", "FY 2078/79"],
    [14295, 15341, 15527, 15151, 14537.29],
    [3766, 2627, 1923, 1068, 1132.09],
    [13753, 16954, 19682, 18707, 19437.12],
    [400, 461, 360, 466, 470.78],
    [289, 355, 350, 341, 353.03],
  ],
  seedPaddySupply: [
    ["FY 2074/75", "FY 2075/76", "FY 2076/77", "FY 2077/78", "FY 2078/79"],
    [24, 25, 21, 13, 11],
    [473, 467, 494, 482, 462],
    [265, 255, 813, 1076, 790],
    [13533, 14594, 14199, 13580, 12354],
  ],
};

const seedProductionStatusData = computed(() => {
  for (let i = 0; i < chartData.seedProductionStatus[0].length; i++) {
    seedProductionStatus.value.push([
      chartData.seedProductionStatus[0][i],
      chartData.seedProductionStatus[1][i],
      chartData.seedProductionStatus[2][i],
      chartData.seedProductionStatus[3][i],
      chartData.seedProductionStatus[4][i],
      chartData.seedProductionStatus[5][i],
    ]);
  }
  return seedProductionStatus.value;
});

const seedPaddySupplyData = computed(() => {
  for (let i = 0; i < chartData.seedPaddySupply[0].length; i++) {
    // [years[i], paddyBS[i], paddyFS[i], paddyCS[i], paddyIS[i]];
    seedPaddySupply.value.push([
      chartData.seedPaddySupply[0][i],
      chartData.seedPaddySupply[1][i],
      chartData.seedPaddySupply[2][i],
      chartData.seedPaddySupply[3][i],
      chartData.seedPaddySupply[4][i],
    ]);
  }
  return seedPaddySupply.value;
});

const seedBalanceOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "",
  vAxes: {
    0: { title: "Total Seed (Metric Tons)" },
    1: { title: "Seed Replacement Rate (%)" },
  },
  hAxis: { title: "Fiscal Year" },
  seriesType: "bars",
  series: {
    2: { type: "line", targetAxisIndex: 1 },
    5: { type: "line", targetAxisIndex: 1 },
    8: { type: "line", targetAxisIndex: 1 },
  },
  colors: [
    "#27AE60", // Paddy (Req) - Darker Green (was Supply)
    "#2ECC71", // Paddy (Supply) - Bright Green (was Req)
    "#1ABC9C", // Paddy (SRR) - Teal (unchanged)

    "#2980B9", // Maize (Req) - Darker Blue (was Supply)
    "#3498DB", // Maize (Supply) - Bright Blue (was Req)
    "#85C1E9", // Maize (SRR) - Light Blue (unchanged)

    "#C0392B", // Wheat (Req) - Darker Red (was Supply)
    "#E74C3C", // Wheat (Supply) - Bright Red (was Req)
    "#EC7063", // Wheat (SRR) - Light Red (unchanged)
  ],
}));

const seedProductionStatusOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Seed Production Over Years",
  height: 400,
  hAxis: { title: "Year" },
  vAxis: { title: "Metric Tons" },
  isStacked: true,
}));

const seedPaddySupplyOptions = computed(() => ({
  ...baseChartStyles.value,
  title: "Paddy Seed Distribution Over Years",
  hAxis: { title: "Year" },
  vAxis: { title: "Amount(MT)" },
  legend: { position: "bottom" },
  areaOpacity: 0.3,
  isStacked: true,
}));
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
