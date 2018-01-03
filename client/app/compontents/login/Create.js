var React = require('react');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pass: '',
            repeat: '',
            showMsg: false,
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    async createAccount() {
        if (this.state.pass !== this.state.repeat) {
            this.setState({ showMsg: true, message: 'Fail! Passwords are not matching' });
            return false;
        }
        const statusCode = await api.createAccount({
            name: this.state.name,
            pass: this.state.pass,
        });

        // based on status code update visual message
        statusCode == 200 && this.setState({
            showMsg: true,
            message: 'Success! You created an account.'
        });
        statusCode == 401 && this.setState({
            showMsg: true,
            message: 'Fail! Either the user exists or you didnt type anything'
        });
        console.log(statusCode);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const {name, pass, repeat, showMsg, message} = this.state;

        return (
            <div className='content-container'>
                <div className='content-header'>
                    <h3> Create account </h3>
                </div>


                {showMsg && <p className='login-info'> {message} </p>}

                <h3>Join our community!</h3>
                <div className='login-container'>
                    <input
                        name={"name"}
                        value={name}
                        onChange={this.handleChange}
                        placeholder={"Username"}/>
                    <input
                        name={"pass"}
                        value={pass}
                        onChange={this.handleChange}
                        placeholder={"Password"}/>
                    <input
                        name={"repeat"}
                        value={repeat}
                        onChange={this.handleChange}
                        placeholder={"Repeat password"}/>

                    <button onClick={this.createAccount}>Create</button>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        );
    }
}

module.exports = Create;
