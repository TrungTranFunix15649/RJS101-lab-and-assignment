import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem, Dropdown } from "reactstrap";
import Menu from "./components/StaffComponent";
import "./App.css";
import { STAFFS } from "./shared/staffs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng Dụng Quản Lý Nhân Sự v1.0</NavbarBrand>
            <NavItem className="App-header">
              <a href="#">Trang Chủ</a>
              <a href="#">Danh Sách</a>
              <a href="#">Liên hệ</a>
              <Dropdown>
                <a href="#">Dịch vụ khác</a>
              </Dropdown>
            </NavItem>
          </div>
        </Navbar>
        <Menu staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;
