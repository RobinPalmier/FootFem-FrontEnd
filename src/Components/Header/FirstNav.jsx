import React, { Component } from 'react';
import logo from '../../Assets/Images/Logo_FootFem.gif'
import { NavLink } from 'react-router-dom';

class FirstNav extends Component {
    state= {
        showSignOut: false,
    };

  componentDidMount() {
      if(sessionStorage.getItem('userData')) {
          this.setState({showSignOut: true});
      } else {
          this.setState({showSignOut: false});
      }
  }

  signOut = () => {
      sessionStorage.setItem('userData', '');
      sessionStorage.clear();
      this.setState({showSignOut: false});
  };

  render() {
    return (
          <div className="firstNav">
            <img src={logo} alt="FootFem"/>
            <nav>
              <ul>
                <li>
                  <NavLink to={this.props.routesList[0].path} activeClassName="active">
                      {this.props.routesList[0].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[1].path} activeClassName="active">
                      {this.props.routesList[1].name}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.routesList[2].path} activeClassName="active">
                      {this.props.routesList[2].name}
                  </NavLink>
                </li>
                <li>
                    {
                        sessionStorage.getItem('userData') &&
                        <NavLink to={this.props.routesList[12].path} activeClassName="active">
                            {this.props.routesList[12].name}
                        </NavLink>
                    }
                </li>
                <li>
                    {
                      sessionStorage.getItem('userData') &&
                        JSON.parse(sessionStorage.getItem('userData')).isAdmin &&
                        <NavLink to={this.props.routesList[15].path} activeClassName="active">
                            {this.props.routesList[15].name}
                        </NavLink>
                    }
                </li>
              </ul>
              <ul>
                  <li>
                      {
                          this.state.showSignOut === true &&
                            <NavLink onClick={this.signOut} to={this.props.routesList[3].path} activeClassName="active">Sign out</NavLink>
                      }
                  </li>
                  {
                      this.state.showSignOut === false &&
                      <li>
                          <NavLink to={this.props.routesList[3].path} activeClassName="active">
                              {this.props.routesList[3].name}
                          </NavLink>
                      </li>
                  }
                  {
                      this.state.showSignOut === false &&
                      <li>
                          <NavLink to={this.props.routesList[4].path} activeClassName="active">
                              {this.props.routesList[4].name}
                          </NavLink>
                      </li>
                  }
              </ul>
            </nav>
          </div>
    )
  }
}

export default FirstNav;
