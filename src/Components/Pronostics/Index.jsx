import React, { Component } from 'react';
import { API_ROUTE } from '../../Constantes/ApiRoute.js';
import MyBets from './MyBets';
import TopBettor from './TopBettor';
import Bet from './Bet';


class Pronostics extends Component {
  constructor(props){
    super(props)
    this.fetchUpdate = null;
    this.state = {
      view : "bet",
      matchDataList : [],
      matchToProvide: null,
      successMessage: '',
    }
    this.fetchMatchesData = this.fetchMatchesData.bind(this);
    this.deleteABet = this.deleteABet.bind(this)
  }

  componentDidMount(){
    this.fetchMatchesData();
    // this.fetchUpdate = setInterval(this.fetchMatchesData, 25000);
  }

  componentWillUnmount(){
    window.clearInterval(this.fetchUpdate)
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
      .then((data) => this.setState({ matchDataList : data }))
  }

 deleteABet(match){
   let matchDataListTmp = this.state.matchDataList.filter((matchBet)=>{
     if (matchBet.fifa_id !== match.fifa_id) {
       return match
     }
   });
   this.setState({matchDataList : matchDataListTmp, successMessage: 'Your bet has been added.'})
   // alert("Your bet is registered");
 }

 resetMessage() {
   this.setState({successMessage: ''});
 }

  smallRouter() {
    if (this.state.view === 'bet') {
      return(
        <Bet matchDataList={this.state.matchDataList} resetMessage={this.resetMessage.bind(this)} fetchMatchesData={this.fetchMatchesData.bind(this)} deleteABet={this.deleteABet} successMessage={this.state.successMessage}/>
      )
    } else if(this.state.view === 'mybets') {
      return(
        <MyBets fetchMatchesData={this.fetchMatchesData.bind(this)}/>
      )
    } else if(this.state.view === 'topbettor'){
      return(
        <TopBettor/>
      )
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="content-pronostics">
        <div className="content-pronostics-buttons">
          <button
            className={this.state.view === "bet" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'bet'})}
          >
            Bet
          </button>
          <button
            className={this.state.view === "mybets" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'mybets'})}
          >
            My Bets
          </button>
          <button
            className={this.state.view === "topbettor" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'topbettor'})}
          >
            Top Bettors
          </button>
        </div>
        {this.smallRouter()}
      </div>
    )
  }
}

export default Pronostics;
