var React = require('react');
import io from 'socket.io-client';

import Chat from './Chat.js';

const Games = (props) => {
    // Get available games
    const games = props.rooms.map(room => room.users.length !== 2 && room);
    const joinGameRoom = games.map(room => <p> You can join room {room.id} </p>)

    return joinGameRoom;
}

class Home extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         socket: io(),
         user: {name:"nicklas"}, // The user from DB
         rooms: []
     };
      this.joinRoom = this.joinRoom.bind(this);
      this.createRoom = this.createRoom.bind(this);
      this.leaveRoom = this.leaveRoom.bind(this);
      this.handleChange = this.handleChange.bind(this);
 }

 componentDidMount() {
   const {socket, user} = this.state;

    socket.on('get rooms', (rooms) => {
        this.setState({rooms: rooms});
    });

    socket.emit('setup user', user);
}

  componentWillUnmount() {
      this.state.socket.close();
  }

  handleChange(event) {
      this.setState({room: event.target.value});
      console.log(this.state.room);
  }

  createRoom() {
    this.state.socket.emit('create room', this.state.room, 'game');
  }

  joinRoom() {
    this.state.socket.emit('join room', this.state.room);
    this.setState({inRoom: true});
  }
  leaveRoom() {
    this.state.socket.emit('leave room', this.state.room);
    this.setState({inRoom: false});
  }

  render() {
    return (
        <div>
            <h1>Welcome to the overview of all our stuff</h1>
            <p> Here you can start chatting, create game or join game </p>

            <Games rooms={this.state.rooms} />


             <select value={this.state.room} onChange={this.handleChange}>
              <option value="room1">room1</option>
              <option value="room2">room2</option>
              <option value="room3">room3</option>
            </select>

             <button onClick={this.createRoom}>Create</button>
             <button onClick={this.joinRoom}>Join</button>
             <button onClick={this.leaveRoom}>Leave</button>

        </div>
    );
  }
}

module.exports = Home;
