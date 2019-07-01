import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';
import mugshotPlayeuse from './../../Assets/Images/FemalPic.png';

class Statistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      scorerList : [],
      numberOfMatchPlayed : 0,
      numberOfGoalScored : 0,
      goalList : [],
      }
    }

    componentWillMount(){
      fetchDataToApi(API_ROUTE + "matches")
      .then((matchList)=>{

          const allMatchAlreadyPlayed = matchList.filter((match)=>{if (match.status === "completed"){return match;}});

          const allMatchOfHomeTeamAlreadyPlayedReformatList = allMatchAlreadyPlayed.map((match)=>{
            const finalObjectFormatList = match.home_team_events.map((event)=>{
               event.country = match.home_team_country;
               return event;
            })
            return finalObjectFormatList;
          })

          const allMatchOfAwayTeamAlreadyPlayedReformatList = allMatchAlreadyPlayed.map((match)=>{
            const finalObjectFormatList = match.away_team_events.map((event)=>{
               event.country = match.away_team_country;
               return event;
            })
            return finalObjectFormatList;
          })

          const allEventList = [];

          allMatchOfHomeTeamAlreadyPlayedReformatList.forEach((evtList)=>allEventList.push(...evtList))
          allMatchOfAwayTeamAlreadyPlayedReformatList.forEach((evtList)=>allEventList.push(...evtList))

          const allGoals = allEventList.filter((evt)=>{if (evt.type_of_event === "goal" || evt.type_of_event === "goal-penalty") {return evt}})

          const scorerNameListToCheck = [];
          const scorerNameListTmp = allGoals.filter((goal)=>{
            if (scorerNameListToCheck.indexOf(goal.player) === -1) {
              scorerNameListToCheck.push(goal.player);
              return goal
            }
          })

          const scorerList = scorerNameListTmp.map((goal)=>({name : goal.player, country : goal.country, goalList : []}));

          allGoals.forEach((goal)=>{
            scorerList.forEach((scorer)=>{
              if (goal.player === scorer.name) {
                scorer.goalList.push(goal);
              }
            })
          })
          this.setState({scorerList : scorerList.sort(this.compare), numberOfMatchPlayed : allMatchAlreadyPlayed.length, numberOfGoalScored : allGoals.length, goalList : allGoals})
      })
    }

    compare (a, b) {
      return (a.goalList.length - b.goalList.length) * -1;
    }


  render() {
    const goalPerMatch = Math.round((this.state.numberOfGoalScored / this.state.numberOfMatchPlayed) * 10) / 10;
    return (
          <div className='content-statistics-bck'>
          <div className='content-statistics'>
            <h3>Top 6 scorers</h3>
            <div className='content-top6'>
              {
                this.state.scorerList.map((scorer, index)=>{
                  if (index < 6) {
                    return(
                      <div key={index} className="box-playeuse-goal">
                        <img src={mugshotPlayeuse} alt="playeuse_portrait" />
                        <div className='stats-playeuse'>
                        <p className='name'>{scorer.name}</p>
                        <p className='country'>{scorer.country}</p>
                        <p className='nbGoal'><span className='goal'>{scorer.goalList.length}</span> goals</p>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
            <div className='content-global-stats'>
              <div className='stat-global'>
                <h2>Number of Match played</h2>
                <p>{this.state.numberOfMatchPlayed}</p>
              </div>
              <div className='stat-global'>
                <h2>Number of goals scored</h2>
                <p>{this.state.numberOfGoalScored}</p>
              </div>
              <div className='stat-global'>
                <h2>Goal per match</h2>
                <p>{goalPerMatch.toString()}</p>
              </div>
            </div>
          </div>
          </div>
    )
  }
}

export default Statistics;
