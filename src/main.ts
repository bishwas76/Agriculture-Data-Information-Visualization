import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, AppFullscreen } from "quasar";

import App from "./App.vue";
import router from "./router";
import VueGoogleCharts from "vue-google-charts";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGoogleCharts);
app.use(Quasar, {
  plugins: { AppFullscreen },
});

app.mount("#app");
