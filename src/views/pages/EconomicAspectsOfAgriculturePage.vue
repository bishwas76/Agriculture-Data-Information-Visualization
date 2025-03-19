<template>
  <div class="q-pa-sm">
    <div class="q-my-md">
      <q-breadcrumbs gutter="sm">
        <q-breadcrumbs-el
          :to="{ name: 'Dashboard' }"
          icon="home"
          label="Dashboard"
        />
        <q-breadcrumbs-el
          icon="money"
          label="Economic Aspects of Agriculture"
        />
      </q-breadcrumbs>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">Nepal GDP Breakdown</div>
            <FlourishChartComponent dataSrc="visualisation/22141286" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center">
              Contribution of Agricultural Commodities to Agriculture GDP (FY
              2080/81)
            </div>
            <FlourishChartComponent dataSrc="visualisation/22135889" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlourishChartComponent from "@/components/FlourishChartComponent.vue";
</script>

<style scoped></style>
