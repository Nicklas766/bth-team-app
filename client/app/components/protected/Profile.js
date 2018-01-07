import React from 'react';
import PropTypes from 'prop-types';
import SocketBoard from './SocketBoard.js';
var api = require('../../utils/api');

const ProfileNav = (props) => {
    return (
        <div className='profile-nav'>
            <img src="../images/knight.jpg"/>
            <a onClick={props.showProfile.bind(this)} className='profile'>
                <img src="../images/user.png"/> <p> Profile </p>
            </a>
            <a onClick={props.showCommunity.bind(this)}> <img src="../images/group.png"/>
                <p>Search for games </p>
            </a>
        </div>
    );
};

ProfileNav.propTypes = {
    showProfile: PropTypes.func.isRequired,
    showCommunity: PropTypes.func.isRequired
};

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true,
            games: false
        };
        this.showProfile  = this.showProfile.bind(this);
        this.showCommunity = this.showCommunity.bind(this);
    }

    componentDidMount() {
        api.fetchProfile().then(data => {
            this.setState({
                user: data.data,
                loading: false
            });
        }).
            catch(err => console.log(err));
    }

    showProfile() {
        this.setState({games: false});
    }
    showCommunity() {
        this.setState({games: true});
    }

    render() {
        return (
            <div className='content-container'>

                {this.state.loading && <p> loading </p>}

                <ProfileNav showProfile={this.showProfile} showCommunity={this.showCommunity}/>

                {this.state.games &&
                <div style={{minHeight: "250px", width: "100%", background: '#1E2326'}}>
                    <SocketBoard user={this.state.user} />
                </div>}

                {!this.state.games &&
                 <div className='profile-nav'>
                     <h3> {this.state.user.name} </h3>
                     <h3> Wins: {this.state.user.wins}</h3>
                     <h3> Losses: {this.state.user.losses}</h3>
                 </div>}
            </div>
        );
    }
}

module.exports = Profile;
