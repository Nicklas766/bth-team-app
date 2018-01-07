import React from 'react';
import LoginChecker from './LoginChecker';
import { BrowserRouter } from 'react-router-dom';



class App extends React.Component {
    render() {
        return (<BrowserRouter>
            <div className='wrap-all' style={{
                backgroundImage: "url(../images/knight-background.jpg)"
            }}>
                <LoginChecker />
            </div>
        </BrowserRouter>
        );
    }
}

module.exports = App;
