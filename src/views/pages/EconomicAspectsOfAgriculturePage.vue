<template>
  <div class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center q-mb-md">Nepal GDP Breakdown</div>
            <NepalGDPComponent />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 text-center q-mb-md">
              Contribution of Agricultural Commodities to Agriculture GDP (FY
              2080/81)
            </div>
            <AgricultureGPDComponent />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AgricultureGPDComponent from "@/components/AgricultureGPDComponent.vue";
import NepalGDPComponent from "@/components/NepalGDPComponent.vue";
</script>

<style scoped></style>
