<template>
  <div class="q-pa-sm">
    <LandUseDistributionComponet />
  </div>
</template>
<script setup lang="ts">
import {
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  type Ref,
  computed,
} from "vue";
import LandUseDistributionComponet from "@/components/LandUseDistributionComponet.vue";
</script>
<style scoped></style>
