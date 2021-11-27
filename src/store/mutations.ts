import { MutationTree } from "vuex";
import BlockTemplate from "../interfaces/block-template";
import Nullable from "../types/nullable";
import { State } from "./state";

export enum MutationTypes {
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  SET_ENDING_BLOCK = "SET_ENDING_BLOCK",
  HOVER_BLOCK = "HOVER_BLOCK",
  TAKE_BLOCK = "TAKE_BLOCK",
}

export type Mutations = {
  [MutationTypes.SET_SELECTED_DAY]: (state: State, day: number) => void;
  [MutationTypes.SET_ENDING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => void;
  [MutationTypes.HOVER_BLOCK]: (
    state: State,
    { block, isEnter }: { block: BlockTemplate; isEnter: boolean }
  ) => void;
  [MutationTypes.TAKE_BLOCK]: (state: State, block: BlockTemplate) => void;
};

// TODO [ozlui] remove this export
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SELECTED_DAY]: (state: State, day: number) => {
    state.selectedDay = day;
  },
  [MutationTypes.SET_ENDING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => {
    state.blockSelection.endingBlock = block;
  },
  [MutationTypes.HOVER_BLOCK]: (
    state: State,
    { block, isEnter }: { block: BlockTemplate; isEnter: boolean }
  ) => {
    state.hoveredBlock = isEnter ? block : null;
  },
  [MutationTypes.TAKE_BLOCK]: (state: State, block: BlockTemplate) => {
    block.isTaken = true;
    state.takenBlocks = [...state.takenBlocks, block];
  },
};

export default mutations;
