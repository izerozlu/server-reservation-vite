import { acceptHMRUpdate, defineStore } from "pinia";
import BlockTemplate from "../../interfaces/block-template";
import Nullable from "../../types/nullable";

export const useBlockSelectionStore = defineStore("block-selection", {
  state: () => ({
    active: false,
    startingBlock: null as Nullable<BlockTemplate>,
    endingBlock: null as Nullable<BlockTemplate>,
  }),
  actions: {
    startBlockSelection(block: BlockTemplate) {
      this.active = true;
      this.startingBlock = block;
      this.endingBlock = null;
    },
    endBlockSelection(block: BlockTemplate) {
      this.active = false;
      this.endingBlock = block;
    },
    cancelBlockSelection() {
      this.active = false;
      this.startingBlock = null;
      this.endingBlock = null;
    },
  },
});