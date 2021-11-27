import { ActionTree } from "vuex";
import BlockTemplate from "../../interfaces/block-template";
import { BlockSelection } from "./namespace";

const actions: ActionTree<BlockSelection.State, BlockSelection.State> &
  BlockSelection.Actions = {
  [BlockSelection.ActionTypes.START_BLOCK_SELECTION]: (
    { commit },
    block: BlockTemplate
  ) => {
    commit(BlockSelection.MutationTypes.START_BLOCK_SELECTION);
    commit(BlockSelection.MutationTypes.SET_STARTING_BLOCK, block);
    commit(BlockSelection.MutationTypes.SET_ENDING_BLOCK, null);
  },
  [BlockSelection.ActionTypes.END_BLOCK_SELECTION]: (
    { commit },
    block: BlockTemplate
  ) => {
    commit(BlockSelection.MutationTypes.END_BLOCK_SELECTION);
    commit(BlockSelection.MutationTypes.SET_ENDING_BLOCK, block);
  },
  [BlockSelection.ActionTypes.CANCEL_BLOCK_SELECTION]: ({ commit }) => {
    commit(BlockSelection.MutationTypes.END_BLOCK_SELECTION);
    commit(BlockSelection.MutationTypes.SET_STARTING_BLOCK, null);
    commit(BlockSelection.MutationTypes.SET_ENDING_BLOCK, null);
  },
};

export default actions;
