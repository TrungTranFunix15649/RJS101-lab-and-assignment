import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormFeedback,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const maxVal = (maxvalue) => (val) => !val || Number(val) < maxvalue;
const minVal = (minvalue) => (val) => val && Number(val) >= minvalue;
const intNum = (val) => val >= 0 && Number.isInteger(val / 0.5);
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedStaff: "",
      staffs: props.staffs,
      ListForSearch: props.staffs,

      isAddOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchName = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);

    this.handleNewStaff = this.handleNewStaff.bind(this);
  }

  // Chức năng tìm kiếm tên nhân viên khi nhập tên và nhấn Tìm
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.ListForSearch);
    let filteredStaff = this.state.ListForSearch.filter((staff) => {
      return staff.name
        .toLowerCase()
        .includes(this.searchName.value.toLowerCase());
    });
    console.log(this.searchName.value);
    console.log(this.state.ListForSearch);
    this.setState({ staffs: filteredStaff });
  }

  // Lấy thông tin nhân viên đã nhập để đưa vào danh sách nhân viên cần in ra màn hình
  handleNewStaff(values) {
    const newStaff = {
      id: "",
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      image: "/assets/images/alberto.png",
    };
    newStaff.id =
      this.state.ListForSearch[this.state.ListForSearch.length - 1].id + 1;

    newStaff.name = values.staffname;
    newStaff.doB = values.dob;
    newStaff.salaryScale = values.salaryscale;
    newStaff.startDate = values.startdate;
    newStaff.department = values.department;
    newStaff.annualLeave = values.annualleave;
    newStaff.overTime = values.overtime;
    this.setState({
      ListForSearch: this.state.ListForSearch.push(newStaff),
    });
    this.handleAdd();
    console.log(this.state.ListForSearch);
  }
  // thêm nhân viên -Mở thẻ để nhập thông tin của nhân viên mới
  handleAdd() {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }
  // In thẻ thông tin của nhân viên ra màn hình trang
  RenderStaffs(staff) {
    return (
      <Card>
        <Link to={`/staffs/${staff.id}`}>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardTitle>{staff.name}</CardTitle>
        </Link>
      </Card>
    );
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col sm={10} md={4} className="mt-2">
            <h3>NHÂN VIÊN</h3>
          </Col>

          <Col sm={2} md={2} className="mt-2">
            <Button
              className="fa fa-plus fa-lg "
              onClick={this.handleAdd}
            ></Button>
          </Col>
          <Col sm={12} md={6} className="mt-2">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col sm={10} md={8}>
                  <Input
                    type="text"
                    placeholder="Nhập tên"
                    defaultValue=""
                    innerRef={(input) => (this.searchName = input)}
                  />
                </Col>
                <Col sm={2} md={4}>
                  <Button
                    name="submit"
                    className="fa fa-search fa-lg "
                    color="primary"
                  >
                    Tìm
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <hr />
        <div className="row">
          {this.state.staffs.map((staff) => {
            return (
              <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2 mb-2 ">
                {this.RenderStaffs(staff)}
              </div>
            );
          })}
        </div>
        <Modal isOpen={this.state.isAddOpen} toggle={this.handleAdd}>
          <ModalHeader toggle={this.handleAdd}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-10">
              <LocalForm onSubmit={(values) => this.handleNewStaff(values)}>
                <Row className="form-group">
                  <Label htmlFor="staffname" md={4}>
                    Tên:
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".staffname"
                      id="staffname"
                      name="staffname"
                      placeholder="Họ và tên"
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
                      placeholder="dd/mm/yyyy"
                      value={this.state.tenState}
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
                      value={this.state.tenState}
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
                      validators={{ required }}
                    >
                      <option defaultValue value=""></option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sale">Sale</option>
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
                      value={this.state.tenState}
                      className="form-control"
                      validators={{
                        required,
                        minVal: minVal(1.0),
                        maxVal: maxVal(3.0),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".salaryscale"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập. ",
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
                      value={this.state.tenState}
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
                      model="overtime"
                      id="overtime"
                      name="overtime"
                      className="form-control"
                      value={this.state.tenState}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default StaffList;
