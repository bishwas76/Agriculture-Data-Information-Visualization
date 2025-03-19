<template>
  <div class="iframe-container">
    <iframe
      :key="iframeKey"
      :src="flourishUrl"
      class="flourish-iframe"
      frameborder="0"
      scrolling="no"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  dataSrc: {
    type: String,
    required: true,
  },
});

const iframeKey = ref(0);
const dataSrc = props.dataSrc;
const flourishUrl = `https://flo.uri.sh/${dataSrc}/embed`;
</script>

<style scoped>
.flourish-iframe {
  width: 100%;
  height: 650px;
  border: none;
  transition: height 0.3s ease;
}

/* Large desktop screens */
@media screen and (min-width: 1921px) {
  .flourish-iframe {
    height: 1000px;
  }
}

/* Standard desktop screens */
@media screen and (max-width: 1920px) {
  .flourish-iframe {
    height: 650px;
  }
}

/* Smaller desktop and laptop screens */
@media screen and (max-width: 1440px) {
  .flourish-iframe {
    height: 650px;
  }
}

/* Tablets and smaller laptops */
@media screen and (max-width: 1024px) {
  .flourish-iframe {
    height: 650px;
  }
}

/* Large tablets and iPad Pro */
@media screen and (max-width: 992px) {
  .flourish-iframe {
    height: 600px;
  }
}

/* Tablets and iPad */
@media screen and (max-width: 768px) {
  .flourish-iframe {
    height: 550px;
  }
}

/* Large mobile phones */
@media screen and (max-width: 576px) {
  .flourish-iframe {
    height: 500px;
  }
}

/* Medium mobile phones */
@media screen and (max-width: 480px) {
  .flourish-iframe {
    height: 450px;
  }
}

/* Small mobile phones */
@media screen and (max-width: 375px) {
  .flourish-iframe {
    height: 400px;
  }
}

/* Extra small mobile phones */
@media screen and (max-width: 320px) {
  .flourish-iframe {
    height: 350px;
  }
}

/* Handle orientation changes for mobile devices */
@media screen and (max-height: 450px) and (orientation: landscape) {
  .flourish-iframe {
    height: 300px;
  }
}

/* Handle high-DPI screens */
@media screen and (-webkit-min-device-pixel-ratio: 2),
  screen and (min-resolution: 192dpi) {
  .flourish-iframe {
    /* Optimize for retina displays if needed */
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
  }
}

/* Ensure minimum height */
@media screen and (max-height: 600px) {
  .flourish-iframe {
    min-height: 300px;
  }
}

/* Optional: Add aspect ratio container for more consistent scaling */
.iframe-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Optional: Add print media query */
@media print {
  .flourish-iframe {
    height: 100vh;
    page-break-inside: avoid;
  }
}
</style>
