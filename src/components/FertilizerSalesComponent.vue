<template>
  <iframe
    :key="iframeKey"
    :src="flourishUrl"
    class="flourish-iframe"
    frameborder="0"
    scrolling="no"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const iframeKey = ref(0);
const dataSrc = "visualisation/22139746";
const flourishUrl = `https://flo.uri.sh/${dataSrc}/embed`;
</script>

<style>
.flourish-iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style>
