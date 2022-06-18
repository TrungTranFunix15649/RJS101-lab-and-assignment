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
import { Fade, SlideInDown } from "react-animation-components";

function DeptName(props) {
  console.log("Test ID:", props.id);
  console.log("Test dept: ", props.departments);
  let deptName =
    props.departments.filter((dept) => dept.id === props.id)[0].name || [];
  console.log("Tên phòng ban:", deptName);
  return <span>{deptName}</span>;
}

function RenderPayslip(staffssalary) {
  console.log("Staffssalary: ", staffssalary);
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
            <SlideInDown durationMs={500}>
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
            </SlideInDown>
          </Fade>
        </div>
      );
    });
  }
}
function Payslip(props) {
  console.log(props);
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
