import './App.css';
import React, {useState, useEffect} from 'react'
import NavigationBar from './components/navbar'
import NavBottom from './components/navBottom'
import Home from './pages/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import API from './api'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App () {
  const [match, setMatch] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const fullDate = new Date()
    const year = fullDate.getFullYear()
    const month = fullDate.getMonth() > 9 ? fullDate.getMonth()+1 : '0' + (fullDate.getMonth()+1)
    const date = fullDate.getDate() > 9 ? fullDate.getDate() : '0' + fullDate.getDate()
    const {data} = await API.get(`api/football/match/matchfixtures?date=${year}${month}${date}`)
    const result = []
    const finish = data.result.filter(el => el.statusName === 'Ending')
    const upcoming = data.result.filter(el => el.statusName === 'NotStarted')
    const running = data.result.filter(el => el.statusName !== 'NotStarted' && el.statusName !== 'Ending' )
    result.push(running, upcoming, finish)
    setMatch(result)
  }

  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/upcoming">
            <Home data={match} dataMobile={match[1]}/>
          </Route>
          <Route path="/finished">
            <Home data={match} dataMobile={match[2]}/>
          </Route>
          <Route path="/">
            <Home data={match} dataMobile={match[0]}/>
          </Route>
        </Switch>
        <NavBottom />
      </div>
    </Router>
  );
}

export default App;