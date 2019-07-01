import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {REST_ROUTE} from "../../Constantes/ApiRoute";

class ListView extends Component {

  state = {
      storage: null,
      Authorization: '',
      matchFollowed: null
  };


  componentDidMount() {
    if(sessionStorage.getItem('userData')) {
      this.getNotifications();
    }
  }

    componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            this.getStorageData();
        }
    }

    getStorageData(value) {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        value = testData[value];
        return value;
    }

    createNotification = (venue, datetime, matchId) => {
        fetch(REST_ROUTE + 'notifications/new',  { mode: 'cors', method : 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  this.getStorageData('token'),
            },
            body : JSON.stringify({
                venue: venue,
                datetime: datetime,
                isFavorite: 1,
                matchId: matchId,
            })
        })
            .then((response) => {
                if(!(response.status >= 200 && response.status <= 300)) {
                    return response.json();
                } else {
                    this.getNotifications();
                    return response.json()
                }
            })
            .then((data)=>{
                this.setState({errorMessage: data.error});
            })

            .catch((err) => {
                console.log('error', err);
            })


    }

    deleteNotification(fifa_id) {
      this.state.matchFollowed.map((matchFollowed) => {
        if(matchFollowed.matchId === fifa_id) {
          fetch(REST_ROUTE + 'notifications/delete/' + fifa_id,  { mode: 'cors', method : 'post',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' +  this.getStorageData('token'),
              },
          })
              .then((response) => {
                  if(!(response.status >= 200 && response.status <= 300)) {
                      return response.json();
                  } else {
                    this.getNotifications();
                    return response.json()
                  }
              })
              .then((data)=>{
                  this.setState({errorMessage: data.error});
              })

              .catch((err) => {
                  console.log('error', err);
              })
        }
      })

    }

    getNotifications = () => {
      const recupUsername = JSON.parse(sessionStorage.getItem('userData'));
        fetch(REST_ROUTE + 'notifications/' + recupUsername.username,  { mode: 'cors', method : 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  this.getStorageData('token'),
            },
        })
            .then((response) => {
                if(!(response.status >= 200 && response.status <= 300)) {
                    return response.json();
                } else {
                    return response.json()
                }
            })
            .then((data)=>{
                this.setState({errorMessage: data.error});
                this.setState({matchFollowed: data})
            })
            .catch((err) => {
                console.log('error', err);
            })
    }

    dynamicFollowButtons(match) {
      if(sessionStorage.getItem('userData') && this.state.matchFollowed) {
        let matchIsFollowed = false;
          this.state.matchFollowed.forEach((matchFollowed) => {
            if(matchFollowed.matchId === match.fifa_id) {
              matchIsFollowed = true;
            }
          })
        if (!matchIsFollowed) {
          return(
            <button onClick={() => this.createNotification(match.venue, moment(match.datetime).format('MM-DD-YYYY hh:mm a'), match.fifa_id)} className="follow-match-button"><FontAwesomeIcon icon={faBell} /></button>
          )
        } else {
          return(
            <button onClick={() => this.deleteNotification(match.fifa_id)} className="follow-match-button followed"><FontAwesomeIcon icon={faBell} /></button>
          )
        }
      }
    }

  render() {
    const matchAlreadyPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "completed" || match.status === "end of time"){
        return match
      }
      return false;
    })

    const matchNotPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "future"){
        return match
      }
      return false;
    })

    const matchInProgressList = this.props.matchDataList.filter((match)=>{
      if(match.status === "in progress" || match.status === "pending correction"){
        return match
      }
      return false;
    })

    return (
          <div>
            {matchInProgressList.length === 0 ? "" : <h1>In Progress</h1>}
            {matchInProgressList.length === 0 ? "" : matchInProgressList.map((match, index)=>{
              return(
                <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}} key={index}>
                  <div className="match-card-row" >
                     <div className="country-card">
                        <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                        <p>{match.home_team_country}</p>
                     </div>
                    <div className="match-card-row-date">
                        <p>{match.time} {match.time === 'half-time' ? '' : 'Minutes'}</p>
                        <p>{match.home_team.goals} - {match.away_team.goals}</p>
                     </div>
                     <div className="country-card">
                        <p>{match.away_team_country}</p>
                        <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                     </div>
                  </div>
                </Link>
              )
            })}
            <h1>Calendar</h1>
            {matchAlreadyPlayedList.map((match, index)=>{
              return(
                <div key={index}>
                  {index === 36 || index === 44 || index === 48 || index === 50 || index === 51 ? <h1>{match.stage_name}</h1> : ""}
                  <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}} >
                    <div className="match-card-row" >
                       <div className="country-card">
                          <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                          <p>{match.home_team_country}</p>
                       </div>
                      <div className="match-card-row-score">
                          <p>{moment(match.datetime).format('MM-DD-YYYY')}</p>
                          <p>{match.home_team.goals} - {match.away_team.goals}</p>
                       </div>
                       <div className="country-card">
                          <p>{match.away_team_country}</p>
                          <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                       </div>
                    </div>
                  </Link>
                </div>
              )
            })}
            {matchNotPlayedList.map((match, index)=>{
              return(
                <div className="match-card-row-with-button" key={index}>
                  <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}}>
                    <div className="match-card-row">
                       <div className="country-card">
                        <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                          <p>{match.home_team_country}</p>
                       </div>
                      <div className="match-card-row-date">
                          <p>{moment(match.datetime).format('MM-DD-YYYY')}</p>
                          <p>{moment(match.datetime).format('hh:mm a')}</p>
                       </div>
                       <div className="country-card">
                          <p>{match.away_team_country}</p>
                          <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                       </div>

                    </div>
                  </Link>
                  {this.dynamicFollowButtons(match)}
                </div>
              )
            })}
          </div>
    )
  }
}






export default ListView;
