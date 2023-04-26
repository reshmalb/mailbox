import React, { useDebugValue } from "react";
import { Navbar,Container,Nav,NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthStore";
const Header=()=>{
  const user=useSelector((state)=>state.author.email)
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(authActions.logout())
  }
  
    return(
     <Navbar bg="success" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand>Mail Box</Navbar.Brand>       
        <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
          <Nav>                  
            <NavDropdown title={user} id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>             
                     <NavDropdown.Divider />
                    <NavDropdown.Item  href="#action/3.4" onClick={logoutHandler}> LogOut </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default Header;