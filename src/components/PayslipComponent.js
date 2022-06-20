import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Fade } from "react-animation-components";

//Translate department ID to department name
function DeptName(props) {
  let deptName =
    props.departments.filter((dept) => dept.id === props.id)[0].name || [];

  return <span>{deptName}</span>;
}

//Render staffs with salary from API to web screen
function RenderPayslip(staffssalary) {
  if (staffssalary.salLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (staffssalary.salErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{staffssalary.salErrMess}</h4>
        </div>
      </div>
    );
  } else if (staffssalary.staffssalary !== null) {
    return staffssalary.staffssalary.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-5 col-lg-4 mb-2">
          <Fade in enterOpacity={0.8}>
            <Card>
              <CardHeader>
                <CardTitle>{staff.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <p>Mã nhân viên: {staff.id}</p>
                <p>
                  Bộ phận:{" "}
                  <DeptName
                    id={staff.departmentId}
                    departments={staffssalary.departments}
                  />
                </p>
                <p>Hệ số lương: {staff.salaryScale}</p>
                <p>Số ngày làm thêm: {staff.overTime}</p>
              </CardBody>
              <CardHeader>
                <p>Lương: {staff.salary}</p>
              </CardHeader>
            </Card>
          </Fade>
        </div>
      );
    });
  }
}
// Payslip component/ page
function Payslip(props) {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active> Bảng Lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{RenderPayslip(props)}</div>
    </div>
  );
}

export default Payslip;
