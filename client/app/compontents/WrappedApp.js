var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var Link = require('react-router-dom').Link;

const Navbar = (props) => {
    const navbar = props.menu.map(choice =>
        <NavLink key={choice.to} exact activeClassName='active' to={choice.to}>
            {choice.text}
        </NavLink>
    )
    return (
        <div style={{ width: "70%" }}>
            {navbar}
        </div>
    )
}

const Header = (props) => (
    <div className='header'>
        <Navbar menu={[
            {text: "Hem", to: "/"},
            {text: "Login", to: "/login"},
            {text: "Create", to: "/create"},

        ]}/>
    </div>
);

const Footer = (props) => (
    <footer>
        <h1> Nicklas Envall </h1>
    </footer>
);



class WrappedApp extends React.Component {
    render() {
        return (
            <div className='container'>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

module.exports = WrappedApp;
