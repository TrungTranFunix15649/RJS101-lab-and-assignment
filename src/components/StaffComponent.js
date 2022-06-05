import React, { Component, useState } from "react";

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import StaffDetail from "./StaffdetailComponent";
let search = "";
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedStaff: "",
      staffs: props.staffs,
      ListForSearch: props.staffs,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchName = React.createRef();
    this.handleAdd = this.handleAdd.bind(this);
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
  handleAdd() {
    console.log("Added");
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
            <button
              onClick={this.handleAdd}
              className="fa fa-plus fa-lg btn-secondary btn-lg btn-block"
            ></button>
            <hr />
          </div>
          <form
            onSubmit={this.handleSubmit}
            className="  col-12 col-md-6 col-lg-7 float-right"
          >
            <label htmlFor="search">Tìm nhân viên</label>
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
