import * as ActionTypes from "./ActionTypes";

export const Departments = (
  state = {
    isLoading: true,
    errMess: null,
    departments: [],
  },
  action
) => {
  //Switch btween 3 different action types
  switch (action.type) {
    case ActionTypes.ADD_DEPTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        departments: action.payload,
      };

    case ActionTypes.DEPTS_LOADING:
      return { ...state, isLoading: true, errMess: null, departments: [] };

    case ActionTypes.DEPTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        departments: [],
      };

    default:
      return state;
  }
};
