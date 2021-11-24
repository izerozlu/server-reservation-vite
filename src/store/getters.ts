import { State } from "./state";

import BlockTemplate from "../interfaces/block-template";

import Nullable from "../types/nullable";
import { GetterTree } from "vuex";

export type Getters = {
  isBlockSelectionActive: (state: State) => boolean;
  blockSelectionStartingBlock: (state: State) => Nullable<BlockTemplate>;
};

const isBlockSelectionActive = (state: State): boolean => {
  return state.blockSelection.active;
};

const blockSelectionStartingBlock = (state: State): Nullable<BlockTemplate> => {
  return state.blockSelection.startingBlock;
};

const getters: GetterTree<State, State> & Getters = {
  isBlockSelectionActive,
  blockSelectionStartingBlock,
};

export default getters;
