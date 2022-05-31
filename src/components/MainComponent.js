import React, { Component } from "react";

import StaffList from "./StaffComponent";
import Contact from "./ContactComponent";
import StaffDetail from "./StaffdetailComponent";
import About from "./AboutComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { STAFFS } from "../shared/staffs";
import { DEPARTMENTS } from "../shared/staffs";
import { ROLE } from "../shared/staffs";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
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
            component={() => <StaffList staffs={this.state.staffs} />}
          />
          <Route path="/staffs/:id" component={StaffWithID} />
          {/* <Route exact path="/departments" component={departments} />
          <Route exact path="/payslip" component={Payslip} /> */}
          <Route
            exact
            path="/contactus"
            component={() => <Contact leaders={this.state.leaders} />}
          />
          <Redirect to="/staffs" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
