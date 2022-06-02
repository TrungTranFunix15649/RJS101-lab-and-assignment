import React, { Component, useState } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedStaff: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchedStaff: event.target.value });
  }

  handleSubmit(event) {
    // this.setState({ searchedStaff: event.target.value });
    console.log(this.state.searchedStaff);

    this.RenderStaffs(this.state.searchedStaff);
    event.preventDefault();
    const staffFound = this.state.searchedStaff;
    const Found = this.props.staffs.filter(
      (staff) => staff.name == staffFound
    )[0];
    return (
      <div key={Found.id} className="col-12 col-md-4 col-lg-2 mb-2 ">
        <Card>
          <Link to={`/staffs/${Found.id}`}>
            <CardImg width="100%" src={Found.image} alt={Found.name} />
            <CardTitle>{Found.name}</CardTitle>
          </Link>
        </Card>
      </div>
    );
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
    console.log("bắt đầu", this.state.searchedStaff);
    const stafflist = this.props.staffs.map((staff) => {
      if (!this.searchedStaff) {
        return (
          <div key={staff.id} className="col-12 col-md-4 col-lg-2 mb-2 ">
            {this.RenderStaffs(staff)}
          </div>
        );
      } else {
        const foundStaff = this.props.staffs.filter(
          (staff) => staff.name == this.state.searchedStaff
        );
        console.log(foundStaff);
        return (
          <div key={staff.id} className="col-12 col-md-4 col-lg-2 mb-2 ">
            {this.RenderStaffs(foundStaff)}
          </div>
        );
      }
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 col-lg-4">
            <h3>NHÂN VIÊN</h3>
            <hr />
          </div>
          <form onSubmit={this.handleSubmit} className="ml-auto mr-3 search ">
            <label>Tìm nhân viên</label>
            <input
              type="text"
              placeholder="Họ và Tên"
              value={this.state.searchedStaff}
              onChange={this.handleChange}
            ></input>
            <button type="submit" className="fa fa-search fa-lg"></button>
          </form>
        </div>
        <div className="row">{stafflist}</div>
        <div className="row">
          <handleSubmit />
        </div>
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
