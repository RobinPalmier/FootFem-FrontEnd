import React, { Component } from 'react';
import moment from 'moment';

class ScoreTimeCard  extends Component {

    render() {
        return (
          <div className="field-score-card">
            <div className="field-country-card">
              <img src={require('./../../Assets/Images/Flags/' + this.props.match.home_team.code + ".jpg")} alt="flag" />
              <p>{this.props.match.home_team.code === "TBD" ? "" : this.props.match.home_team.code}</p>
              <div className="goal-conatiner">
                {this.props.homeGoalList.map((goal, index)=>{
                  return <p key={index}><i className="fas fa-futbol"></i> {goal.player} {goal.time}</p>
                })}
              </div>
            </div>
            <div className="field-time-score-card">
              <p>{this.props.match.time}</p>
              <p>{this.props.match.status === "future" ? moment(this.props.match.datetime).format("hh:mm a"): ""}</p>
              <p>{this.props.match.status === "future" ? moment(this.props.match.datetime).format("MM-DD-YYYY"): ""}</p>
              <p>{this.props.match.home_team.goals === undefined || this.props.match.status === "future" ? "" : this.props.match.home_team.goals + " - "}{this.props.match.away_team.goals === undefined || this.props.match.status === "future" ? "" : this.props.match.away_team.goals }</p>
            </div>
            <div className="field-country-card">
              <img src={require('./../../Assets/Images/Flags/' + this.props.match.away_team.code + ".jpg")} alt="flag" />
              <p>{this.props.match.away_team.code === "TBD" ? "" : this.props.match.away_team.code}</p>
              <div className="goal-conatiner">
                {this.props.awayGoalList.map((goal, index)=>{
                  return <p key={index}><i className="fas fa-futbol"></i> {goal.player} {goal.time}</p>
                })}
              </div>
            </div>
          </div>
        )
    }
}

export default ScoreTimeCard;
