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

import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   staffs: STAFFS,
    //   departments: DEPARTMENTS,
    // };
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
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
            component={() => <StaffList staffs={this.props.staffs} />}
          />
          <Route path="/staffs/:id" component={StaffWithID} />

          <Route
            path="/payslip"
            component={() => <Payslip staffs={this.props.staffs} />}
          />
          <Route
            exact
            path="/departments"
            component={() => <DeptList depts={this.props.departments} />}
          />

          <Route
            exact
            path="/contactus"
            component={() => <Contact leaders={this.props.leaders} />}
          />
          <Redirect to="/staffs" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
