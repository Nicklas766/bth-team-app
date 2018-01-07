import React from 'react';
import api from '../utils/api';

// Import parts
import RouteHandler from './RouteHandler';
import Header from './parts/Header';
import Footer from './parts/Footer';
import LogoutButton from './parts/LogoutButton';
/**
* The login checker is a wrapper before our app we can send props to our app
* so we can in our actual pages see if logged in or update the state of header.
*/


class LoginChecker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.login();
    }

    // If we get user object back we are logged in and can update state
    async login() {
        const data = await api.fetchProfile();

        if (data.data.name !== undefined) {
            this.setState({user: data.data, loggedIn: true});
        }
    }


    logout() {
        this.setState({loggedIn: false});
    }
    // <Audio url='../music/bensound-epic.mp3'><Login setLoggedIn={this.login}/></Audio>
    render() {
        const {loggedIn, user} = this.state;

        return (<div className='container'>

            <Header loggedIn={loggedIn} user={user}>
                <LogoutButton loggedIn={loggedIn} logout={this.logout}/>
            </Header>

            <RouteHandler login={this.login}/>

            <Footer/>
        </div>);
    }
}

module.exports = LoginChecker;
