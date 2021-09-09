import React, {useRef, useEffect} from 'react'
import { Navbar, Row, Col } from 'react-bootstrap'
import {Link, useLocation} from 'react-router-dom'

function NavBottom() {
  const ongoing = useRef(null)
  const upcoming = useRef(null)
  const finished = useRef(null)
  let location = useLocation();
  
  useEffect(() => {
    if(location.pathname === '/') ongoing.current && ongoing.current.focus()
    else if (location.pathname === '/upcoming') upcoming.current && upcoming.current.focus()
    else finished.current && finished.current.focus()
  }, [location.pathname])


  return (
    <Navbar fixed="bottom" expand="lg" className="bg-dark d-block d-lg-none">
      <Row>
        <Col xs="4" className="d-flex flex-column align-items-center">
          <img src="/television.png" alt="ongoing" className="nav-icons"/>
          <Link to={"/"} className="nav-link" ref={ongoing}>Ongoing</Link>
        </Col>
        <Col xs="4" className="d-flex flex-column align-items-center">
          <img src="/schedule.png" alt="ongoing" className="nav-icons"/>
          <Link to={"/upcoming"} className="nav-link" ref={upcoming}>Upcoming</Link>
        </Col>
        <Col xs="4" className="d-flex flex-column align-items-center">
          <img src="/correction.png" alt="ongoing" className="nav-icons"/>
          <Link to={"/finished"} className="nav-link" ref={finished}>Finished</Link>
        </Col>
      </Row>
    </Navbar>
  )
}

export default NavBottom
