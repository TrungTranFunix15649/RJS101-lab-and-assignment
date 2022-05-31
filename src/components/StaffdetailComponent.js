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
        </div>
        <div className="row">
          <div className="col-12 col-md-5 col-lg-4 mb-2">
            <CardImg top src={props.staff.image} alt={props.staff.name} />
          </div>
          <div className="col-12 col-md-5 col-lg-8">
            <Card>
              <CardHeader>
                <CardTitle>Họ và tên: {props.staff.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <div>
                  Ngày sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}
                </div>
                <div>
                  Ngày vào công ty:{" "}
                  {dateFormat(props.staff.startDate, "dd/mm/yyyy")}
                </div>
                <div>Phòng ban: {props.staff.department.name}</div>
                <div>Số ngày nghỉ còn lại: {props.staff.annualLeave}</div>
                <div>Số ngày đã làm thêm: {props.staff.overTime}</div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
