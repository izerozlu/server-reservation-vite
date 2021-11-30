import { acceptHMRUpdate, defineStore } from "pinia";
import BlockType from "../../types/block-type";
import Nullable from "../../types/utility/nullable";

const useBlockSelectionStore = defineStore("block-selection", {
  state: () => ({
    active: false,
    startingBlock: null as Nullable<BlockType>,
    endingBlock: null as Nullable<BlockType>,
  }),
  actions: {
    startBlockSelection(block: BlockType) {
      this.active = true;
      this.startingBlock = block;
      this.endingBlock = null;
    },
    endBlockSelection(block: BlockType) {
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

export default useBlockSelectionStore;
