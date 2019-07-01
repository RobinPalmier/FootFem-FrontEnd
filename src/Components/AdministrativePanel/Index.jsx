import React, { Component } from 'react';
import ListComment from './ListComment';
import UserUpdate from './UserUpdate';
import {REST_ROUTE} from "../../Constantes/ApiRoute";
import { fetchDataToApi } from './../../Functions/FetchToApi.js';

class AdministrativePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewAdmin: 'ListComment',
      listComments: [],
      listUsers: [],
    }
  }

  componentDidMount() {
    this.getAllComments();
    this.getAllUsers();
  }

  getAllComments () {
    fetchDataToApi(REST_ROUTE + 'comments/', 'GET')
    .then((listComments)=>{
      this.setState({listComments});
    })
    .then((response) => {
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                return response.json()
            }
        })
        .then((data)=>{
        })
        .catch((err) => {
            console.log('error', err);
      })
  }

  getAllUsers(){
    fetchDataToApi(REST_ROUTE + 'users/', 'GET')
    .then((listUsers)=>{
      this.setState({listUsers});
    })
    .then((response) => {
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                return response.json()
            }
        })
        .then((data)=>{

        })
        .catch((err) => {
            console.log('error', err);
        })
  }

  render() {
    return (
      <div className='content-administrativePanel'>
          <h1>Administrative Panel</h1>
          <button
            className={this.state.viewAdmin === "ListComment" ? "adminPanel-button-active" : "adminPanel-button"}
            onClick={()=>this.setState({viewAdmin : 'ListComment'})}
          >
            Comment list
          </button>
          <button
            className={this.state.viewAdmin === "UserUpdate" ? "adminPanel-button-active" : "adminPanel-button"}
            onClick={()=>this.setState({viewAdmin : 'UserUpdate'})}
          >
            Update user
          </button>
          {this.state.viewAdmin === "ListComment" ? <ListComment getAllComments={this.getAllComments.bind(this)} listComments={this.state.listComments} /> : <UserUpdate getAllUsers={this.getAllUsers.bind(this)} listUsers={this.state.listUsers}/>}
      </div>
    )
  }
}

export default AdministrativePanel;
