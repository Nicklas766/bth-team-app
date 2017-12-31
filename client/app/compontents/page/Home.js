var React = require('react');
import io from 'socket.io-client';


const Games = (props) => {
    // Get available games
    const games = props.rooms.filter(room => room.users.length !== 2);
    const joinGameRoom = games.map(room =>
        <div key={room.id} style={{background: 'orange', margin: 5}}>
            <p> You can join room {room.id} </p>
            <p> There are {room.users.length} users in the room </p>
        </div>
    )

    return joinGameRoom;
}

const Options = (props) => {
    return props.rooms.map(room =>
        <option key={room.id + "option"} value={room.id}>room {room.id}</option>
    );
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
      this.handleChange = this.handleChange.bind(this);
 }

 componentDidMount() {
   const {socket, user} = this.state;

    socket.on('get rooms', (rooms) => {
        this.setState({rooms: rooms});
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
    const roomId = this.state.rooms.length;
    this.state.socket.emit('create room', roomId, 'game');
    this.state.socket.emit('get rooms');
  }

  joinRoom() {
    this.state.socket.emit('join room', this.state.room);
    this.state.socket.emit('get rooms');
  }

  render() {
    return (
        <div className='content-container'>
            <h1>Welcome to the overview of all our stuff</h1>
            <p> Here you can start chatting, create game or join a game </p>

            <Games rooms={this.state.rooms} />

             <select value={this.state.room} onChange={this.handleChange}>
                <Options rooms={this.state.rooms} />
            </select>

             <button onClick={this.createRoom}>Create new game</button>
             <button onClick={this.joinRoom}>Join a room</button>

        </div>
    );
  }
}

module.exports = Home;
