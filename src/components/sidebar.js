import React from 'react'
import {Container, Col} from 'react-bootstrap'
import CardComponent from './card'

function Sidebar(props) {
  const {type, data} = props
  function imgSource () {
    if(type === "Ongoing") {
      return "/television.png"
    } else if(type === "Upcoming") {
      return "/schedule.png"
    } else {
      return "/correction.png"
    }
  }
  function fullDate() {
    let monthShortNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let fullDate = new Date()
    let month = monthShortNames[fullDate.getMonth()]
    let date = fullDate.getDate()
    let year = fullDate.getFullYear()
    let dateUX = `${date} ${month} ${year}`
    
    return `${dateUX}`
  }
  return (
    <Container className="d-flex" id={type}>
      <Col className="d-none d-lg-flex justify-content-center" lg={5}>
        <div className="title-description d-flex flex-column justify-content-center align-items-center">
          <img src={imgSource()} alt="Ongoing-Matches" className="logo-image"/>
          <h1>{type} Matches</h1>
          <span className="text-h5">{fullDate()}</span>
        </div>
      </Col>
      <Col xs={12} lg={7} className="mt-4">
        {
          data?.map(el => {
            return <CardComponent data={el} key={el.gameId}/>
          })
        }
      </Col>
    </Container>
  )
}

export default Sidebar
