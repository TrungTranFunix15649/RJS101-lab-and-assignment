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
} from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedStaff: "",
      staffs: props.staffs,
      ListForSearch: props.staffs,
      staffname: "",
      dob: "",
      salaryscale: "",
      startdate: "",
      department: "",
      annualleave: "",
      overtime: "",
      salary: "",
      isAddOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchName = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewStaff = this.handleNewStaff.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let filteredStaff = this.state.ListForSearch.filter((staff) => {
      return staff.name
        .toLowerCase()
        .includes(this.searchName.current.value.toLowerCase());
    });
    console.log(filteredStaff);

    this.setState({ staffs: filteredStaff });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  handleNewStaff(event) {
    console.log("This state: " + JSON.stringify(this.state));
    alert("This state: " + JSON.stringify(this.state));
    this.handleAdd();
    event.preventDefault();
  }
  handleAdd() {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  }

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
        <div className="row">
          <div className="col-xs-10 col-md-5 col-lg-4">
            <h3>NHÂN VIÊN</h3>
            <hr />
          </div>
          <div className="col-xs-2 col-md-1 col-lg-1">
            <Button outline onClick={this.handleAdd}>
              <span className="fa fa-plus fa-lg "></span>
            </Button>
            <hr />
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="  col-12 col-md-6 col-lg-7 float-right"
          >
            <input
              type="text"
              placeholder="Nhập tên"
              defaultValue=""
              ref={this.searchName}
            ></input>
            <input
              type="submit"
              value="Tìm"
              name="submit"
              className="fa fa-search fa-lg"
            ></input>
          </form>
          <hr />
        </div>
        <div className="row">
          {this.state.staffs.map((staff) => {
            return (
              <div key={staff.id} className="col-12 col-md-4 col-lg-2 mb-2 ">
                {this.RenderStaffs(staff)}
              </div>
            );
          })}
        </div>
        <Modal isOpen={this.state.isAddOpen} toggle={this.handleAdd}>
          <ModalHeader toggle={this.handleAdd}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-10">
              <Form onSubmit={this.handleNewStaff}>
                <FormGroup row>
                  <Label htmlFor="staffname" md={4}>
                    Tên:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="staffname"
                      name="staffname"
                      placeholder="Họ và tên"
                      value={this.state.staffname}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="dob" md={4}>
                    Ngày sinh:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="dob"
                      name="dob"
                      placeholder="dd/mm/yyyy"
                      value={this.state.dob}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="startdate" md={4}>
                    Ngày vào công ty:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="startdate"
                      name="startdate"
                      placeholder="dd/mm/yyyy"
                      value={this.state.startdate}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="department" md={4}>
                    Phòng ban:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="select"
                      name="department"
                      value={this.state.department}
                      onChange={this.handleInputChange}
                    >
                      <option>Finance</option>
                      <option>HR</option>
                      <option>IT</option>
                      <option>Marketing</option>
                      <option>Sale</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="salaryscale" md={4}>
                    Hệ số lương:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="salaryscale"
                      name="salaryscale"
                      min={1.0}
                      step={0.1}
                      precision={1}
                      max={3.0}
                      value={this.state.salaryscale}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="annualleave" md={4}>
                    Số ngày nghỉ còn lại:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="annualleave"
                      name="annualleave"
                      min={0.0}
                      step={0.5}
                      precision={1}
                      max={365.0}
                      value={this.state.annualleave}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="overtime" md={4}>
                    Số ngày đã làm thêm:
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="overtime"
                      name="overtime"
                      value={this.state.overtime}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default StaffList;

/////////////Code using HOOK avail for react 16.8 and above
/*
function RenderStaffs({ staff }) {
  return (
    <Card>
      <Link to={`/staffs/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle>{staff.name}</CardTitle>
      </Link>
    </Card>
  );
}

const StaffList = (props) => {
  let [searchName, setSearchName] = useState("");
  let handleSubmit = (event) => {
    event.preventDefault();

    let nameInput = event.target.searchname.value; // accessing directly
    searchName = nameInput;
    setSearchName(searchName);
    console.log(searchName);
  };
  const stafflist = props.staffs.map((staff) => {
    // if (searchName == "") {
    //   return (
    //     <div key={staff.id} className="col-12 col-md-4 col-lg-2 ">
    //       <RenderStaffs staff={staff} />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div key={staff.id} className="col-12 col-md-4 col-lg-2 ">
    //       <RenderStaffs staff={searchName} />
    //     </div>
    //   );
    // }
    return (
      <div key={staff.id} className="col-12 col-md-4 col-lg-2 ">
        <RenderStaffs staff={staff} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 col-lg-4">
          <h3>NHÂN VIÊN</h3>
          <hr />
        </div>
        <form className="ml-auto mr-3 search " onSubmit={handleSubmit}>
          <label>Tìm nhân viên</label>
          <input type="text" placeholder="Họ và Tên" name="searchname"></input>
          <input className="fa fa-search fa-lg searchname" type="submit" />
        </form>
      </div>
      <div className="row">{stafflist}</div>
    </div>
  );
};
export default StaffList;
*/
