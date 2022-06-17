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

function RenderStaff(staff) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle>{staff.name}</CardTitle>
      </Link>
    </Card>
  );
}
function RenderStaffs(staffs) {
  return staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mb-2 ">
        {RenderStaff(staff)}
      </div>
    );
  });
}
const DeptDetail = (props) => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/departments">Phòng ban</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dept.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <RenderStaffs
          staffs={props.staffs.filter(
            (staff) => staff.departmentId === props.dept.id
          )}
        />
      </div>
    </div>
  );
};
export default DeptDetail;
