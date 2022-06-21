import React, { Component } from "react";

import StaffList from "./StaffComponent";
import Contact from "./ContactComponent";
import StaffDetail from "./StaffdetailComponent";
import DeptList from "./DeptComponent";
import DeptDetail from "./DeptDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Payslip from "./PayslipComponent";
// import { STAFFS } from "../shared/staffs";
// import { DEPARTMENTS } from "../shared/staffs";
import {
  postStaff,
  fetchStaffs,
  fetchDepts,
  fetchSalary,
  deleteStaff,
  editStaff,
} from "../redux/ActionCreators";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  TransitionGroup,
  CSSTransition,
  Transition,
} from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffssalary: state.staffssalary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepts: () => {
    dispatch(fetchDepts());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  editStaff: (staff) => {
    dispatch(editStaff(staff));
  },
  postStaff: (
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime
  ) =>
    dispatch(
      postStaff(
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime
      )
    ),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepts();
    this.props.fetchSalary();
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0] || []
          }
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          editStaff={this.props.editStaff}
        />
      );
    };

    const DeptWithID = ({ match }) => {
      return (
        <DeptDetail
          dept={
            this.props.departments.departments.filter(
              (dept) => dept.id === match.params.id
            )[0] || []
          }
          isLoading={this.props.departments.isLoading}
          errMess={this.props.departments.errMess}
          staffs={this.props.staffs.staffs}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                exact
                path="/staffs"
                component={() => (
                  <StaffList
                    staffs={this.props.staffs.staffs}
                    staffsLoading={this.props.staffs.isLoading}
                    staffsErrMess={this.props.staffs.errMess}
                    postStaff={this.props.postStaff}
                    deleteStaff={this.props.deleteStaff}
                  />
                )}
              />
              <Route path="/staffs/:id" component={StaffWithID} />

              <Route
                path="/payslip"
                component={() => (
                  <Payslip
                    staffssalary={this.props.staffssalary.staffssalary}
                    salLoading={this.props.staffssalary.isLoading}
                    salErrMess={this.props.staffssalary.errMess}
                    departments={this.props.departments.departments}
                  />
                )}
              />
              <Route
                exact
                path="/departments"
                component={() => (
                  <DeptList
                    depts={this.props.departments.departments}
                    deptsLoading={this.props.departments.isLoading}
                    deptsErrMess={this.props.departments.errMess}
                  />
                )}
              />
              <Route path="/departments/:id" component={DeptWithID} />
              <Route exact path="/contactus" component={() => <Contact />} />
              <Redirect to="/staffs" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
