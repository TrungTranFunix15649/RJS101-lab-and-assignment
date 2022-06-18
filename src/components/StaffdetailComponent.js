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
import { Loading } from "./LoadingComponent";

const StaffDetail = (props) => {
  let deptName = "";
  if (props.departments !== null && props.staff !== null) {
    deptName = props.departments.filter(
      (dept) => dept.id === props.staff.departmentId
    )[0].name;
    console.log(deptName);
  }

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.staff !== null && props.departments !== undefined) {
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
          <div className="col-sm-6 col-md-5 col-lg-4 mb-2">
            <CardImg top src={props.staff.image} alt={props.staff.name} />
          </div>
          <div className="col-sm-6 col-md-5 col-lg-8">
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
                <div>Phòng ban: {deptName}</div>
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
