import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/Styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    Route,
    Switch,
    BrowserRouter
} from 'react-router-dom';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path="/" name="Home" component={App}/>
        </Switch>
    </BrowserRouter>
),document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
