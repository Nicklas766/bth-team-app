var React = require('react');
import io from 'socket.io-client';

var api = require('../../utils/api');

import SocketBoard from './SocketBoard.js';


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
             user: data,
             loading: false
         })
     }).
     catch(err => console.log(err));
}

    showProfile() {
        this.setState({games: false})
    }
    showCommunity() {
        this.setState({games: true})
    }

  render() {
    return (
        <div className='content-container'>
            {this.state.loading && <p> loading </p>}


            <div className='profile-nav'>

                <img src="../images/knight.jpg"/>

                <a onClick={this.showProfile} className='profile'>
                   <img src="../images/user.png"/> <p> Profile </p>
                  </a>
                <a onClick={this.showCommunity}> <img src="../images/group.png"/> <p>Search for games </p> </a>

            </div>

            {this.state.games &&
            <div style={{minHeight: "250px", width: "100%", background: '#1E2326'}}>
                <SocketBoard user={this.state.user} />
            </div>}

            {!this.state.games &&
            <div style={{minHeight: "250px", width: "100%", background: '#1E2326'}}>
                {this.state.user.name}
                <h3> Wins: {this.state.user.name}</h3>
                <h3> losses: {this.state.user.name}</h3>
            </div>}


        </div>
    );


  }
}

module.exports = Profile;
