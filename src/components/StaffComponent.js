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

      isAddOpen: false,
      touched: {
        staffname: false,
        dob: false,
        startdate: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchName = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNewStaff = this.handleNewStaff.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
  }

  // Chức năng tìm kiếm tên nhân viên khi nhập tên và nhấn submit
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
  // Cập nhật thay đổi trạng thái khi nhập thông tin nhân viên mới
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  // Lấy thông tin nhân viên đã nhập để đưa vào danh sách nhân viên cần in ra màn hình
  handleNewStaff(event) {
    const newStaff = {
      id: "",
      name: "",
      doB: "",
      salaryScale: "",
      startDate: "",
      department: "",
      annualLeave: "",
      overTime: "",

      image: "/assets/images/alberto.png",
    };
    newStaff.id =
      this.state.ListForSearch[this.state.ListForSearch.length - 1].id + 1;

    newStaff.name = this.state.staffname;
    newStaff.doB = this.state.dob;
    newStaff.salaryScale = this.state.salaryscale;
    newStaff.startDate = this.state.startdate;
    newStaff.department = this.state.department;
    newStaff.annualLeave = this.state.annualleave;
    newStaff.overTime = this.state.overtime;
    console.log(newStaff);
    this.setState({ ListForSearch: this.state.ListForSearch.push(newStaff) });
    console.log(this.state.ListForSearch);

    this.handleAdd();
    event.preventDefault();
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
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  // Xác minh thông tin nhân viên mới được nhập vào có hợp lệ không
  validate(staffname, dob, startdate) {
    const errors = {
      staffname: "",
      dob: "",
      startdate: "",
    };
    // Trường tên không được để trống, phải nhiều hơn 2 kí tự và ít hơn 30 kí tựf
    if (this.state.touched.staffname & (staffname.length === 0))
      errors.staffname = "Yêu cầu nhập";
    else if (this.state.touched.staffname & (staffname.length < 3))
      errors.staffname = "Yêu cầu nhiều hơn 2 kí tự";
    else if (this.state.touched.staffname & (staffname.length > 30))
      errors.staffname = "Yêu cầu ít hơn 30 kí tự";

    if (this.state.touched.dob & (dob.length === 0))
      errors.dob = "Yêu cầu nhập";
    if (this.state.touched.startdate & (startdate.length === 0))
      errors.startdate = "Yêu cầu nhập";

    return errors;
  }
  render() {
    const errors = this.validate(
      this.state.staffname,
      this.state.dob,
      this.state.startdate
    );
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
                      valid={errors.staffname === ""}
                      invalid={errors.staffname !== ""}
                      onBlur={this.handleBlur("staffname")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.staffname}</FormFeedback>
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
                      valid={errors.dob === ""}
                      invalid={errors.dob !== ""}
                      onBlur={this.handleBlur("dob")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.dob}</FormFeedback>
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
                      valid={errors.startdate === ""}
                      invalid={errors.startdate !== ""}
                      onBlur={this.handleBlur("startdate")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.startdate}</FormFeedback>
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
