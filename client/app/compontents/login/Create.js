var React = require('react');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;
import InputForm from './InputForm';

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
                <InputForm
                    name={this.state.name}
                    pass={this.state.pass}
                    repeat={this.state.repeat}
                    onSelect={this.createAccount}
                    handleChange={this.handleChange}
                    buttonText={'Create'}
                />
                    <Link to='/login'>Login</Link>
            </div>
        );
    }
}

module.exports = Create;
