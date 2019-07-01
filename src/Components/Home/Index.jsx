import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import {postList} from '../../Constantes/Post.js';
import { API_ROUTE } from '../../Constantes/ApiRoute.js'
import ScoreTimeCard from './../Match/ScoreTimeCard.jsx'

class Home extends Component {

    state = {
        redirect: false,
        storage: null,
        matchToDisplay : {home_team:{code : "TBD", goals : ""}, away_team_events: [], away_team:{code : "TBD", goals : ""}, home_team_events : [], time : ""},
    };

     componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            this.getStorageData();
        } else {
            this.setState({redirect: false});
        }
        this.fetchMatchesData();
    }

    getStorageData() {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        this.setState({storage: testData});
    }

    fetchMatchesData(){
      fetch(API_ROUTE + 'matches',  {mode: 'cors', method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{
          if (res.status !== 200) {
             return;
          }
          return res.json()
        })
        .then((data) => {
          const curentMatchList = data.filter((match)=>{
            if (match.status === 'in progress' || match.status === "pending correction") {
              return match;
            }
          })
          const matchOfTheFuturList = data.filter((match)=>{
            if (match.status === "future") {
              return match;
            }
          })
          if(curentMatchList.length === 0){
            this.setState({matchToDisplay : matchOfTheFuturList[0]})
          }
          else {
            this.setState({matchToDisplay : curentMatchList[0]})
          }
        })
    }

  render() {

    if(this.state.redirect) {
      return(
          <Redirect to={routesList[0].path}/>
      )
    }
    return (
          <div className="content-home">
            <div className="field">
              <img src={homeImage} alt="home-footfem-img" />
              <h1>FootFem supports women's soccer !</h1>
                 {
                //     this.state.storage &&
                //     <h1 className="welcomeMessage">Welcome {this.state.storage.username.toUpperCase()} !</h1>
                 }
                <Link to={{pathname : routesList[10].path, aboutProps : {match : this.state.matchToDisplay}}}>
                  <ScoreTimeCard
                    match={this.state.matchToDisplay}
                    homeGoalList={[]}
                    awayGoalList={[]}
                  />
                </Link>
            </div>
            <div className="content-home-actu">
              <h2>News</h2>
              {
                postList.map((article, index)=>{
                  return(
                    <Link
                      to={{pathname : routesList[13].path, aboutProps : {article : article}}}
                      key={index}
                    >
                      <div className="articles-box">
                        <img src={article.image} alt="article Images" />
                        <div className="art-content-text">
                          <h3>{article.title}</h3>
                          <p className="art-author">by {article.author} - {article.date}</p>
                          <p className='article-resume'>{article.message}</p>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  )
                })
              }
            </div>
          </div>
    )
  }
}

export default Home;
