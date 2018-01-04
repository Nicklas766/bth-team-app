import React from 'react';
import PropTypes from 'prop-types';

class InputForm extends React.Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            pass: nextProps.pass,
            repeat: nextProps.repeat
        });
    }

    render() {
        return (<div className='login-container'>
            <input
                name={"name"}
                value={this.props.name}
                onChange={this.props.handleChange}
                placeholder={"Username"}/>
            <input
                name={"pass"}
                value={this.props.pass}
                onChange={this.props.handleChange}
                placeholder={"Password"}/>

            {this.props.repeat !== false &&
                <input
                    name={"repeat"}
                    value={this.props.repeat}
                    onChange={this.props.handleChange}
                    placeholder={"Repeat password"}/>
                }

            <button onClick={this.props.onSelect}>{this.props.buttonText}</button>
        </div>);
        }
}

InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
    repeat: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired
};

module.exports = InputForm;
