// import { DISHES } from "../shared/dishes"; // NO longer needed bcs of thunk
import * as ActionTypes from "./ActionTypes";

export const Dishes = (
  state = {
    isLoading: true, //dishes empty,when obtain dishes from server will be set to false
    errMess: null, //when dishes failed to be load, it will receive a message from server
    dishes: [], //need to be loaded from somewhere
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      };
    default:
      return state;
  }
};
