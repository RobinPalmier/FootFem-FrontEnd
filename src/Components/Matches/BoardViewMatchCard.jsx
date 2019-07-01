import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {routesList} from '../../Constantes/Routes.js';

class BoardViewMatchCard extends Component {
  render() {
    return (
      <Link to={{pathname : routesList[10].path , aboutProps : {match : this.props.match}}}>
        <div className={"match-card " + this.props.class}>

          {
            this.props.match.stage_name === 'Final' &&
                 <p className="final">Final</p>
          }
            <div className="content-board">
              <div>
                <img src={require("./../../Assets/Images/Flags/" + this.props.match.home_team.code + ".jpg")} alt="flag"/> {this.props.match.home_team_country}
              </div>
              {this.props.match.home_team.goals}
            </div>
            <div className="timer-board">
              {this.props.match.status === "future"?  <div><p>{moment(this.props.match.datetime).format('MM-DD-YYYY')}</p><p>{moment(this.props.match.datetime).format('hh:mm a')}</p></div> : <p>{this.props.match.time}</p>}
            </div>
            <div className="content-board">
              <div>
                <img src={require("./../../Assets/Images/Flags/" + this.props.match.away_team.code + ".jpg")} alt="flag"/>{this.props.match.away_team_country}
              </div>
              {this.props.match.away_team.goals}
            </div>
        </div>
      </Link>
    )
  }
}

export default BoardViewMatchCard;
