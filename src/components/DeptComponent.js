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
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function DeptList(props) {
  if (props.deptsLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.deptsErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.deptsErrMess}</h4>
        </div>
      </div>
    );
  } else if (props.depts != null) {
    const deptlist = props.depts.map((dept) => {
      return (
        <div key={dept.id} className="col-12 col-md-5 col-lg-4 mb-3 mt-3">
          <Card>
            <Link to={`/departments/${dept.id}`}>
              <CardTitle>
                <CardHeader>{dept.name}</CardHeader>
              </CardTitle>
              <CardBody>
                <div>Số lượng nhân viên: {dept.numberOfStaff}</div>
              </CardBody>
            </Link>
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
}

export default DeptList;
