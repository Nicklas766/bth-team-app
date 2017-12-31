var React = require('react');
import io from 'socket.io-client';

import Spellbar from './SpellBar.js';
import Avatar from './Avatar.js';



class GameBoard extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           socket: this.props.socket,
           id: this.props.id,
           name: this.props.name,
           thisClient: {},
           otherClient: {},
           playerTurn: "",
           started: false
     };
      this.handleChange = this.handleChange.bind(this);
 }

 // ComponentDidMount sets up events we receive from the server
 componentDidMount() {
   const {socket, id, name} = this.state;

    // On start change the playersTurn so we can start
    socket.on(`start ${id}`, (players, playerTurn) => {

        // find our client and other client
        const thisClient = players.find(player => player.name === name);
        const otherClient = players.filter(player => player.name !== name)[0];

        this.setState({
            thisClient: thisClient,
            otherClient: otherClient,
            playerTurn: playerTurn,
            started: true
        });

    });

    // This is when boss has attacked
    socket.on(`boss attack ${id}`, (obj) => {
        const {thisClient, otherClient} = this.state;

        // This means no players left
        !obj.nextPlayer && console.log('players lost!');

        // If this client was attacked then update
        obj.target === thisClient.name && updateClientWithState('thisClient', obj);

        // If other client was attacked then update
        obj.target === otherClient.name && updateClientWithState('otherClient', obj);

        // Next turn
        this.setState({
            nextPlayer: obj.nextPlayer
        })

    });

    // We receive target and heal when someone has chosen heal
    socket.on(`heal ${id}`, (obj) => {
        target === thisClient.name && updateClientWithState('thisClient', obj);
        target === otherClient.name && updateClientWithState('otherClient', obj);
    });




    socket.emit('setup user', user);
    console.log(user);
}

// Computed property name
updateClientWithState(key, obj) {
    this.setState({
        [key]: obj
    });
}


  render() {
    return (
        <div>
            <h1>Game board</h1>

            <Spellbar
                socket={this.state.socket}
                id={this.state.id}
                playerTurn={this.state.playerTurn}
                name={this.state.thisClient.name}
                friend={this.state.otherClient.name}
            />

            <Avatar playerObject={this.state.thisClient} />
            <Avatar playerObject={this.state.otherClient} />
            <Avatar playerObject={this.state.boss} />

        </div>
    );
  }
}

module.exports = GameBoard;
