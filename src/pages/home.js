import React, {useEffect, useState} from 'react'
import { Container, Col } from 'react-bootstrap'
import '../card.css'
import Sidebar from '../components/sidebar'
import CardComponent from '../components/card'

export default function Home(props) {
  const [mobile, setMobile] = useState([])
  const {data, dataMobile} = props
  useEffect(() => {
    setMobile(dataMobile)
  }, [dataMobile])
  function matchType(data) {
    if (data === 'Ending') return 'Finished'
    else if (data === 'NotStarted') return 'Upcoming'
    else return 'Ongoing'
  }
  return (
    <div>
      <Container fluid className="text-center d-none d-lg-block">
        {
          data?.map((el, i) => {
            return el.length !== 0 ? <Sidebar data={el} type={matchType(el[0]?.statusName)} key={el[0]?.gameId}/> : <div key={i}></div>
          })
        }
      </Container>
      <Container fluid className="text-center d-flex d-lg-none">
        <Col xs={12} lg={7} className="mt-4">
          {
            mobile?.map(el => {
              return <CardComponent data={el} key={el.gameId}/>
            })
          }
        </Col>
      </Container>
    </div>
  )
}