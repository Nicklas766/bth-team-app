var React = require('react');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;
import Sound from 'react-sound';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pass: '',
            message: '',
            showMsg: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login             = this.login.bind(this);
    }

    async login() {
        const statusCode = await api.login({
            name: this.state.name,
            pass: this.state.pass,
        });

        // Based on status code update state messages
        statusCode == 200 && this.setState({ showMsg: true,  message: 'You have logged in!'});
        statusCode == 401 && this.setState({ showMsg: true,  message: 'Wrong password!'});
        statusCode == 404 && this.setState({
            showMsg: true,
            message: 'This user does not exist, or something went wrong!'
        });
        console.log(statusCode);
    }


    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        return (
            <div className='content-container'>

                <div className='content-header'>
                    <h3> Login </h3>
                </div>
                <Sound
                    url="music/bensound-epic.mp3"
                    playStatus={Sound.status.PLAYING}
                    />
                {this.state.showMsg && <p className='login-info'> {this.state.message} </p>}

                <h3>Great to meet you! Please login.</h3>
                <div className='login-container'>
                    <input
                        name={"name"}
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        placeholder={"Username"}/>
                    <input
                        name={"pass"}
                        value={this.state.pass}
                        onChange={this.handleInputChange}
                        placeholder={"Password"}/>
                    <button onClick={this.login}>Login</button>

                    <Link to='/create'>Create a user</Link>
                </div>
            </div>
        );
    }
}

module.exports = Login;
