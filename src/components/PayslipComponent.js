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

function Payslip(props) {
  const payslip = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-12 col-md-5 col-lg-4 mb-2">
        <Card>
          <CardTitle>{staff.name}</CardTitle>
          <CardBody>
            <p>Mã nhân viên: {staff.id}</p>
            <p>Hệ số lương: {staff.salaryScale}</p>
            <p>Số ngày làm thêm: {staff.overTime}</p>
          </CardBody>
          <CardHeader>
            Lương:{" "}
            {Math.round(staff.salaryScale * 3000000 + staff.overTime * 200000)}
          </CardHeader>
        </Card>
      </div>
    );
  });
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
      <div className="row">{payslip}</div>
    </div>
  );
}

export default Payslip;
