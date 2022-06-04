import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavItem,
  Nav,
  Col,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, toggleModal }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author},
                  {new Intl.DateTimeFormat("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <Nav>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg"></span>Comments
              </Button>
            </NavItem>
          </Nav>
        </Nav>
      </div>
    );
  } else {
    return <div></div>;
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    this.toggleModal();
    alert("Current values are:" + JSON.stringify(values));
  }
  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <RenderDish dish={this.props.dish} />
            <RenderComments
              comments={this.props.comments}
              toggleModal={this.toggleModal}
            />
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select
                      model=".rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="authorname">Your Name</Label>
                    <Control.text
                      model=".authorname"
                      id="authorname"
                      name="authorname"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".authorname"
                      show="touched"
                      messages={{
                        required: "Required field.",
                        minLength: "Name must be greater than 3 characters",
                        maxLength: "Name must be less than 15 characters",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="message">Your message</Label>
                    <Control.textarea
                      model=".message"
                      id="message"
                      name="message"
                      className="form-control"
                      rows="8"
                      validators={{ required }}
                    />
                    <Errors
                      className="text-danger"
                      model=".message"
                      show="touched"
                      messages={{ required: "Comment should be left blank!" }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Send feedback
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
