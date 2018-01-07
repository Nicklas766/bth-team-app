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

const Audio = (props) => (
    <div style={{width: '100%'}}>
        <Sound url={props.url} playStatus={Sound.status.PLAYING} />
        {props.children}
    </div>
);

Audio.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

const HomePage = () => (<Audio url={'../music/bensound-ofeliasdream.mp3'}><Home /></Audio>);



class RouteHandler extends React.Component {
    render() {
        const {login} = this.props;

        return (
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/about' component={About} />
                <Route exact path='/create' component={Create} />
                <Route exact path='/login' component={() =>
                    <Audio url={'../music/bensound-epic.mp3'}><Login login={login}/></Audio>}
                />
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
