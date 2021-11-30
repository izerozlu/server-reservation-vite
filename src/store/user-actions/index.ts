import { defineStore } from "pinia";
import BlockType from "../../types/block-type";
import Nullable from "../../types/utility/nullable";

const useUserActionsStore = defineStore("user-actions", {
  state: () => ({
    selectedDay: new Date().getDay() as Nullable<number>,
    takenBlocks: [] as BlockType[],
    hoveredBlock: null as Nullable<BlockType>,
  }),
  actions: {
    setSelectedDay(day: number) {
      this.selectedDay = day;
    },
    hoverBlock({ block }: { block: Nullable<BlockType> }) {
      this.hoveredBlock = block;
    },
  },
});

export default useUserActionsStore;
