import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import {REST_ROUTE} from "../../Constantes/ApiRoute";

class UserUpdate extends Component {

modifAdmin(id, admin){
  if(admin){
    admin = 0;
  }else{
    admin = 1
  }

  fetchDataToApi(REST_ROUTE + 'users/setAdmin/' + id, 'PUT', {isAdmin: admin})
  .then((response)=>{
    this.props.getAllUsers();
  })

}

  render() {
    console.log(this.props.listUsers);
    return(
      <div className='wrapper-listComments'>
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>LastName</th>
              <th>Username</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>
        {
          this.props.listUsers.map((users, index)=>{
            return(
                <tbody key={index}>
                  <tr>
                    <td><p className='rsp-table-admin'>Firstname</p>{users.firstname}</td>
                    <td><p className='rsp-table-admin'>LastName</p>{users.lastname}</td>
                    <td><p className='rsp-table-admin'>Username</p>{users.username}</td>
                    <td><p className='rsp-table-admin'>Email</p>{users.email}</td>
                    <td><p className='rsp-table-admin'>isAdmin</p>
                      <button onClick={this.modifAdmin.bind(this, users.id, users.isAdmin)}>
                        <div className={users.isAdmin === false ? "toggle-container" : "toggle-container contenaire-button-admin"}>
                          <div className={users.isAdmin === false ? "toggle-cursor" : "toggle-cursor button-admin"}>
                          </div>
                        </div>
                      </button>
                  </td>
                  </tr>
                </tbody>
            )
          })
        }
        </table>
      </div>
    )
  }
}

export default UserUpdate;
