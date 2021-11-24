import { MutationTree } from "vuex";
import BlockTemplate from "../interfaces/block-template";
import Nullable from "../types/nullable";
import { State } from "./state";

export enum MutationTypes {
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  SET_STARTING_BLOCK = "SET_STARTING_BLOCK",
  SET_ENDING_BLOCK = "SET_ENDING_BLOCK",
  START_BLOCK_SELECTION = "START_BLOCK_SELECTION",
  END_BLOCK_SELECTION = "END_BLOCK_SELECTION",
  HOVER_BLOCK = "HOVER_BLOCK",
  TAKE_BLOCK = "TAKE_BLOCK",
}

export type Mutations = {
  [MutationTypes.SET_SELECTED_DAY]: (state: State, day: number) => void;
  [MutationTypes.SET_STARTING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => void;
  [MutationTypes.SET_ENDING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => void;
  [MutationTypes.START_BLOCK_SELECTION]: (state: State) => void;
  [MutationTypes.END_BLOCK_SELECTION]: (state: State) => void;
  [MutationTypes.HOVER_BLOCK]: (
    state: State,
    { block, isEnter }: { block: BlockTemplate; isEnter: boolean }
  ) => void;
  [MutationTypes.TAKE_BLOCK]: (state: State, block: BlockTemplate) => void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SELECTED_DAY]: (state: State, day: number) => {
    state.selectedDay = day;
  },
  [MutationTypes.SET_STARTING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => {
    state.blockSelection.startingBlock = block;
  },
  [MutationTypes.SET_ENDING_BLOCK]: (
    state: State,
    block: Nullable<BlockTemplate>
  ) => {
    state.blockSelection.endingBlock = block;
  },
  [MutationTypes.START_BLOCK_SELECTION]: (state: State) => {
    state.blockSelection.active = true;
  },
  [MutationTypes.END_BLOCK_SELECTION]: (state: State) => {
    state.blockSelection.active = false;
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
