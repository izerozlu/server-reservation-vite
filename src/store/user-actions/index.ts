import { defineStore } from "pinia";
import BlockType from "~/types/block-type";
import Nullable from "~/types/utility/nullable";
import useBlockSelectionStore from "../block-selection";

const useUserActionsStore = defineStore("user-actions", {
  state: () => ({
    selectedDay: new Date().getDay() as Nullable<number>,
    takenBlocks: [] as BlockType[],
    hoveredBlock: null as Nullable<BlockType>,
  }),
  getters: {
    humanReadableSelectedDay: (state) => {
      const humanReadableDays = [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];

      return state.selectedDay
        ? humanReadableDays[state.selectedDay]
        : "Not Selected";
    },
  },
  actions: {
    setSelectedDay(day: number) {
      this.selectedDay = day;
    },
    hoverBlock(block: Nullable<BlockType>) {
      this.hoveredBlock = block;
    },
  },
});

export default useUserActionsStore;
