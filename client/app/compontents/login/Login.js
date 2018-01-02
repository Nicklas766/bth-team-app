var React = require('react');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          pass: '',
          invalid: false,
          success: false,
          error: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.login             = this.login.bind(this);
    }

    async login() {
        const statusCode = await api.login({
            name: this.state.name,
            pass: this.state.pass,
        });

        // Based on status code update state messages
        statusCode == 200 && this.setState({ success: true,  invalid: false, error: false});
        statusCode == 401 && this.setState({ success: false, invalid: true,  error: false});
        statusCode == 404 && this.setState({ success: false, invalid: false, error: true});
        console.log(statusCode)
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        return (
            <div className='content-container'>

            <div className='content-header'>
                <h3> Login </h3>
            </div>

                {this.state.success && <p className='login-info'> You've logged in! </p>}
                {this.state.invalid && <p className='login-info'> Wrong password! </p>}
                {this.state.error && <p className='login-info'> This user doesn't exist, or something went wrong </p>}

                <h3>Great to meet you! Please login.</h3>
                <div className='login-container'>
                    <input name={"name"} value={this.state.name} onChange={this.handleInputChange} placeholder={"Username"}/>
                    <input name={"pass"} value={this.state.pass} onChange={this.handleInputChange} placeholder={"Password"}/>
                    <button onClick={this.login}>Login</button>

                    <Link to='/create'>Create a user</Link>
                </div>
            </div>
        );
    }
}

module.exports = Login;
