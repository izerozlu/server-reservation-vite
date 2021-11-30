import { defineStore } from "pinia";
import BlockTemplate from "../../interfaces/block-template";
import Nullable from "../../types/nullable";

const useUserActionsStore = defineStore("user-actions", {
  state: () => ({
    selectedDay: new Date().getDay() as Nullable<number>,
    takenBlocks: [] as BlockTemplate[],
    hoveredBlock: null as Nullable<BlockTemplate>,
  }),
  actions: {
    setSelectedDay(day: number) {
      this.selectedDay = day;
    },
    hoverBlock({ block }: { block: Nullable<BlockTemplate> }) {
      this.hoveredBlock = block;
    },
  },
});

export default useUserActionsStore;
