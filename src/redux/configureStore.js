import { createStore } from "redux"; //allow to create redux store
import { Reducer, initialState } from "./reducer";

export const ConfigureStore = () => {
  const store = createStore(Reducer, initialState);
  return store;
};
