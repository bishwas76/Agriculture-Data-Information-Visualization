<template>
  <div class="">
    <div ref="mapTarget" id="map" class="map-container"></div>
    <div id="mapTitle" class="map-title ol-unselectable ol-control">
      <div class="title-container">
        <span class="text-h6" style="color: black"
          >Cereal Production in Nepal By Province (2079/80)</span
        >
      </div>
    </div>
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
    <div id="mapLegend" class="legend ol-unselectable ol-control">
      <div class="color-scale">
        <div class="scale-labels">
          <span>0</span>
          <span
            >{{ getMaxValue(cerealProductionData, "cerealProduction") }} metric
            tons</span
          >
        </div>
        <div class="color-gradient"></div>
      </div>
    </div>
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
import { useGeoJsonStore } from "@/stores/geoJson";
import { useCollectedDataStore } from "@/stores/collectedData";
import GeoJSON from "ol/format/GeoJSON";
import {
  accordingToDataStyleSetter,
  getMaxValue,
} from "@/utils/helper.utils.ts";

const $q = useQuasar();
const collectedDataStore = useCollectedDataStore();
const geoJsonStore = useGeoJsonStore();

const mapTarget: Ref<InstanceType<typeof Element> | undefined> = ref(undefined);
const showMapTypeOption = ref(false);
const mapTypeOptionValue: Ref<string> = ref("OSM Map");
const mapTypeRef: Ref<InstanceType<typeof Element> | undefined> =
  ref(undefined);

