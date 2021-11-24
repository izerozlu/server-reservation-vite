import { ActionContext, ActionTree } from "vuex";
import BlockTemplate from "../interfaces/block-template";
import { Mutations, MutationTypes } from "./mutations";
import { State } from "./state";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export enum ActionTypes {
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  START_BLOCK_SELECTION = "START_BLOCK_SELECTION",
  END_BLOCK_SELECTION = "END_BLOCK_SELECTION",
  CANCEL_BLOCK_SELECTION = "CANCEL_BLOCK_SELECTION",
  HOVER_BLOCK = "HOVER_BLOCK",
}

export type Actions = {
  [ActionTypes.SET_SELECTED_DAY](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
  [ActionTypes.START_BLOCK_SELECTION](
    { commit }: AugmentedActionContext,
    payload: BlockTemplate
  ): void;
  [ActionTypes.END_BLOCK_SELECTION](
    { commit }: AugmentedActionContext,
    payload: BlockTemplate
  ): void;
  [ActionTypes.CANCEL_BLOCK_SELECTION]({
    commit,
  }: AugmentedActionContext): void;
  [ActionTypes.HOVER_BLOCK](
    { commit }: AugmentedActionContext,
    payload: { block: BlockTemplate; isEnter: boolean }
  ): void;
};

const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_SELECTED_DAY]: ({ commit }, day: number) => {
    commit(MutationTypes.SET_SELECTED_DAY, day);
  },
  [ActionTypes.START_BLOCK_SELECTION]: ({ commit }, block: BlockTemplate) => {
    commit(MutationTypes.START_BLOCK_SELECTION);
    commit(MutationTypes.SET_STARTING_BLOCK, block);
  },
  [ActionTypes.END_BLOCK_SELECTION]: ({ commit }, block: BlockTemplate) => {
    commit(MutationTypes.END_BLOCK_SELECTION);
    commit(MutationTypes.SET_ENDING_BLOCK, block);
  },
  [ActionTypes.CANCEL_BLOCK_SELECTION]: ({ commit }) => {
    commit(MutationTypes.END_BLOCK_SELECTION);
    commit(MutationTypes.SET_STARTING_BLOCK, null);
    commit(MutationTypes.SET_ENDING_BLOCK, null);
  },
  [ActionTypes.HOVER_BLOCK]: ({ commit }, { block, isEnter }) => {
    commit(MutationTypes.HOVER_BLOCK, { block, isEnter });
  },
};

export default actions;
