import React, { Component } from 'react';
import { API_ROUTE } from '../../Constantes/ApiRoute.js';
import ListView from './ListView';
import BoardView from './BoardView';

class Match extends Component {
  constructor(props){
    super(props)
    this.fetchUpdate = null;
    this.state = {
      view : "list",
      matchDataList : [],
    }
    this.fetchMatchesData = this.fetchMatchesData.bind(this);
  }

  componentDidMount(){
    this.fetchMatchesData();
    this.fetchUpdate = setInterval(this.fetchMatchesData, 25000);
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
      .then((data) => this.setState({ matchDataList : data }));
  }

  render() {
    return (
          <div className="match-container">
            <div className="match-container-button">
            <button
              className={this.state.view === "list" ? "match-container-button-active" : ""}
              onClick={()=>this.setState({view : 'list'})}
            >
              Matches list
            </button>
            <button
              className={this.state.view === "board" ? "match-container-button-active" : "board-rsp"}
              onClick={()=>this.setState({view : 'board'})}
            >
              Matches board
            </button>
            </div>
            {this.state.view === "list" ? <ListView matchDataList={this.state.matchDataList}/> : <BoardView matchDataList={this.state.matchDataList}/>}
          </div>
    )
  }
}

export default Match;
