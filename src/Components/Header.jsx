import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";


const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Nav.Link onClick={handleClick}>
          <Navbar.Brand href="#" className="fw-bold" id="heading">
            Dashboard
          </Navbar.Brand>
        </Nav.Link>

        <Nav
          className="ms-auto my-2 my-lg-0 d-flex align-items-center"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <div className="d-flex align-items-center me-5">

         
            <SearchBar onSearch={onSearch} />

            <MdOutlineNotificationsActive size={25} className="me-2" />

            <Button
              variant="outline-success"
              className="d-flex align-items-center"
            >
              <FaCircleUser className="me-2" />
              User
            </Button>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
