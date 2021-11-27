import { MutationTree } from "vuex";
import BlockTemplate from "../../interfaces/block-template";
import Nullable from "../../types/nullable";
import { BlockSelection } from "./namespace";

const mutations: MutationTree<BlockSelection.State> = {
  [BlockSelection.MutationTypes.SET_STARTING_BLOCK]: (
    state: BlockSelection.State,
    block: Nullable<BlockTemplate>
  ) => {
    state.startingBlock = block;
  },
  [BlockSelection.MutationTypes.SET_ENDING_BLOCK]: (
    state: BlockSelection.State,
    block: Nullable<BlockTemplate>
  ) => {
    state.endingBlock = block;
  },
  [BlockSelection.MutationTypes.START_BLOCK_SELECTION]: (
    state: BlockSelection.State
  ) => {
    state.active = true;
  },
  [BlockSelection.MutationTypes.END_BLOCK_SELECTION]: (
    state: BlockSelection.State
  ) => {
    state.active = false;
  },
};

export default mutations;
