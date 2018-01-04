import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

class SpellSounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: this.props.id
        };
    }

    componentDidMount() {
        this.state.socket.on(`attack ${this.state.id}`, (obj) => {
            this.setState({
                attack: true,
            });
        });

    }

    render() {
        if (this.state.attack) {
            return (<Sound
                url="../../music/steelsword.mp3"
                playStatus={Sound.status.PLAYING}
                />);
        }
        return <p> no sound </p>

    }
}


    module.exports = SpellSounds;
