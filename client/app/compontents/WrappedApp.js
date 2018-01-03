import React from 'react';
import PropTypes from 'prop-types';
var NavLink = require('react-router-dom').NavLink;
import Sound from 'react-sound';

const Navbar = (props) => {
    const navbar = props.menu.map(choice =>
        <NavLink key={choice.to} exact activeClassName='active' to={choice.to}>
            {choice.text}
        </NavLink>
    );

    return (
        <nav>
            {navbar}
        </nav>
    );
};

Navbar.propTypes = {
    menu: PropTypes.array.isRequired
};


const Header = () => (
    <div className='header'>
        <NavLink exact activeClassName='active' to=''>
            <h1> Games </h1>
        </NavLink>
        <Navbar menu={[
            {text: "Login", to: "/login"},
            {text: "Create", to: "/create"},
            {text: "Socket", to: "/socket"},
            {text: "Profile", to: "/protected/profile"},

        ]}/>
    </div>
);


const Footer = () => (
    <footer>
        <h1> Nicklas Envall </h1>
    </footer>
);



class WrappedApp extends React.Component {
    render() {
        return (
            <div className='wrap-all' style={{
                backgroundImage: "url(../images/knight-background.jpg)"
            }}>
                <div className='container'>
                    <Header />
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}

WrappedApp.propTypes = {
    children: PropTypes.node.isRequired
};

module.exports = WrappedApp;
