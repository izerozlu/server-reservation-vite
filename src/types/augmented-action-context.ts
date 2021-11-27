import { ActionContext } from "vuex";

export type AugmentedActionContext<
  State,
  Mutations extends Record<string, (...args: any) => any>
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;
