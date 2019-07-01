import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {REST_ROUTE} from "../../Constantes/ApiRoute";

class ListComment extends Component {

  getStorageData(value) {
      const testData = JSON.parse(sessionStorage.getItem('userData'));
      value = testData[value];
      return value;
  }

  deleteComment(idComment){
    fetchDataToApi(REST_ROUTE + 'comments/delete/' + idComment, 'POST', {id: idComment})
    .then((response)=>{
      this.props.getAllComments();
    })
  }

  render() {
    return(
      <div className='wrapper-listComments'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Author</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Delete</th>
            </tr>
          </thead>
        {
          this.props.listComments.map((comment, index)=>{
            return(
                <tbody key={index}>
                  <tr>
                    <td><p className='rsp-table-admin'>Id</p>{comment.id}</td>
                    <td><p className='rsp-table-admin'>Author</p>{comment.comment_author}</td>
                    <td><p className='rsp-table-admin'>Date</p>{comment.date}</td>
                    <td><p className='rsp-table-admin'>Comment</p>{comment.description.length > 150 ? comment.description.substr(0, 150) + '...' : comment.description}</td>
                    <td><p className='rsp-table-admin'>Delete</p><button onClick={() => this.deleteComment(comment.id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
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

export default ListComment;
