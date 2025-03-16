<template>
  <div
    ref="flourishContainer"
    class="flourish-embed flourish-hierarchy"
    :data-src="dataSrc"
    data-height="800px"
  >
    <noscript>
      <img :src="thumbnailSrc" width="100%" alt="hierarchy visualization" />
    </noscript>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";

const flourishContainer = ref(null);
const dataSrc = "visualisation/22135889";
const thumbnailSrc = `https://public.flourish.studio/${dataSrc}/thumbnail`;

onBeforeMount(() => {
  const script = document.createElement("script");
  script.src = "https://public.flourish.studio/resources/embed.js";
  script.async = true;
  document.body.appendChild(script);
});
</script>

<style scoped></style>
