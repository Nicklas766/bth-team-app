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
            boss: {},
            playerTurn: "",
            started: false
        };
    }

    // ComponentDidMount sets up events we receive from the server
    componentDidMount() {
        const {socket, id, name} = this.state;
        console.log(id)
        console.log('i was mounted')
        // On start change the playersTurn so we can start
        socket.on(`start ${id}`, (obj) => {
            const {players, playerTurn, boss} = obj;
            console.log('start gameee')
            // find our client and other client
            const thisClient = players.find(player => player.name === name);
            const otherClient = players.filter(player => player.name !== name)[0];

            this.setState({
                thisClient: thisClient,
                otherClient: otherClient,
                boss: boss,
                playerTurn: playerTurn,
                started: true
            });

        });

        // This is when boss has attacked
        socket.on(`boss attack ${id}`, (obj) => {
            const {thisClient, otherClient} = this.state;

            console.log(obj)
            // If this client was attacked then update
            obj.name === thisClient.name && this.updateClientWithState('thisClient', obj);

            // If other client was attacked then update
            obj.name === otherClient.name && this.updateClientWithState('otherClient', obj);
        });

        // We receive target and heal when someone has chosen heal
        socket.on(`heal ${id}`, (obj) => {
            // This means no players left
            !obj.nextPlayer && console.log('players lost!');
            const {thisClient, otherClient} = this.state;
            console.log(obj)
            obj.updatedPlayer.name === thisClient.name && this.updateAfterHeal('thisClient', obj);
            obj.updatedPlayer.name === otherClient.name && this.updateAfterHeal('otherClient', obj);
        });

        // Update boss
        socket.on(`attack ${id}`, (obj) => {
            // This means no players left
            !obj.nextPlayer && console.log('players lost!');
            this.setState({
                boss: obj.boss,
                playerTurn: obj.nextPlayer
            });
        });

        // On win
        socket.on(`win ${id}`, () => {
            this.setState({won: true});
        });



    }

    // Computed property name
    updateClientWithState(key, obj) {
        this.setState({[key]: obj});
    }

    // Computed property name
    updateAfterHeal(key, obj) {
        this.setState({
            [key]: obj.updatedPlayer,
            playerTurn: obj.nextPlayer
        });
    }

    render() {
        return (<div>
            {this.state.started ?
            <div>
                <h1>Game board</h1>

                {this.state.won && <p> You won!!!! </p>}


                <div className='boss-container'>
                    <Avatar image='../images/boss.jpg' playerObject={this.state.boss}/>
                </div>


                <div className='player-container'>

                    <Avatar image='../images/knight.jpg' playerObject={this.state.thisClient}/>

                    <div className='action-bar'>
                        {this.props.children}
                        <Spellbar style={{display: 'flex', width:'50%'}}
                            socket={this.state.socket}
                            id={this.state.id}
                            playerTurn={this.state.playerTurn}
                            name={this.state.thisClient.name}
                            friend={this.state.otherClient.name}/>
                    </div>
                    <Avatar image='../images/friend.jpg' playerObject={this.state.otherClient}/>
                </div>
            </div>
                : <div><p>Waiting for player 2</p></div>}

        </div>);
    }
}

module.exports = GameBoard;
