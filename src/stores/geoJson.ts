import { defineStore } from "pinia";
import type { FeatureCollection, Feature } from "geojson";

export const useGeoJsonStore = defineStore("geoJson", {
  state: () => {
    return {
      CountryGeoJson: {} as FeatureCollection,
      province1GeoJson: {} as Feature,
      province2GeoJson: {} as Feature,
      province3GeoJson: {} as Feature,
      province4GeoJson: {} as Feature,
      province5GeoJson: {} as Feature,
      province6GeoJson: {} as Feature,
      province7GeoJson: {} as Feature,
    };
  },
  actions: {
    async fetchCountryGeoJson(path: string) {
      try {
        const response = await fetch(path);
        let countryGeoJson = (await response.json()) as FeatureCollection;
        this.CountryGeoJson = countryGeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince1GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province1GeoJson = (await response.json()) as Feature;
        this.province1GeoJson = province1GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince2GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province2GeoJson = (await response.json()) as Feature;
        this.province2GeoJson = province2GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince3GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province3GeoJson = (await response.json()) as Feature;
        this.province3GeoJson = province3GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince4GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province4GeoJson = (await response.json()) as Feature;
        this.province4GeoJson = province4GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince5GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province5GeoJson = (await response.json()) as Feature;
        this.province5GeoJson = province5GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince6GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province6GeoJson = (await response.json()) as Feature;
        this.province6GeoJson = province6GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
    async fetchProvince7GeoJson(path: string) {
      try {
        const response = await fetch(path);
        let province7GeoJson = (await response.json()) as Feature;
        this.province7GeoJson = province7GeoJson;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    },
  },
});
