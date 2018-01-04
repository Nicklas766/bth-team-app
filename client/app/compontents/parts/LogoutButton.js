import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import api from '../../utils/api';

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
        this.logout = this.logout.bind(this);
    }

    async logout() {
        await api.logout();
        this.props.logout();
        this.setState({redirect: true});
    }


    render() {
        if (!this.props.loggedIn) {
            return <div></div>;
        }

        return <Link to='/'><button onClick={this.logout}> Logout </button></Link>;
    }
}

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired
};


module.exports = LogoutButton;
