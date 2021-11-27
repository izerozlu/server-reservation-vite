import BlockTemplate from "../interfaces/block-template";
import Nullable from "../types/nullable";
import { BlockSelection } from "./block-selection/namespace";

export type State = {
  selectedDay: Nullable<number>;
  takenBlocks: BlockTemplate[];
  hoveredBlock: Nullable<BlockTemplate>;
};

export const state: State = {
  selectedDay: new Date().getDate(),
  takenBlocks: [],
  hoveredBlock: null,
};
