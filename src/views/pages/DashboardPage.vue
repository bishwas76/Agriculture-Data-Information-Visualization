<template>
  <div class="">
    <div ref="mapTarget" id="map"></div>
    <div id="mapControls" class="info ol-unselectable ol-control">
      <div id="fullScreenControl">
        <div>
          <button @click="fullscreenToggle()" class="infoButton">
            <q-icon
              :name="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            ></q-icon>
          </button>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[5, 5]"
            style="font-size: 10px"
          >
            {{ $q.fullscreen.isActive ? "Exit Fullscreen" : "Go Fullscreen" }}
          </q-tooltip>
        </div>
      </div>
      <div id="mapType">
        <div
          v-show="showMapTypeOption"
          class="map_type_info ol-unselectable ol-control"
        >
          <div id="mapTypeOptionId" class="mapTypeOptionStyle">
            <q-option-group
              size="xs"
              :options="mapTypeOptions"
              type="radio"
              v-model="mapTypeOptionValue"
              @update:model-value="handleMapTypeSelect()"
            />
          </div>
        </div>
        <div>
          <button
            ref="mapTypeRef"
            class="infoButton"
            @click="showMapTypeOptions()"
          >
            <i class="fa fa-map"></i>
          </button>
          <q-tooltip
            anchor="center right"
            self="center left"
            :offset="[5, 5]"
            style="font-size: 10px"
          >
            Map Type
          </q-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount, ref, type Ref } from "vue";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { BingMaps, TileWMS, Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import {
  defaults as defaultControls,
  Control,
  MousePosition,
} from "ol/control";
import { Fill, Stroke, Style, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import type { Color } from "ol/color";
import { boundingExtent, type Extent } from "ol/extent";
import { useQuasar } from "quasar";
import { createStringXY } from "ol/coordinate";

const $q = useQuasar();

const mapTarget: Ref<InstanceType<typeof Element> | undefined> = ref(undefined);
const showMapTypeOption = ref(false);
const mapTypeOptionValue: Ref<string> = ref("OSM Map");
const mapTypeRef: Ref<InstanceType<typeof Element> | undefined> =
  ref(undefined);

const mapTypeOptions = [
  { label: "OSM Map", value: "OSM Map" },
  { label: "Satellite Map", value: "Satellite Map" },
];

const handleMapTypeSelect = () => {
  const bingLayer = map
    .getLayers()
    .getArray()
    .find((x) => x.get("id") == "bing layer") as any;
  const osmLayer = map
    .getLayers()
    .getArray()
    .find((x) => x.get("id") == "osm layer") as any;
  if (mapTypeOptionValue.value == "OSM Map") {
    osmLayer.setVisible(true);
    bingLayer.setVisible(false);
  } else if (mapTypeOptionValue.value == "Satellite Map") {
    bingLayer.setVisible(true);
    osmLayer.setVisible(false);
  }
};

const showMapTypeOptions = () => {
  showMapTypeOption.value = !showMapTypeOption.value;
};

const closeMaptypeSelect = (event: any) => {
  if (!mapTypeRef.value?.contains(event.target)) {
    showMapTypeOption.value = false;
  }
};

let requestId = 0;

function updateMapSize() {
  map.updateSize();
  requestId = requestAnimationFrame(updateMapSize);
}

function stopUpdateAnimation() {
  cancelAnimationFrame(requestId);
}

const fullscreenToggle = async () => {
  const target = mapTarget.value;
  await $q.fullscreen.toggle(target);
  setTimeout(() => {
    updateMapSize();
  }, 300);

  setTimeout(() => {
    stopUpdateAnimation();
  }, 600);
};

let map = new Map();

const InitializeMap = () => {
  const view = new View({
    projection: "EPSG:4326",
    center: [0, 0],
    zoom: 1,
  });

  const osm = new TileLayer({
    visible: true,
    source: new OSM(),
  });
  osm.set("id", "osm layer");

  const bing = new TileLayer({
    visible: false,
    source: new BingMaps({
      key: "ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp",
      imagerySet: "AerialWithLabels",
    }),
    zIndex: -1,
  });
  bing.set("id", "bing layer");

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(7),
    projection: "EPSG:4326",
  });

  const layers = [osm, bing];
  map = new Map({
    //     overlays: [overlay],
    controls: defaultControls().extend([mousePositionControl]),
    target: "map",
    layers: layers,
    view: view,
  });

  map
    .getView()
    .fit(
      [
        80.05847091048092, 26.347819010499133, 88.20153939672268,
        30.473013641571082,
      ],
      { padding: [20, 20, 20, 20] }
    );

  map.addControl(
    new Control({
      element: document.getElementById("mapControls") as HTMLElement,
    })
  );
};

onMounted(() => {
  document.addEventListener("click", closeMaptypeSelect);
});

onMounted(() => {
  InitializeMap();
});

onBeforeUnmount(() => {
  map.dispose();
});
</script>
<style scoped>
#map {
  width: 100%;
  border: 1px solid #dadada;
  border-radius: 3px;
  height: calc(100vh - 69px);
}
:deep(.info) {
  top: 0.5em;
  right: 1em;
}
:deep(.infoButton) {
  font-size: large;
  border: 0;
  border-radius: 3px;
  background-color: #44ba45;
  color: white;
}

:deep(.infoButton:hover) {
  color: white;
}

:deep(.ol-control) {
  background-color: rgba(255, 255, 255, 0.322);
  padding: 1.5px;
}

:deep(.ol-control button:focus) {
  color: white;
}

:deep(.ol-full-screen-false) {
  border: 0;
  background-color: #44ba45;
  color: white;
}
:deep(.ol-full-screen-true) {
  border: 0;
  background-color: #44ba45;
  color: white;
}
:deep(.ol-full-screen-true:hover) {
  color: white;
}
:deep(.ol-full-screen-true:focus) {
  color: white;
}

:deep(.ol-zoom > .ol-zoom-in) {
  border: 0;
  background-color: #44ba45;
  color: white;
  font-size: large;
}

:deep(.ol-zoom > .ol-zoom-out) {
  border: 0;
  background-color: #44ba45;
  color: white;
  font-size: large;
}

:deep(.ol-zoom > .ol-zoom-out:hover) {
  color: white;
}
:deep(.ol-zoom-in:hover) {
  color: white;
}

:deep(.ol-full-screen-false:hover) {
  color: white;
}
:deep(.ol-full-screen-false:focus) {
  color: white;
}

:deep(.mapType) {
  top: 0.5em;
  right: 2.5em;
}
:deep(.mapTypeSelect) {
  height: 1.9em;
  font-size: medium;
  text-align: center;
  font-weight: bold;
  border: 0;
  border-radius: 3px;
  background-color: #44ba45;
  color: white;
}
:deep(.ol-mouse-position) {
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  top: 1em;
  font-size: 16px;
  font-weight: bold;
  text-shadow: -1px 0 4px white, 0 1px 4px white, 1px 0 4px white,
    0 -1px 4px white;
}
.mapTypeOptionStyle {
  width: 12em;
  text-align: left;
  border: 0;
  border-radius: 3px;
  background-color: white;
  padding: 3px;
}
.map_type_info {
  position: absolute;
  top: 1.6em;
  right: 2em;
}
</style>