const mapTypeOptions = [
  { label: "No Base Map", value: "No Base Map" },
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
  if (mapTypeOptionValue.value === "OSM Map") {
    osmLayer.setVisible(true);
    bingLayer.setVisible(false);
  } else if (mapTypeOptionValue.value === "Satellite Map") {
    bingLayer.setVisible(true);
    osmLayer.setVisible(false);
  } else {
    bingLayer.setVisible(false);
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

const countryGeojsonData = computed(() => {
  return geoJsonStore.CountryGeoJson;
});

const cerealProductionData = computed(() => {
  return collectedDataStore.CerealProduction;
});

const getCerealProductionDataByProvinceId = (id: number) => {
  return cerealProductionData.value.find(
    (data: { id: number; state: string; cerealProduction: number }) =>
      data.id === id
  );
};
const addCerealProdctionPropertiesToFeatures = (
  features: any[],
  provinceId: number
) => {
  features.forEach((feature) => {
    const productionData = getCerealProductionDataByProvinceId(provinceId);
    if (productionData) {
      feature.setProperties({
        cerealProduction: productionData.cerealProduction,
      });
    }
  });
};

let map = new Map();

const InitializeMap = () => {
  const countrySource = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(countryGeojsonData.value);
      return feature;
    })(),
  });
  const countryVectorLayer = new VectorLayer({
    source: countrySource,
    style: new Style({
      stroke: new Stroke({
        color: "black",
        width: 3,
      }),
    }),
  });
  countryVectorLayer.set("id", "countryLayer");

  const provice1Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province1GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 1);
      return feature;
    })(),
  });
  const province1VectorLayer = new VectorLayer({
    source: provice1Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province1VectorLayer.set("id", "province1Layer");

  const provice2Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province2GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 2);
      return feature;
    })(),
  });
  const province2VectorLayer = new VectorLayer({
    source: provice2Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province2VectorLayer.set("id", "province2Layer");

  const provice3Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province3GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 3);
      return feature;
    })(),
  });
  const province3VectorLayer = new VectorLayer({
    source: provice3Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province3VectorLayer.set("id", "province3Layer");

  const provice4Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province4GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 4);
      return feature;
    })(),
  });
  const province4VectorLayer = new VectorLayer({
    source: provice4Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province4VectorLayer.set("id", "province4Layer");

  const provice5Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province5GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 5);
      return feature;
    })(),
  });
  const province5VectorLayer = new VectorLayer({
    source: provice5Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province5VectorLayer.set("id", "province5Layer");

  const provice6Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province6GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 6);
      return feature;
    })(),
  });
  const province6VectorLayer = new VectorLayer({
    source: provice6Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });
  province6VectorLayer.set("id", "province6Layer");

  const provice7Source = new VectorSource({
    features: (() => {
      const feature = new GeoJSON().readFeatures(geoJsonStore.province7GeoJson);
      addCerealProdctionPropertiesToFeatures(feature, 7);
      return feature;
    })(),
  });
  const province7VectorLayer = new VectorLayer({
    source: provice7Source,
    style: function (feature) {
      let style = accordingToDataStyleSetter(
        feature,
        cerealProductionData.value,
        "cerealProduction"
      );
      return style;
    },
  });

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
  osm.setVisible(true);

  const bing = new TileLayer({
    visible: false,
    source: new BingMaps({
      key: "ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp",
      imagerySet: "AerialWithLabels",
    }),
    zIndex: -1,
  });
  bing.set("id", "bing layer");
  bing.setVisible(false);

  const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(7),
    projection: "EPSG:4326",
  });

  const layers = [
    osm,
    bing,
    countryVectorLayer,
    province1VectorLayer,
    province2VectorLayer,
    province3VectorLayer,
    province4VectorLayer,
    province5VectorLayer,
    province6VectorLayer,
    province7VectorLayer,
  ];
  map = new Map({
    //     overlays: [overlay],
    // controls: defaultControls().extend([mousePositionControl]),
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
  map.addControl(
    new Control({
      element: document.getElementById("mapLegend") as HTMLElement,
    })
  );
  map.addControl(
    new Control({
      element: document.getElementById("mapTitle") as HTMLElement,
    })
  );
};

onMounted(() => {
  document.addEventListener("click", closeMaptypeSelect);
});

onMounted(async () => {
  await geoJsonStore.fetchCountryGeoJson(
    "src/assets/country_geojson/country.geojson"
  );
  await geoJsonStore.fetchProvince1GeoJson(
    "src/assets/province_geojsons/Province-1.geojson"
  );
  await geoJsonStore.fetchProvince2GeoJson(
    "src/assets/province_geojsons/Province-2.geojson"
  );
  await geoJsonStore.fetchProvince3GeoJson(
    "src/assets/province_geojsons/Province-3.geojson"
  );
  await geoJsonStore.fetchProvince4GeoJson(
    "src/assets/province_geojsons/Province-4.geojson"
  );
  await geoJsonStore.fetchProvince5GeoJson(
    "src/assets/province_geojsons/Province-5.geojson"
  );
  await geoJsonStore.fetchProvince6GeoJson(
    "src/assets/province_geojsons/Province-6.geojson"
  );
  await geoJsonStore.fetchProvince7GeoJson(
    "src/assets/province_geojsons/Province-7.geojson"
  );
  await collectedDataStore.fetchCerealProduction(
    "src/assets/labels/cereal_production_year_78_79.csv"
  );
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
  height: calc(100vh - 390px);
}

:deep(.color-scale) {
  margin-top: 10px;
}

:deep(.color-gradient) {
  padding: 15px;
  width: 400px;
  border-radius: 3px;
  background: linear-gradient(to right, rgb(255, 255, 255), rgb(19, 87, 10));
  border: 1px solid #ccc;
}

:deep(.scale-labels) {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  color: black;
}
:deep(.info) {
  top: 0.5em;
  right: 1em;
}
:deep(.legend) {
  top: 35em;
  left: 1em;
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

:deep(.map-title) {
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 8px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.title-container) {
  text-align: center;
}

:deep(.title-container .text-h6) {
  color: var(--q-primary);
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
}

@media (max-width: 768px) {
  :deep(.map-title) {
    width: 90%;

    .text-h6 {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  :deep(.map-title) {
    padding: 6px 12px;

    .text-h6 {
      font-size: 0.9rem;
    }
  }
}
</style>
