import BlockTemplate from "../interfaces/block-template";
import Nullable from "../types/nullable";

export type State = {
  selectedDay: Nullable<number>;
  takenBlocks: BlockTemplate[];
  hoveredBlock: Nullable<BlockTemplate>;
  blockSelection: {
    active: boolean;
    startingBlock: Nullable<BlockTemplate>;
    endingBlock: Nullable<BlockTemplate>;
  };
};

export const state = {
  selectedDay: new Date().getDate(),
  takenBlocks: [],
  hoveredBlock: null,
  blockSelection: {
    active: false,
    startingBlock: null,
    endingBlock: null,
  },
};
