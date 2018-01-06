import React from 'react';
import PropTypes from 'prop-types';

import SpellBar from './SpellBar.js';
import Avatar from './Avatar.js';
import SpellSounds from './SpellSounds.js';

import api from '../../../utils/api';



// Checks if updated player is current client, based on that
// We know which client we need to update
const getClientKey = (currClient, updatedPlayer) => {
    const thisClientUpdated = updatedPlayer.name === currClient.name;

    return thisClientUpdated ? 'thisClient' : 'otherClient';
};

const getClients = (players, name) => {
    const thisClient  = players.find(player => player.name === name);
    const otherClient = players.filter(player => player.name !== name)[0];

    return {thisClient, otherClient};
};


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
            gameResult: '',
            disconnected: false
        };
    }

    // ComponentDidMount sets up events we receive from the server
    componentDidMount() {
        const {socket, id, name} = this.state;

        // On.('start') setups our game and starts it
        socket.on(`start ${id}`, (obj) => {
            const {thisClient, otherClient} = getClients(obj.players, name);

            this.setState({
                thisClient: thisClient,
                otherClient: otherClient,
                boss: obj.boss,
                playerTurn: obj.playerTurn,
                started: true
            });
        });

        // This is when boss has attacked
        socket.on(`boss attack ${id}`, (obj) => {
            if (!obj.nextPlayer) {
                return this.endGame('lost', 0, 1);
            }
            const key = getClientKey(this.state.thisClient, obj.updatedPlayer);

            this.setState({[key]: obj.updatedPlayer});
        });

        // We receive target and heal when someone has chosen heal
        socket.on(`heal ${id}`, (obj) => {
            const key = getClientKey(this.state.thisClient, obj.updatedPlayer);

            this.setState({
                [key]: obj.updatedPlayer,
                playerTurn: obj.nextPlayer
            });
        });

        // Updates the boss boss
        socket.on(`attack ${id}`, (obj) => {
            this.setState({boss: obj.boss, playerTurn: obj.nextPlayer});
        });

        // On win
        socket.on(`win ${id}`, async () => {
            this.endGame('won', 1, 0);
        });


        // When one of the players disconnect we make sure the rooms are left
        // and removed
        socket.on(`player disconnected ${id}`, async () => {
            this.state.socket.emit('leave room', 'chat' + this.state.id);
            this.state.socket.emit('leave room', this.state.id);
            this.state.socket.emit('remove room', 'chat' + this.state.id);
            this.state.socket.emit('remove room', this.state.id);
            this.setState({disconnected: true});
        });
    }



    async endGame(result, win, loss) {
        this.setState({gameResult: result});
        await api.save({win: win, loss: loss});
    }

    render() {
        const {boss, thisClient, socket, id, playerTurn,
            otherClient, gameResult, disconnected} = this.state;

        if (disconnected) {
            return <p> The person playing with you disconnected! </p>;
        }

        if (gameResult === 'won') {
            return <p> You won!!!! </p>;
        }
        if (gameResult === 'lost') {
            return <p> You lost!!! </p>;
        }
        if (!this.state.started) {
            return <div><p>Waiting for player 2</p></div>;
        }

        return (<div>
            <h1>Game board</h1>
            <div className='boss-container'>
                <Avatar image='../images/boss.jpg' playerObject={boss}/>
            </div>

            <SpellSounds socket={this.state.socket} id={this.state.id} />

            <div className='player-container'>

                <Avatar image='../images/knight.jpg' playerObject={thisClient}/>

                <div className='action-bar'>
                    {this.props.children}
                    <SpellBar style={{display: 'flex', width: '50%'}}
                        socket={socket}
                        id={id}
                        playerTurn={playerTurn}
                        name={thisClient.name}
                        friend={otherClient.name}/>
                </div>
                <Avatar image='../images/friend.jpg' playerObject={otherClient}/>
            </div>
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
