import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// Thunk returns a function to deliver staffs infor.
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
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
  return fetch(baseUrl + "departments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((departments) => dispatch(addDepts(departments)))
    .catch((error) => dispatch(deptsFailed(error.message)));
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
