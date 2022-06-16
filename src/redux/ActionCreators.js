import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";

// Thunk returns a function to deliver staffs infor.
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  dispatch(addStaffs(STAFFS));
};

// Action objects to facilitate the thunk
export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = () => (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

// Thunk returns a function to deliver department infor.
export const fetchDepts = () => (dispatch) => {
  dispatch(deptsLoading(true));
  dispatch(addDepts(DEPARTMENTS));
};
// Action objects to facilitate the thunk
export const deptsLoading = () => ({
  type: ActionTypes.DEPTS_LOADING,
});

export const deptsFailed = () => (errmess) => ({
  type: ActionTypes.DEPTS_FAILED,
  payload: errmess,
});

export const addDepts = (departments) => ({
  type: ActionTypes.ADD_DEPTS,
  payload: departments,
});
