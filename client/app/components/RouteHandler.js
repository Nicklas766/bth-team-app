import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Sound from 'react-sound';


// Components
import Home from './page/Home';
import About from './page/About';
import Login from './login/Login';
import Create from './login/Create';
// Protected paths in express.js, all who require socket.io
import Profile from './protected/Profile.js';


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
                    <Route exact path='/about' component={About} />
                    <Route exact path='/create' component={Create} />
                    <Route exact path='/login' component={() => <Login login={login}/>} />
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
