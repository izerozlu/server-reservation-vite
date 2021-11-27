import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";
import actions, { Actions } from "./actions";
import blockSelection from "./block-selection";
import getters, { Getters } from "./getters";
import mutations, { Mutations } from "./mutations";
import { state, State } from "./state";

// TODO [ozlui] create a namespace for the root store

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const store = createStore({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    blockSelection,
  },
});

export const useStore = () => {
  return store as Store;
};
