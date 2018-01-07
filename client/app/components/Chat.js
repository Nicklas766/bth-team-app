import React from 'react';
import PropTypes from 'prop-types';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: this.props.id,
            messages: [],
            text: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage       = this.sendMessage.bind(this);
    }

    componentDidMount() {
        const {socket, id} = this.state;

        // Events
        socket.on(`message ${id}`, (messages) => {
            console.log(messages);
            this.setState({messages: messages});
        });
    }

    sendMessage() {
        const {socket, id, text} = this.state;

        socket.emit(`message ${id}`, text);
        this.setState({text: ''});
    }

    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const {text, messages} = this.state;

        const msgs = messages.map((msg, index) =>
            <div key={'chat' + index}>{msg.name}: {msg.text}</div>
        );

        return (
            <div className='chat'>
                <div className='chat-messages'>
                    <div className='message-container'>
                        {msgs}
                    </div>
                </div>
                <div className='chat-input'>
                    <textarea
                        name={"text"}
                        value={text}
                        onChange={this.handleInputChange}
                        placeholder={"Type your message here"}
                    />
                    <button onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

module.exports = Chat;
