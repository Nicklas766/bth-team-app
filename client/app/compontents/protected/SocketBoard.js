import React from 'react';
import PropTypes from 'prop-types';

import io from 'socket.io-client';

import GameBoard from './game/GameBoard.js';
import Chat from '../Chat.js';
import Sound from 'react-sound';

const Games = (props) => {
    // Get available games
    console.log(props.rooms);
    return props.rooms.reverse().map(room =>
        <div key={room.id} className='room'>
            <h3> Game {room.id} </h3>
            <h3> Game {console.log(room.users)} </h3>
            <p> {room.users[0] ? room.users[0].user.name : 'no one'} is waiting in this room  </p>
        </div>
    );
};

const Options = (props) => {
    return props.rooms.map(room =>
        <option key={room.id + "option"} value={room.id}>room {room.id}</option>
    );
};

class SocketBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io(),
            user: this.props.user, // The user from DB, atm random string
            rooms: [],
            inRoom: false,
            room: false
        };
        this.joinRoom = this.joinRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {socket, user} = this.state;

        socket.on('get rooms', (rooms) => {
            const gameRooms = rooms.filter(room =>
                room.users.length !== 2 && !room.id.includes('chat')
            );

            this.setState({rooms: gameRooms});
        });

        socket.emit('setup user', user);
        this.state.socket.emit('get rooms');
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

    handleChange(event) {
        this.setState({room: event.target.value});
        console.log(this.state.room);
    }

    createRoom() {
    // The room id will simply be the length of all rooms
        const roomId = this.state.rooms.length + "-" + Math.random().toString(36).substr(2, 10);

        this.state.socket.emit('create room', roomId, 'game');
        this.state.socket.emit('create room', 'chat' + roomId, 'chat');
        this.state.socket.emit('get rooms');
    }

    joinRoom() {
        this.state.socket.emit('join room', this.state.room);
        this.state.socket.emit('join room', 'chat' + this.state.room);
        this.state.socket.emit('get rooms');
        this.setState({inRoom: true});
    }

    render() {
        const {socket, room, user, rooms} = this.state;

        if (this.state.inRoom) {
            return (
                <div className='content-container'>
                <Sound
                    url="../../music/bensound-instinct.mp3"
                    playStatus={Sound.status.PLAYING}
                    />
                    <GameBoard socket={socket} id={room} name={user.name}>
                        <Chat socket={socket} id={'chat' + room} />
                    </GameBoard>
                </div>
            );
        }

        return (
            <div style={{minHeight: "250px", width: "100%", background: '#1E2326'}}>
                <div className='content-header'>
                    <h3> Community </h3>
                </div>

                <div className='room-container'>
                    <div className='room-header'>
                        <p> Available games </p>
                        <button onClick={this.createRoom}>Create new game</button>
                        <button onClick={this.joinRoom}>Join Game</button>
                        <select value={this.state.room} onChange={this.handleChange}>
                            <Options rooms={rooms} />
                        </select>
                    </div>
                    <div className='room-scroll'>
                        <Games rooms={rooms} />
                    </div>
                </div>

            </div>
        );
    }
}

SocketBoard.propTypes = {
    user: PropTypes.object.isRequired
};

module.exports = SocketBoard;
