import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

function Contact(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Liên hệ chúng tôi</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Thông tin liên hệ</h3>
        </div>
        <div className="col-12 col-md-4 col-lg-4 mb-2">
          <h5>Văn phòng chính thức</h5>
          <address>
            01 Đại Cồ Việt
            <br />
            Phường Bách Khoa, Quận Hai Bà Trưng
            <br />
            Hà Nội, Việt Nam
            <br />
            <i className="fa fa-phone"></i>: +841 2345 6789
            <br />
            <i className="fa fa-fax"></i>: +841 2345 6789
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">staffmanagement@org.vn</a>
          </address>
        </div>
        <div className="col-12 col-md-6 col-lg-6 mb-2">
          <h5>Gửi tin nhắn</h5>
          <form>
            <input type="text" className="message-input" />
            <input type="submit" value="Gửi tin" />
          </form>
        </div>
        <div className="col-12 col-sm-11 ">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
