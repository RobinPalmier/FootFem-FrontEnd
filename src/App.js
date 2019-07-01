import React from 'react';
import './Assets/Styles/App.css';
import { Route, Redirect } from 'react-router-dom';
import {routesList} from './Constantes/Routes.js';
import Header from './Components/Header/Index.jsx';
import Footer from './Components/Footer/Index.jsx';

function App() {
  return (
    <div className="App">
      <Header />
        {
            routesList.map((prop,key) => {
                if(prop.redirect)
                    return (
                        <Redirect from={prop.path} to={prop.to} key={key}/>
                    );
                return (
                    <Route path={prop.path} component={prop.component} key={key}/>
                );
            })
        }
      <Footer />
    </div>
  );
}

export default App;
