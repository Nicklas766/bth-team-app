import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';


const NotLoginHeader = () => (
        <div className='login-nav'>
            <NavLink exact activeClassName='active' to='/login'> Login </NavLink>
            <NavLink exact activeClassName='active' to='/create'> Create </NavLink>
        </div>
);

const LoginHeader = (props) => (
        <div className='login-nav'>
            <NavLink exact activeClassName='active' to='/protected/profile'> {props.userName} </NavLink>
            {props.children}
        </div>
);


class Header extends React.Component {
    render() {
        const {loggedIn, user, children} = this.props;
        return (<div className='header'>

            <div className='logo'>
                <NavLink exact activeClassName='active' to=''>
                    <h1> Games </h1>
                </NavLink>
            </div>

            <div className='general-choice'>
                <NavLink exact activeClassName='active' to='/about'> Players </NavLink>
                <NavLink exact activeClassName='active' to='/about'> About </NavLink>
            </div>


                    {!loggedIn && <NotLoginHeader /> }
                    {loggedIn && <LoginHeader userName={user.name}>{children} </LoginHeader> }





        </div>);
    }
}

Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node, // logoutbutton
    user: PropTypes.object
};

module.exports = Header;
