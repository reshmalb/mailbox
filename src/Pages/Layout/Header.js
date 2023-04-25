import React from "react";
import { Navbar,Container,Nav,NavDropdown } from "react-bootstrap";
const Header=()=>{
    return(
     <Navbar bg="info" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand>Mail Box</Navbar.Brand>       
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
          <Nav>                  
            <NavDropdown title="User" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>             
                     <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4"> LogOut </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default Header;