import * as ActionTypes from "./ActionTypes";

export const StaffsSalary = (
  state = {
    isLoading: true,
    errMess: null,
    staffssalary: [],
  },
  action
) => {
  //Switch btween 3 different action types
  switch (action.type) {
    case ActionTypes.ADD_SALARY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffssalary: action.payload,
      };

    case ActionTypes.SALARY_LOADING:
      return { ...state, isLoading: true, errMess: null, staffssalary: [] };

    case ActionTypes.SALARY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffssalary: [],
      };

    default:
      return state;
  }
};
