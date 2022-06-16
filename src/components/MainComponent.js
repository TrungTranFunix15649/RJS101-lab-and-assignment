import React, { Component } from "react";

import StaffList from "./StaffComponent";
import Contact from "./ContactComponent";
import StaffDetail from "./StaffdetailComponent";
import DeptList from "./DeptComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Payslip from "./PayslipComponent";
// import { STAFFS } from "../shared/staffs";
// import { DEPARTMENTS } from "../shared/staffs";
import { addStaffs, fetchStaffs, fetchDepts } from "../redux/ActionCreators";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },
  fetchDepts: () => {
    dispatch(fetchDepts());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepts();
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
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staffs"
            component={() => (
              <StaffList
                staffs={this.props.staffs.staffs}
                staffsLoading={this.props.staffs.isLoading}
                staffsErrMess={this.props.staffs.errMess}
              />
            )}
          />
          <Route path="/staffs/:id" component={StaffWithID} />

          <Route
            path="/payslip"
            component={() => <Payslip staffs={this.props.staffs.staffs} />}
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

          <Route exact path="/contactus" component={() => <Contact />} />
          <Redirect to="/staffs" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
