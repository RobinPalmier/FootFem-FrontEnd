import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SecondeNav extends Component {
  render() {
    return (
          <div className="secondNav">
            <nav>
              <ul>
                <li>
                  <NavLink to={this.props.routesList[5].path} activeClassName="active">
                      {this.props.routesList[5].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[6].path} activeClassName="active">
                      {this.props.routesList[6].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[7].path} activeClassName="active">
                      {this.props.routesList[7].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[8].path} activeClassName="active">
                      {this.props.routesList[8].name}
                  </NavLink>
                </li>
                  <li>
                      {
                          sessionStorage.getItem('userData') &&
                          <NavLink to={this.props.routesList[11].path} activeClassName="active">
                              {this.props.routesList[11].name}
                          </NavLink>
                      }
                  </li>
              </ul>
            </nav>
          </div>
    )
  }
}

export default SecondeNav;
