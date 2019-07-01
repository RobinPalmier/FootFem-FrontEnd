import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class Footer extends Component {
  render() {
    return (
          <footer>
            <p>©2019 FootFem</p>
            <NavLink to={routesList[9].path} activeClassName="active">
              Legales Notices
            </NavLink>
          </footer>
    )
  }
}

export default Footer;
