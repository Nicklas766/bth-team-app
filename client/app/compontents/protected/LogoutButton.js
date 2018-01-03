var React = require('react');

import { Redirect } from 'react-router-dom';
var api = require('../../utils/api');

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

        this.setState({redirect: true});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to=''/>;
        }
        return <button onClick={this.logout} />;
    }
}

module.exports = LogoutButton;
