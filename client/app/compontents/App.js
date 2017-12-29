var React = require('react');

// Router
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

// Wrapper
var WrappedApp = require('./WrappedApp');

// Route Paths
var Home = require('./page/Home');

// Login and Create
var Login = require('./login/Login');
var Create = require('./login/Create');

// Protected paths in express.js


class App extends React.Component {
    render() {
        return (
            <Router>
                <WrappedApp>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/create' component={Create} />
                        <Route render={() => <div><h1>404 not found</h1></div>} />
                    </Switch>
                </WrappedApp>
            </Router>
        );
    }
}

module.exports = App;
