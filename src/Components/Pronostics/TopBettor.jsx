import React, { Component } from 'react';
import {REST_ROUTE} from "../../Constantes/ApiRoute";


class TopBettor extends Component {
  state = {
    allPronostics: [],
  }

  componentDidMount() {
    this.getAllPronostics();
  }

  getPronosticsUsers() {
    const allUsers = this.state.allPronostics.map((pronostic, index) => {
      return pronostic;
    })
    let arrayDisplay = [];
    for (let i = 0; i < allUsers.length; i++) {
      console.log(allUsers[i].username);
      arrayDisplay.push(allUsers[i].username);
    }

    let a = [], b = [], prev;

    console.log(arrayDisplay.sort());
    for(var j = 0; j < arrayDisplay.length; j++) {
      if(arrayDisplay[j] !== prev) {
        a.push(arrayDisplay[j]);
        b.push(1);
      } else {
        b[b.length-1]++;
      }
      prev = arrayDisplay[j];
    }
    var realTab = a;
    console.log(realTab);
  let finalTab = [];
  for (var i = 0; i < realTab.length; i++) {
   finalTab.push({
     username: realTab[i],
     nbMatchProno: this.occurence(arrayDisplay)[realTab[i]].length
   });
  }
  console.log(finalTab);
  this.sortArray(finalTab);
  this.setState({displayTab: finalTab});
  console.log(this.state.displayTab);

  }

  sortArray(array) {
    array.sort((a,b) => {
      return b.nbMatchProno - a.nbMatchProno;
    })
  }

occurence (array) {
      "use strict";
      let result = {};
      if (array instanceof Array) { // Check if input is array.
          array.forEach(function (v, i) {
              if (!result[v]) { // Initial object property creation.
                  result[v] = [i]; // Create an array for that property.
              } else { // Same occurrences found.
                  result[v].push(i); // Fill the array.
              }
          });
      }
      return result;
  }

  getAllPronostics() {
    fetch(REST_ROUTE + 'pronostics/get/all',  { mode: 'cors', method : 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
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
            console.log(data);
            this.setState({allPronostics: data});
            return true;
        })
        .then((response) => {
          this.getPronosticsUsers();
        })

        .catch((err) => {
            console.log('error', err);
        })
  }

  render() {
    return(
      <div className='top-bettor-content'>
        <h2>Top Bettor</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Nb Pronostic</th>
              </tr>
            </thead>
            <tbody>
        {
          this.state.displayTab && this.state.displayTab.map((player, index) => {
            return(
              <tr key={index}>
                <td><p className='rsp-table-topbettor'>Username</p>{player.username}</td>
                <td><p className='rsp-table-topbettor'>Nb Pronostic</p>{player.nbMatchProno}</td>
              </tr>
            )
          })
        }
        </tbody>
        </table>
      </div>
    )
  }
}

export default TopBettor;
