import React, {useState} from 'react'
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import {HashLink as Link} from 'react-router-hash-link'

export default function NavigationBar() {
  const [show, setShow] = useState(false);
  const showDropdown = (e)=>{
      setShow(!show);
  }
  const hideDropdown = e => {
      setShow(false);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="d-none d-lg-flex">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/footballs.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Soccer Live-Score
          </Navbar.Brand>
          <NavDropdown title="Match" menuVariant="dark" id="nav-dropdown-dark-example" show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <NavDropdown.Item>
            <Link smooth to='#Ongoing' style={{color: '#dee2e6', 'text-decoration': 'none'}}>
              Ongoing
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link smooth to='#Upcoming' style={{color: '#dee2e6', 'text-decoration': 'none'}}>
              Upcoming
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link smooth to='#Finished' style={{color: '#dee2e6', 'text-decoration': 'none'}}>
              Finished
            </Link>
          </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="d-flex d-lg-none">
        <Container className="d-flex justify-content-center my-1">
          <img
            alt=""
            src="/footballs.png"
            width="30"
            height="30"
          />
          <span className="text-h4 mx-1" style={{color: 'white', fontSize: '1.5rem'}}>Soccer Live-Score</span>
        </Container>
      </Navbar>
    </>
  )
}