import React from 'react';
import PropTypes from 'prop-types';
import LoginChecker from './LoginChecker';


// Router
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
import api from '../utils/api';


class App extends React.Component {
    render() {
        return (<Router>
                <div className='wrap-all' style={{backgroundImage: "url(../images/knight-background.jpg)"}}>

                <LoginChecker />

                </div>

                </Router>);
    }
}

module.exports = App;
