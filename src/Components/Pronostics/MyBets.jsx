import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {REST_ROUTE} from "../../Constantes/ApiRoute";


class MyBets extends Component {


  state = {
    matchPronosticed: [],
  }

componentDidMount() {
  this.getPronostics();
}


getStorageData(value) {
  const testData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(testData);
  value = testData[value];
  return value;
}

deletePronostic() {

}

getPronostics() {
  const recupUsername = JSON.parse(sessionStorage.getItem('userData'));
  fetch(REST_ROUTE + 'pronostics/' + recupUsername.username,  { mode: 'cors', method : 'get',
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
          this.setState({matchPronosticed: data})
          console.log(this.state.matchPronosticed);
      })

      .catch((err) => {
          console.log('error', err);
      })
}

deletePronostic(matchId) {
  this.state.matchPronosticed.map((matchPronosticed) => {
    if(matchPronosticed.matchId == matchId) {
      fetch(REST_ROUTE + 'pronostics/delete/' + matchId,  { mode: 'cors', method : 'post',
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
                this.getPronostics();
                this.props.fetchMatchesData();
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

  render() {
    return(
      <div className='my-bet-all'>
        <h2>MyBets</h2>
        <div className="content-myBet-all">
        {
          this.state.matchPronosticed.map((match, index) => {
            return(
              <div key={index} className='content-card-bet'>
                  <div className='card-bet'>
                   <div className="card-country-myBet">
                    <img src={require("./../../Assets/Images/Flags/" + match.home_team + ".jpg")} alt="flag"/>
                    <p>{match.home_team}</p>
                   </div>
                   <p className="versus">VS</p>
                   <div className="card-country-myBet">
                     <p>{match.away_team}</p>
                    <img src={require("./../../Assets/Images/Flags/" + match.away_team + ".jpg")} alt="flag"/>
                   </div>
                   <p className="my-pronostic">My pronostic : {match.pronostic === '0' ? 'DRAW' : match.pronostic}</p>
                   <button onClick={() => this.deletePronostic(match.matchId)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                 </div>
               </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default MyBets;
