import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardHeader,
  CardTitle,
  Button,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

//Validation condition for the input of staff details
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const maxVal = (maxvalue) => (val) => !val || Number(val) <= maxvalue;
const minVal = (minvalue) => (val) => val && Number(val) >= minvalue;
const intNum = (val) => val >= 0 && Number.isInteger(val / 0.5);

//Main component of the page
class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOpen: false,
    };
    this.renderDetail = this.renderDetail.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editStaff = this.editStaff.bind(this);
  }
  //Set state open or close of the edit form
  handleEdit() {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  }
  //Edit information based on input
  editStaff(values) {
    const newStaff = {
      id: "",
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      departmentId: "",
      annualLeave: 0,
      overTime: 0,
      image: "/assets/images/alberto.png",
      salary: "",
    };
    newStaff.id = this.props.staff.id;
    newStaff.name = values.staffname;
    newStaff.doB = values.dob;
    newStaff.salaryScale = values.salaryscale;
    newStaff.startDate = values.startdate;
    newStaff.departmentId = values.department;
    newStaff.annualLeave = values.annualleave;
    newStaff.overTime = values.overtime;
    newStaff.salary = Math.round(
      Number(values.salaryscale) * 3000000 + Number(values.overtime) * 200000
    );
    this.props.editStaff(newStaff);
    this.handleEdit();
    console.log("Edited staff: ", newStaff);
  }
  //
  //render staff information
  renderDetail(props) {
    //transform dept id into dept name
    let deptName = "";
    if (props.departments !== null && props.staff !== null) {
      deptName = props.departments.filter(
        (dept) => dept.id === props.staff.departmentId
      )[0].name;
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
              <Button onClick={this.handleEdit} color="warning">
                Chỉnh sửa
              </Button>

              <Modal isOpen={this.state.isEditOpen} toggle={this.handleEdit}>
                <ModalHeader toggle={this.handleEdit}>
                  Cập nhật thông tin nhân viên
                </ModalHeader>
                <ModalBody>
                  <div className="col-12 col-md-10">
                    <LocalForm onSubmit={(values) => this.editStaff(values)}>
                      <Row className="form-group">
                        <Label htmlFor="staffname" md={4}>
                          Tên:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".staffname"
                            id="staffname"
                            name="staffname"
                            defaultValue={props.staff.name}
                            className="form-control"
                            validators={{
                              required,
                              minLength: minLength(3),
                              maxLength: maxLength(30),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".staffname"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập. ",
                              minLength: "Tên phải nhiều hơn 2 kí tự",
                              maxLength: "Tên phải ít hơn 30 kí tự",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="dob" md={4}>
                          Ngày sinh:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".dob"
                            id="dob"
                            name="dob"
                            defaultValue={dateFormat(
                              props.staff.doB,
                              "yyyy-mm-dd"
                            )}
                            className="form-control"
                            validators={{ required }}
                          />
                          <Errors
                            className="text-danger"
                            model=".dob"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập. ",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="startdate" md={4}>
                          Ngày vào công ty:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".startdate"
                            id="startdate"
                            name="startdate"
                            className="form-control"
                            placeholder="dd/mm/yyyy"
                            defaultValue={dateFormat(
                              props.staff.startDate,
                              "yyyy-mm-dd"
                            )}
                            validators={{ required }}
                          />
                          <Errors
                            className="text-danger"
                            model=".startdate"
                            show="touched"
                            messages={{
                              required: "Yêu cầu nhập. ",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="department" md={4}>
                          Phòng ban:
                        </Label>
                        <Col md={8}>
                          <Control.select
                            model=".department"
                            name="department"
                            className="form-control"
                            defaultValue={props.staff.departmentId}
                            validators={{ required }}
                          >
                            <option disabled>{deptName}</option>
                            <option value="Dept05">Finance</option>
                            <option value="Dept02">HR</option>
                            <option value="Dept04">IT</option>
                            <option value="Dept03">Marketing</option>
                            <option value="Dept01">Sale</option>
                          </Control.select>
                          <Errors
                            className="text-danger"
                            model=".department"
                            show="touched"
                            messages={{
                              required: "Yêu cầu chọn phòng ban.",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="salaryscale" md={4}>
                          Hệ số lương:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="number"
                            model=".salaryscale"
                            id="salaryscale"
                            name="salaryscale"
                            min={1.0}
                            step={0.1}
                            precision={1}
                            max={3.0}
                            defaultValue={props.staff.salaryScale}
                            className="form-control"
                            validators={{
                              minVal: minVal(1.0),
                              maxVal: maxVal(3.0),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".salaryscale"
                            show="touched"
                            messages={{
                              minVal: "Hệ số >= 1.0. ",
                              maxVal: "Hệ số <= 3.0",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="annualleave" md={4}>
                          Số ngày nghỉ còn lại:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="number"
                            model=".annualleave"
                            id="annualleave"
                            name="annualleave"
                            defaultValue={props.staff.annualLeave}
                            min={0.0}
                            step={0.5}
                            precision={1}
                            className="form-control"
                            validators={{ intNum }}
                          />
                          <Errors
                            className="text-danger"
                            model=".annualleave"
                            show="touched"
                            messages={{
                              intNum: "Nhập số nguyên hoặc lẻ 0.5 ngày.",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Label htmlFor="overtime" md={4}>
                          Số ngày đã làm thêm:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="number"
                            model=".overtime"
                            id="overtime"
                            name="overtime"
                            className="form-control"
                            defaultValue={props.staff.overTime}
                          />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col md={{ size: 10, offset: 2 }}>
                          <Button type="submit" color="primary">
                            Chỉnh sửa
                          </Button>
                        </Col>
                      </Row>
                    </LocalForm>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return <div>{this.renderDetail(this.props)}</div>;
  }
}

export default StaffDetail;
