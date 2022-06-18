import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import { Departments } from "./departments";
import { StaffsSalary } from "./salary";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      staffssalary: StaffsSalary,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
