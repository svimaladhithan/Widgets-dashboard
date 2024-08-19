import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Nav.Link onClick={handleClick}>
          <Navbar.Brand href="#" className="fw-bold">
            Dashboard
          </Navbar.Brand>
        </Nav.Link>

        <Nav
          className="ms-auto my-2 my-lg-0 d-flex align-items-center"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <div className="d-flex align-items-center me-5">
            <Form className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="search anything..."
                className="me-2"
                aria-label="Search"
              />
              <NavDropdown
                title=""
                id="navbarScrollingDropdown"
                className="me-2"
              >
                <NavDropdown.Item href="#action3">
                  CSPM Executive Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  CWPP Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                  Registry Scan
                </NavDropdown.Item>
              </NavDropdown>
              <MdOutlineNotificationsActive size={50} className="me-2" />
              <Button
                variant="outline-success"
                className="d-flex align-items-center"
              >
                <FaCircleUser className="me-2" />
                User
              </Button>
            </Form>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
