import BlockTemplate from "../../interfaces/block-template";
import { AugmentedActionContext } from "../../types/augmented-action-context";
import Nullable from "../../types/nullable";

export namespace BlockSelection {
  export type State = {
    active: boolean;
    startingBlock: Nullable<BlockTemplate>;
    endingBlock: Nullable<BlockTemplate>;
  };

  export enum MutationTypes {
    START_BLOCK_SELECTION = "START_BLOCK_SELECTION",
    END_BLOCK_SELECTION = "END_BLOCK_SELECTION",
    SET_STARTING_BLOCK = "SET_STARTING_BLOCK",
    SET_ENDING_BLOCK = "SET_ENDING_BLOCK",
  }

  export type Mutations = {
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
  };

  export enum ActionTypes {
    START_BLOCK_SELECTION = "START_BLOCK_SELECTION",
    END_BLOCK_SELECTION = "END_BLOCK_SELECTION",
    CANCEL_BLOCK_SELECTION = "CANCEL_BLOCK_SELECTION",
  }

  export type Actions = {
    [ActionTypes.START_BLOCK_SELECTION](
      { commit }: AugmentedActionContext<State, Mutations>,
      payload: BlockTemplate
    ): void;
    [ActionTypes.END_BLOCK_SELECTION](
      { commit }: AugmentedActionContext<State, Mutations>,
      payload: BlockTemplate
    ): void;
    [ActionTypes.CANCEL_BLOCK_SELECTION]({
      commit,
    }: AugmentedActionContext<State, Mutations>): void;
  };
}
