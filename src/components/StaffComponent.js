import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { STAFFS } from "../shared/staffs";
import dateFormat from "dateformat";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.staffs = STAFFS;
    this.state = {
      selectedStaff: null,
      columnNo: 3,
    };
  }
  // Thay đổi trạng thái để nhập staff được chọn vào
  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }
  //Thay đổi trạng thái để chọn ra số ô cần hiển thị
  onColumnSelect(colno) {
    this.setState({ columnNo: colno });
  }
  //Ẩn thẻ tên

  // Hàm in ra Thẻ nhân viên khi một nhân viên bất kì được chọn
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
          <button
            className="btn"
            type="submit"
            onClick={() => this.onStaffSelect(null)}
          >
            Ẩn thẻ tên
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  //In nội dung ra màn hình
  render() {
    const menu = this.props.staffs.map((staff) => {
      //Trường hợp chọn hiển thị nhân viên theo 2 cột ở màn hình desktop
      if (this.state.columnNo == 2) {
        return (
          <div
            key={staff.id}
            className="col-12 col-md-5 col-lg-6"
            id={this.state.displayEl}
          >
            <Card onClick={() => this.onStaffSelect(staff)}>
              <p>{staff.name}</p>
            </Card>
          </div>
        );
      }
      //Trường hợp chọn hiển thị nhân viên theo 3 cột ở màn hình desktop
      if (this.state.columnNo == 3) {
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
      }
      //Trường hợp chọn hiển thị nhân viên theo 4 cột ở màn hình desktop
      if (this.state.columnNo == 4) {
        return (
          <div
            key={staff.id}
            className="col-12 col-md-5 col-lg-3"
            id={this.state.displayEl}
          >
            <Card onClick={() => this.onStaffSelect(staff)}>
              <p>{staff.name}</p>
            </Card>
          </div>
        );
      }
    });
    return (
      <div className="container">
        <h2>Danh Sách Nhân Viên Hiện Hành</h2>
        <div className="row">{menu}</div>
        <div className="row m-4" id="staff-show">
          {this.renderStaff(this.state.selectedStaff)}
        </div>
        <p>Bấm vào tên nhân viên để xem thông tin</p>
        <div className="input-col">
          <label>Chọn số cột muốn hiển thị:</label>
          <button
            className="btn"
            type="submit"
            onClick={() => this.onColumnSelect(2)}
          >
            2 cột
          </button>
          <button
            className="btn"
            type="submit"
            onClick={() => this.onColumnSelect(3)}
          >
            3 cột
          </button>
          <button
            className="btn"
            type="submit"
            onClick={() => this.onColumnSelect(4)}
          >
            4 cột
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
