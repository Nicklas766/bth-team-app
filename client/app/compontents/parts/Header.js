import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


const NotLoginHeader = () => (
    <nav>
        <NavLink exact activeClassName='active' to='/about'> About </NavLink>
        <NavLink exact activeClassName='active' to='/login'> Login </NavLink>
        <NavLink exact activeClassName='active' to='/create'> Create </NavLink>
    </nav>
);

const LoginHeader = (props) => (
    <nav>
        <NavLink exact activeClassName='active' to='/about'> About </NavLink>
        <NavLink exact activeClassName='active' to='/protected/profile'> {props.userName} </NavLink>
    </nav>
);


class Header extends React.Component {
    render() {
        const {loggedIn, user, children} = this.props;
        return (<div className='header'>

                <NavLink exact activeClassName='active' to=''>
                    <h1> Games </h1>
                </NavLink>

                {!loggedIn && <NotLoginHeader /> }
                {loggedIn && <LoginHeader userName={user.name} /> }

                {children}
        </div>);
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node, // logoutbutton
    user: PropTypes.object
};

module.exports = Header;
