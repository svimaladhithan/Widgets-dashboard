import "bootstrap/dist/css/bootstrap.min.css";
import { TextInput } from "flowbite-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-2">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <Nav.Link onClick={handleClick}>
          <Navbar.Brand href="#" className="fw-bold" id="heading">
            Dashboard
          </Navbar.Brand>
        </Nav.Link>

        <div className="d-flex align-items-center flex-grow-1 justify-content-center">
        <form>
        <TextInput
          type="text"
          placeholder="Search widgets...."
          rightIcon={AiOutlineSearch}
          onChange={handleSearchChange}
          style={{ width: '400px' }}
        />
      </form>
        </div>

        <Nav
          className="d-flex align-items-center"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <div className="d-flex align-items-center mr-3 space-x-5">
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