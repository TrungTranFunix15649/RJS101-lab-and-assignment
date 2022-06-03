import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";

function DeptList(props) {
  const deptlist = props.depts.map((dept) => {
    return (
      <div key={dept.id} className="col-12 col-md-5 col-lg-4 mb-3 mt-3">
        <Card>
          <CardTitle>
            <CardHeader>{dept.name}</CardHeader>
          </CardTitle>
          <CardBody>
            <div>Số lượng nhân viên: {dept.numberOfStaff}</div>
          </CardBody>
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <h2>Danh Sách Phòng Ban</h2>
      </div>
      <div className="row">{deptlist}</div>
    </div>
  );
}

export default DeptList;
