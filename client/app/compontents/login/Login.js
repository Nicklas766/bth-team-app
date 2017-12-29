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
                <h1>Welcome! Login and join the fun.</h1>

                {this.state.success && <p> You've logged in! </p>}
                {this.state.invalid && <p> Wrong password! </p>}
                {this.state.error && <p> This user doesn't exist, or something went wrong </p>}

                <input name={"name"} value={this.state.name} onChange={this.handleInputChange} placeholder={"Username"}/>
                <input name={"pass"} value={this.state.pass} onChange={this.handleInputChange} placeholder={"Password"}/>
                <button onClick={this.login}>Login</button>

                <Link to='/create'>Create a user</Link>
            </div>
        );
    }
}

module.exports = Login;
