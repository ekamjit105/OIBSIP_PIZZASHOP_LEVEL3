import React from 'react'
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { logoutUser } from '../actions/userAction'

const NavBar = () => {

  const dispatch = useDispatch()
  const cartState = useSelector((state)=>state.cartReducer)
  const {currentUser} = useSelector((state)=>state.loginReducer)


  return (
    <>

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
        <img src='../images/logo1.png' style={{height:"50px"}} alt="logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          {currentUser?
            (<LinkContainer to="/">
              <NavDropdown title={currentUser.name} id="basic-nav-dropdown">

              <LinkContainer to="/myorders">
                <NavDropdown.Item>My Orders</NavDropdown.Item>
              </LinkContainer>
                <NavDropdown.Item onClick={()=>{dispatch(logoutUser())}}>Log Out</NavDropdown.Item>
            
            </NavDropdown>
            </LinkContainer>)
          :
            (<>
            <LinkContainer to="/login">
                <Nav.Link >Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
                <Nav.Link >Register</Nav.Link>
            </LinkContainer>
            </>
            )
          }
            <LinkContainer to="/cart">
                <Nav.Link >Cart {cartState.cartItems.length}</Nav.Link>
            </LinkContainer>
            
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default NavBar