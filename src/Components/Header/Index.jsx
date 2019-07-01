import React, { Component } from 'react';
import FirstNav from './FirstNav.jsx';
import SecondeNav from './SecondeNav.jsx';
import {routesList} from '../../Constantes/Routes.js';

class Header extends Component {

  render() {
    return (
          <header>
            <FirstNav
              routesList={routesList}
            />
            <SecondeNav
              routesList={routesList}
            />
          </header>
    )
  }
}

export default Header;
