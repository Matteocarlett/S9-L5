import LogoNetflix from "../components/img/logo.png";
import Avatar from "../components/img/pluto.webp";
import { useState } from "react";
import { Dropdown, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillBellFill, BsSearch } from "react-icons/bs";
import "../styles.css";

const MyNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar>
      <Navbar.Brand>
        <img src={LogoNetflix} id="logo" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>TV Shows</Nav.Link>
          <Nav.Link>Movies</Nav.Link>
          <Nav.Link>Recently Added</Nav.Link>
          <Nav.Link>My List</Nav.Link>
        </Nav>
        <Nav id="avatarZone">
          <BsSearch className="navbar-icon mt-4" />
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar mt-4 ms-3"
            />
          </form>
          <BsFillBellFill className="navbar-icon mt-4" />
          <Nav.Link className="mt-3">KID</Nav.Link>
          <Nav.Link className="mt-3">Matteo</Nav.Link>
          <NavDropdown title={<img src={Avatar} id="avatar" alt="account" />}>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
