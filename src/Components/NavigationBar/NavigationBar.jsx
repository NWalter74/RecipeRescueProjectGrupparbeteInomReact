import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { BiFridge } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

function BasicExample() {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <GiKnifeFork />
          Recipe Rescue
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navText">
            <Nav.Link href="/">
              <AiOutlineHome />
              Home
            </Nav.Link>
            <Nav.Link href="/EmptyYourFridge">
              <BiFridge />
              Empty Your Fridge
            </Nav.Link>
            {/* Funkar inte riktigt än från EYF */}
            <Nav.Link href="/#section1">
                {" "}
                <MdOutlineLocalGroceryStore />
                Show nearby stores{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
