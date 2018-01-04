import React from 'react';
import PropTypes from 'prop-types';

import SpellBar from './SpellBar.js';
import Avatar from './Avatar.js';
import SpellSounds from './SpellSounds.js';
import Sound from 'react-sound';

// <Sound
//     url="../../music/bensound-instinct.mp3"
//     playStatus={Sound.status.PLAYING}
//     />
//     <h1>Game board</h1>
//
//     <SpellSounds socket={this.state.socket} id={this.state.id} />
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
            started: false,
        };
    }

    // ComponentDidMount sets up events we receive from the server
    componentDidMount() {
        const {socket, id, name} = this.state;

        console.log(id);
        console.log('i was mounted');
        // On start change the playersTurn so we can start
        socket.on(`start ${id}`, (obj) => {
            const {players, playerTurn, boss} = obj;

            console.log('start gameee');
            // find our client and other client
            const thisClient = players.find(player => player.name === name);
            const otherClient = players.filter(player => player.name !== name)[0];

            this.setState({
                thisClient: thisClient,
                otherClient: otherClient,
                thisName: thisClient.name,
                otherName: otherClient.name,
                boss: boss,
                playerTurn: playerTurn,
                started: true
            });
        });

        // This is when boss has attacked
        socket.on(`boss attack ${id}`, (obj) => {
            const {thisClient, otherClient} = this.state;
            const {updatedPlayer, nextPlayer} = obj;

            if (!nextPlayer) {
                this.setState({won: true});
                console.log('U LOOOST')
                return true;
            }
            console.log(obj);
            // If this client was attacked then update
            updatedPlayer.name === thisClient.name && this.updateClientWithState('thisClient', updatedPlayer);

            // If other client was attacked then update
            updatedPlayer.name === otherClient.name && this.updateClientWithState('otherClient', updatedPlayer);
        });

        // We receive target and heal when someone has chosen heal
        socket.on(`heal ${id}`, (obj) => {
            // This means no players left
            !obj.nextPlayer && console.log('players lost!');
            const {thisClient, otherClient} = this.state;

            console.log(obj);
            obj.updatedPlayer.name === thisClient.name && this.updateAfterHeal('thisClient', obj);
            obj.updatedPlayer.name === otherClient.name && this.updateAfterHeal('otherClient', obj);
        });

        // Update boss
        socket.on(`attack ${id}`, (obj) => {
            // This means no players left
            !obj.nextPlayer && console.log('players lost!');
            this.setState({
                boss: obj.boss,
                playerTurn: obj.nextPlayer,
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
        const {boss, thisClient, socket, id, playerTurn, otherClient, won} = this.state;

        if (won) {
            return <p> You won!!!! </p>;
        }
        return (<div>
            {this.state.started ?
                <div>
                    <h1>Game board</h1>


                    <div className='boss-container'>
                        <Avatar image='../images/boss.jpg' playerObject={boss}/>
                    </div>

                    <div className='player-container'>

                        <Avatar image='../images/knight.jpg' playerObject={thisClient}/>

                        <div className='action-bar'>
                            {this.props.children}
                            <SpellBar style={{display: 'flex', width: '50%'}}
                                socket={socket}
                                id={id}
                                playerTurn={playerTurn}
                                name={this.state.thisName}
                                friend={this.state.otherName}/>
                        </div>
                        <Avatar image='../images/friend.jpg' playerObject={otherClient}/>
                    </div>
                </div>
                : <div><p>Waiting for player 2</p></div>}

        </div>);
    }
}

GameBoard.propTypes = {
    socket: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired
};

module.exports = GameBoard;
