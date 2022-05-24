import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { STAFFS } from "../shared/staffs";
// import { DEPARTMENTS } from "../shared/staffs";
import dateFormat from "dateformat";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.staffs = STAFFS;
    this.state = {
      selectedStaff: null,
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div>
          <Card>
            <CardHeader>Họ và Tên: {staff.name}</CardHeader>
            <CardBody>
              <div className="CardBody">
                <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
                <p>
                  Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                </p>
                <p>Phòng ban: {staff.department.name}</p>
                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staff.overTime}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const menu = this.props.staffs.map((staff) => {
      return (
        <div
          key={staff.id}
          className="col-12 col-md-5 col-lg-4"
          id={this.state.displayEl}
        >
          <Card onClick={() => this.onStaffSelect(staff)}>
            <p>{staff.name}</p>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row m-4" id="staff-show">
          {this.renderStaff(this.state.selectedStaff)}
        </div>
        <p>Bấm vào tên nhân viên để xem thông tin</p>
        <form className="input-col">
          <label>Nhập số cột muốn hiển thị</label>
          <input className="col-display" type="number" name="column number" />
          <input type="submit" value="Nhập" />
        </form>
      </div>
    );
  }
}

export default Menu;
