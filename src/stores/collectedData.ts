import { defineStore } from "pinia";

export const useCollectedDataStore = defineStore("collectedData", {
  state: () => {
    return {
      CerealProduction: [] as {
        id: number;
        state: string;
        cerealProduction: number;
      }[],
    };
  },
  actions: {
    async fetchCerealProduction(path: string) {
      try {
        await fetch(path)
          .then((response) => response.text())
          .then((data) => {
            let result = data.split("\n");
            result.forEach((row) => {
              console.log("i going in");
              if (row.trim()) {
                const [id, state, production] = row.split(",");
                const cerealProduction = {
                  id: parseInt(id),
                  state: state,
                  cerealProduction: parseInt(production),
                };
                this.CerealProduction.push(cerealProduction);
              }
            });
          });
      } catch (error) {
        console.error("Error loading Cereal Production Data:", error);
      }
    },
  },
});
