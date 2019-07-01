import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';
import { Link } from 'react-router-dom';
import { routesList } from '../../Constantes/Routes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Groups extends Component {
  constructor(props){
    super(props)
    this.state = {
      groupList : [],
      groupIdToDisplay : 0,
      groupeTodisplay : {letter : "", ordered_teams : [{country : "", games_played : 0, draws : 0, fifa_code : "TBD"}]}
    }
  }
  componentDidMount(){
    fetchDataToApi(API_ROUTE + 'teams/group_results', 'GET')
    .then((groupList)=>{
      this.setState({groupList, groupeTodisplay : groupList[this.state.groupIdToDisplay]})
    });
  }

  goNext(){
    const groupIdToDisplay = this.state.groupIdToDisplay + 1;
    this.setState({groupIdToDisplay, groupeTodisplay : this.state.groupList[groupIdToDisplay]})
  }

  goPrevious(){
    const groupIdToDisplay = this.state.groupIdToDisplay - 1;
    this.setState({groupIdToDisplay, groupeTodisplay : this.state.groupList[groupIdToDisplay]})
  }

  render() {
    return (
          <div className="content-groups">
            <h1 className="rsp-table-group">Group {this.state.groupeTodisplay.letter}</h1>
            <table>
              <thead>
                <tr>
                  <th>Group {this.state.groupeTodisplay.letter}</th>
                  <th>Games Played</th>
                  <th>Win</th>
                  <th>Loose</th>
                  <th>Goal For</th>
                  <th>Goal Against</th>
                  <th>Goals Differential</th>
                  <th>Draws</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {this.state.groupeTodisplay.ordered_teams.map((team, index)=>{
                  return(
                      <tr key={index}>
                        <td>
                            <Link to={{pathname : routesList[14].path, aboutProps : {team : team}}} >
                              <img src={require('./../../Assets/Images/Flags/' + team.fifa_code + ".jpg")} alt="flag"/>{team.country}
                            </Link>
                        </td>
                        <td>
                          <p className="rsp-table-group">Games Played</p>
                          {team.games_played}
                        </td>
                        <td>
                          <p className="rsp-table-group">Win</p>
                          {team.wins}
                        </td>
                        <td>
                          <p className="rsp-table-group">Loose</p>
                          {team.losses}
                        </td>
                        <td>
                          <p className="rsp-table-group">Goals For</p>
                          {team.goals_for}
                        </td>
                        <td>
                          <p className="rsp-table-group">Goals Against</p>
                          {team.goals_against}
                        </td>
                        <td>
                        <p className="rsp-table-group">Goals Differential</p>
                          {team.goal_differential}
                        </td>
                        <td>
                          <p className="rsp-table-group">Draws</p>
                          {team.draws}
                        </td>
                        <td>
                          <p className="rsp-table-group">Points</p>
                          {team.points}
                        </td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='content-button'>
              {this.state.groupIdToDisplay > 0 ? <button onClick={this.goPrevious.bind(this)} className='prev-button-group'><FontAwesomeIcon icon={faArrowLeft} className='picto-groups'/> Previous</button> : ""}
              {this.state.groupIdToDisplay < 5 ? <button onClick={this.goNext.bind(this)} className='next-button-group'>Next <FontAwesomeIcon icon={faArrowRight} className='picto-groups'/> </button> : ""}
            </div>
          </div>
    )
  }
}

export default Groups;
