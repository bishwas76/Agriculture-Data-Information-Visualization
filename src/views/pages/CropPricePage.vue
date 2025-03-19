<template>
  <div class="q-pa-sm">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import FlourishChartComponent from "@/components/FlourishChartComponent.vue";
</script>

<style scoped>
.chart-card {
  height: 100%;
}
</style>
