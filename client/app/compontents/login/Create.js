var React = require('react');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          pass: '',
          success: false,
          fail: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.createAccount     = this.createAccount.bind(this);
    }

    async createAccount() {
        const statusCode = await api.createAccount({
            name: this.state.name,
            pass: this.state.pass,
        });

        // based on status code update visual message
        statusCode == 200 && this.setState({ success: true, fail: false });
        statusCode == 401 && this.setState({ success: false, fail: true });
        console.log(statusCode)
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const {name, pass, success, fail} = this.state;
        return (
            <div className='content-container'>
                <h1>Join our community!</h1>

                {success && <p> Success! You've created an account! </p>}
                {fail && <p> Fail! Either the user exists or you didn't type anything </p>}
                <input name={"name"} value={name} onChange={this.handleInputChange} placeholder={"Username"}/>
                <input name={"pass"} value={pass} onChange={this.handleInputChange} placeholder={"Password"}/>
                <button onClick={this.createAccount}>Create</button>

                <Link to='/login'>Login</Link>
            </div>
        );
    }
}

module.exports = Create;
