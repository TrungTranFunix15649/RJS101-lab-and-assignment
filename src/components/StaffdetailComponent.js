import React from "react";
import {
  Card,
  CardImg,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderStaff({ staff }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={staff.image} alt={staff.name} />
        <CardHeader>Họ và tên: {staff.name}</CardHeader>
        <CardBody>
          <div>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyy")}</div>
          <div>
            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyy")}
          </div>
          <div>Phòng ban: {staff.department.name}</div>
          <div>Số ngày nghỉ còn lại: {staff.annualLeave}</div>
          <div>Số ngày đã làm thêm: {staff.overTime}</div>
        </CardBody>
      </Card>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staffs">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staff.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderStaff staff={props.staff} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
