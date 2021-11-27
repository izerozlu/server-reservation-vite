import { State } from "./state";

import BlockTemplate from "../interfaces/block-template";

import Nullable from "../types/nullable";
import { GetterTree } from "vuex";

export type Getters = {};

const getters: GetterTree<State, State> & Getters = {};

export default getters;
