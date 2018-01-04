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
            this.setState({attack: true, heal: false, boss: false});
        });

        this.state.socket.on(`heal ${this.state.id}`, (obj) => {
            this.setState({attack: false, heal: true, boss: false});
        });

        this.state.socket.on(`boss attack ${this.state.id}`, (obj) => {
            setTimeout(() => {
                this.setState({attack: false, heal: false, boss: true});
            }, 4000);
        });

    }

    render() {
        if (this.state.attack) {
            return (<Sound
                url="../../music/steelsword.mp3"
                playStatus={Sound.status.PLAYING}
                />);
        }
        if (this.state.heal) {
            return (<Sound
                url="../../music/heal.ogg"
                playStatus={Sound.status.PLAYING}
                />);
        }
        if (this.state.boss) {
            return (<Sound
                url="../../music/boss.mp3"
                playStatus={Sound.status.PLAYING}
                />);
        }
        return <p> no sound </p>

    }
}


    module.exports = SpellSounds;
