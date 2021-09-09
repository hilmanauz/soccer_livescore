import React from "react"
import { Col, Card, Accordion, ProgressBar } from 'react-bootstrap'
import { useRef } from 'react';
import corner from '../assets/corner.svg'
import halfTime from '../assets/half-time.svg'
import penaltyKick from '../assets/penalty-kick.svg'
import statistics from '../assets/chart.svg'
import redCard from '../assets/red-card.svg'
import yellowCard from '../assets/yellow-card.svg'

export default function CardComponent(props) {
  const {data} = props
  // const [nowTime, setNowTime] = useState(new Date())
  // const [upcomingTime, setUpcomingTime] = useState('')

  // useEffect(() => {
  //   if (data) {
  //     if(data.statusName === 'NotStarted') {
  //       let now = new Date()
  //       let upcoming = new Date(data.matchTime)
  //       let hour = ''
  //       let minute = ''
  //       let second = ''
  //       hour = upcoming.getHours() - now.getHours()
  //       minute = upcoming.getMinutes() - now.getMinutes()
  //       if(hour < 0) {
  //         hour = ''
  //       }
  //       if(minute < 0) {
  //         minute = ''
  //       }
  //       setUpcomingTime(`${hour ? hour + 'hour': ''} ${minute ? minute + 'minute': ''} ${second ? second + 'second': ''}`)
  //       setNowTime(new Date())
  //     }
  //   }
  // }, [])

  function fullDate(data) {
    let fullDate = new Date(data)
    let time = fullDate.toLocaleTimeString('en-US')
    
    return `${time}`
  }

  function match(data) {
    let status = null
    if(data.statusName === 'Ending') status = "FINISH"
    else if(data.statusName === 'NotStarted') status = `UPCOMING`
    else status = data.statusName.toUpperCase()
    return `${status}`
  }

  const ComparationData = ({home, away}) => {
    let homePercent = null;
    let awayPercent = null;
    if ( home === 0 && away === 0) {
      homePercent = 50
      awayPercent = 50
    } else {
      homePercent = Math.round(home / (home+away) * 100)
      awayPercent = Math.round(away / (home+away) * 100) 
      if (homePercent === 0 || awayPercent === 0) {
        homePercent = 50
        awayPercent = 50
      }
    }
    return (
      <ProgressBar>
        <ProgressBar striped variant="success" label={`${home}`} now={homePercent} key={1} />
        <ProgressBar striped variant="danger" label={`${away}`} now={awayPercent} key={2} />
      </ProgressBar>
    )
  }

  const ImageWithFallback = ({src, type}) => {
    const imgRef = useRef();
    let onImageError = null;
    let classType = null;
    if (type === 'team') {
      onImageError = () => imgRef.current.src="/football.png";
      classType = 'logo-image'
    } else if (type === 'description') {
      if(src) {
        onImageError = () => imgRef.current.src="/rank.png";
      } else {
        src = "/rank.png"
      }
      classType = 'description-icons'
    }

    return (
      // eslint-disable-next-line
      <img ref={imgRef} src={src} onError={onImageError} alt="no-image" className={classType}/>
    )
  }

  return (
    <Col className="mb-4">
      <Card className="p-2 pt-lg-4 pt-3 card-score mb-2">
        <div className="text-center d-flex flex-column">
          <span className="text-h4 font-weight-bolder">{data.eventName}</span>
          <span className="text-subtitle-2">{fullDate(data.matchTime)}</span>
        </div>
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <ImageWithFallback src={data.homeTeamEvent.logoUrl} type={'team'}/>
            <span className="text-body-2 team-title">{data.homeTeamEvent.name}</span>
          </div>
          <div className="d-flex flex-column text-center">
            <div className="d-flex flex-grow-1 align-items-center">
              <span className="text-h1">{data.homeTeamEvent.score} - {data.awayTeamEvent.score}</span>
            </div>
            <span className="text-body-2">{match(data)}</span>
          </div>
          <div className="d-flex flex-column align-items-center">
            <ImageWithFallback src={data.awayTeamEvent.logoUrl} type={'team'}/>
            <span className="text-body-2 team-title">{data.awayTeamEvent.name}</span>
          </div>
        </div>
        <Accordion>
          <Accordion.Body>
            <div className="d-flex flex-column justify-content-center text-center">
              <div>
                <ImageWithFallback src={data.competitionLogo} type={'description'}/>
                <span className="text-body-1 mx-1">League Rank</span>
              </div>
              <div className="row my-2">
                <span className="col-6">{data.awayTeamEvent.leagueRank ? data.awayTeamEvent.leagueRank : 'Null' }</span>
                <span className="col-6">{data.homeTeamEvent.leagueRank ? data.homeTeamEvent.leagueRank : 'Null'}</span>
              </div>
              <div>
                <img src={halfTime} alt="half-time" className="description-icons"/>
                <span className="text-body-1 mx-1">Half Time Score</span>
              </div>
              <div className="my-2">
                <ComparationData home={data.homeTeamEvent.halfTime} away={data.awayTeamEvent.halfTime}/>
              </div>
              <div>
                <img src={corner} alt="corner" className="description-icons"/>
                <span className="text-body-1 mx-1">Corner Kick</span>
              </div>
              <div className="my-2">
                <ComparationData home={data.homeTeamEvent.cornerKick} away={data.awayTeamEvent.cornerKick}/>
              </div>
              <div>
                <img src={yellowCard} alt="yellow-card" className="description-icons"/>
                <span className="text-body-1 mx-1">Yellow Card</span>
              </div>
              <div className="my-2">
                <ComparationData home={data.homeTeamEvent.yellowCard} away={data.awayTeamEvent.yellowCard}/>
              </div>
              <div>
                <img src={redCard} alt="red-card" className="description-icons"/>
                <span className="text-body-1 mx-1">Red Card</span>
              </div>
              <div className="my-2">
                <ComparationData home={data.homeTeamEvent.redCard} away={data.awayTeamEvent.redCard}/>
              </div>
              <div>
                <img src={penaltyKick} alt="penalty-kick" className="description-icons"/>
                <span className="text-body-1 mx-1">Penalty Shootout Score</span>
              </div>
              <div className="my-2">
                <ComparationData home={data.homeTeamEvent.penaltyShootOutScore} away={data.awayTeamEvent.penaltyShootOutScore}/>
              </div>
            </div>
          </Accordion.Body>
          <Accordion.Header><img src={statistics} alt="icon" className="description-icons" style={{color:'gray'}}/><span className="text-body-1 mx-2">Statistics</span></Accordion.Header>
        </Accordion>
      </Card>
    </Col>
  )
}