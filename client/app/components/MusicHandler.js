import React from 'react';
import PropTypes from 'prop-types';
// Router
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
import { Redirect, Switch } from 'react-router-dom';
import api from '../utils/api';
import Sound from 'react-sound';
// Wrapper


// Route Paths
var Home = require('./page/Home');

// Login and Create
var Login = require('./login/Login');
var Create = require('./login/Create');

// Protected paths in express.js, all who require socket.io
var Profile = require('./protected/Profile.js');

const Main = (props) => {
    return (<div>
        <Sound url={'../music/bensound-ofeliasdream.mp3'} playStatus={Sound.status.PLAYING} />
        {props.children}
    </div>);
}


class RouteHandler extends React.Component {
// <Audio url='../music/bensound-epic.mp3'><Login setLoggedIn={this.login}/></Audio>
    render() {
        const {login} = this.props;
        return (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route handler={Main}>
                        <Route exact path='/login' component={() => <Login login={login}/>} />
                        <Route exact path='/create' component={Create} />
                     </Route>

                    <Route exact path='/protected/profile' component={Profile} />

                    <Route render={() => <div><h1>404 not found</h1></div>} />
                </Switch>
        );
    }
}

RouteHandler.propTypes = {
    login: PropTypes.func.isRequired
};

module.exports = RouteHandler;
