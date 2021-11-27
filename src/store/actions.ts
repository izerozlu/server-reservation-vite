import { ActionTree } from "vuex";
import BlockTemplate from "../interfaces/block-template";
import { AugmentedActionContext } from "../types/augmented-action-context";
import { Mutations, MutationTypes } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  SET_SELECTED_DAY = "SET_SELECTED_DAY",
  HOVER_BLOCK = "HOVER_BLOCK",
}

export type Actions = {
  [ActionTypes.SET_SELECTED_DAY](
    { commit }: AugmentedActionContext<State, Mutations>,
    payload: number
  ): void;
  [ActionTypes.HOVER_BLOCK](
    { commit }: AugmentedActionContext<State, Mutations>,
    payload: { block: BlockTemplate; isEnter: boolean }
  ): void;
};

const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_SELECTED_DAY]: ({ commit }, day: number) => {
    commit(MutationTypes.SET_SELECTED_DAY, day);
  },
  [ActionTypes.HOVER_BLOCK]: ({ commit }, { block, isEnter }) => {
    commit(MutationTypes.HOVER_BLOCK, { block, isEnter });
  },
};

export default actions;
