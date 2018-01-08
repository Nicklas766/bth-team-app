import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import InputForm from './InputForm';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pass: '',
            message: '',
            showMsg: false,
            loggedIn: false
        };
        this.handleChange      = this.handleChange.bind(this);
        this.login             = this.login.bind(this);
    }

    async login() {
        const statusCode = await api.login({
            name: this.state.name,
            pass: this.state.pass,
        });

        // Based on status code update state messages
        if (statusCode == 200) {
            this.setState({ loggedIn: true});
            this.props.login();
        }
        statusCode == 401 && this.setState({ showMsg: true,  message: 'Wrong password!'});
        statusCode == 404 && this.setState({
            showMsg: true,
            message: 'This user does not exist, or something went wrong!'
        });
        console.log(statusCode);
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/protected/profile" />;
        }
        return (
            <div className='content-container'>

                <div className='content-header'>
                    <h3> Login </h3>
                </div>

                {this.state.showMsg && <p className='login-info'> {this.state.message} </p>}

                <h3>Great to meet you! Please login.</h3>
                <InputForm
                    name={this.state.name}
                    pass={this.state.pass}
                    repeat={false}
                    onSelect={this.login}
                    handleChange={this.handleChange}
                    buttonText={'Login'}
                />

                <Link style={{
                    margin: "24px 0", color: "#1eaadd", display: 'block'
                }} to='/create'>Create a user</Link>

            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

module.exports = Login;
