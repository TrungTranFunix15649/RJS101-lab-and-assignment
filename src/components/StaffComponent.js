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
      annualleave: 0,
      overtime: 0,

      isAddOpen: false,
      touched: {
        staffname: false,
        dob: false,
        startdate: false,
        salaryscale: false,
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
      annualLeave: 0,
      overTime: 0,

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
    if (!Object.values(this.state.touched).includes(false)) {
      this.setState({ ListForSearch: this.state.ListForSearch.push(newStaff) });
      console.log(newStaff);
      this.handleAdd();
    } else {
      alert("Yêu cầu nhập đầy đủ dữ liệu");
    }
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
  validate(staffname, dob, startdate, salaryscale) {
    const errors = {
      staffname: "",
      dob: "",
      startdate: "",
      salaryscale: "",
    };
    // Trường tên không được để trống, phải nhiều hơn 2 kí tự và ít hơn 30 kí tự
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
    if (this.state.touched.salaryscale & (salaryscale.length === 0))
      errors.salaryscale = "Yêu cầu nhập 1.0 - 3.0";

    return errors;
  }
  render() {
    const errors = this.validate(
      this.state.staffname,
      this.state.dob,
      this.state.startdate,
      this.state.salaryscale
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-4 col-lg-4 mt-2">
            <h3>NHÂN VIÊN</h3>
          </div>
          <button
            outline
            onClick={this.handleAdd}
            className="fa fa-plus fa-lg col-sm-2 col-md-2 col-lg-1 mt-2"
            color="secondary"
          ></button>

          <div className="col-sm-12 col-md-6 col-lg-7 mt-2">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Nhập tên"
                defaultValue=""
                ref={this.searchName}
                className="col-sm-9 col-md-8"
              ></input>
              <button
                type="submit"
                value="Tìm"
                name="submit"
                className="col-2 pl-2 primary"
                color="primary"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
        {/* <Form>
          <FormGroup row>
            <Col sm={9} md={4} lg={4} className="mt-2">
              <h3>NHÂN VIÊN</h3>
            </Col>
            <Col sm={2} md={2} lg={1} className="mt-2">
              <Button
                type="submit"
                className="fa fa-plus fa-lg "
                onSubmit={this.handleAdd}
              ></Button>
            </Col>
            <Col sm={12} md={6} lg={7} className="mt-2">
              <FormGroup row>
                <Col sm={9} md={8}>
                  <Input
                    onSubmit={this.handleSubmit}
                    type="text"
                    placeholder="Nhập tên"
                    defaultValue=""
                    ref={this.searchName}
                  />
                </Col>
                <Col sm={1} md={2}>
                  <Button
                    type="submit"
                    value="Tìm"
                    name="submit"
                    className="fa fa-search fa-lg "
                    color="primary"
                  >
                    Tìm
                  </Button>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
        </Form> */}
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
                      <option defaultValue value=""></option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sale">Sale</option>
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
                      valid={errors.salaryscale === ""}
                      invalid={errors.salaryscale !== ""}
                      onBlur={this.handleBlur("salaryscale")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.salaryscale}</FormFeedback>
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
