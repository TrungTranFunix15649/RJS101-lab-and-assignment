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

export const fetchSalary = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffsSalary")
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
    .then((staffssalary) => dispatch(addSalary(staffssalary)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

// Action objects to facilitate the thunk
export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});

export const salaryFailed = () => (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});

export const addSalary = (staffssalary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: staffssalary,
});

// Add new staff
export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      departmentId: departmentId,
      startDate: startDate,
      salaryScale: salaryScale,
      overTime: overTime,
      annualLeave: annualLeave,
      image: "/assets/images/alberto.png",
      salary: salaryScale * 3000000 + overTime * 200000,
    };
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
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
      .then((response) => dispatch(addStaff(response)))
      .catch((error) => {
        console.log("Post staff ", error.message);
        alert("Your staff could not be added. Error: " + error.message);
      });
  };

//Delete a staff
export const updateStaff = (staffs) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staffs,
});
export const deleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + `staffs/${id}`, {
    method: "DELETE",
    header: { "Content-Type": "application/json" },
  })
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
    .then((response) => dispatch(updateStaff(response)))
    .catch((error) => {
      console.log("Delete a staff ", error.message);
      alert("Your staff could not be deleted. Error: " + error.message);
    });
};

// edit staff
export const editStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staff),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
  })
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
    .then((response) => dispatch(updateStaff(response)))
    .catch((error) => {
      console.log("Edit a staff ", error.message);
      alert("Your staff could not be edited. Error: " + error.message);
    });
};
