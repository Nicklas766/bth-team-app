var React = require('react');
import io from 'socket.io-client';



/**
* Spellbar makes sure the events for the spells are correct
* it also receives props from GameBoard, so we know who's
* turn it is
*/
class Spellbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: this.props.id,
            name: this.props.name,
            friend: this.props.friend,
            playerTurn: this.props.playerTurn,
            yourTurn: false
        };
        this.attack = this.attack.bind(this);
        this.healYourself = this.healYourself.bind(this);
        this.healFriend = this.healFriend.bind(this);
    }

    componentDidMount() {
        const {playerTurn, name} = this.state;

        if (playerTurn === name) {
            this.setState({yourTurn: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTurn === this.state.name) {
            this.setState({yourTurn: true});
        }
    }

    // Start boss attack after 3 sec
    nextTurn() {
        this.setState({yourTurn: false});
        setTimeout(() => {
          this.state.socket.emit(`boss attack ${this.state.id}`);
        }, 3000);
    }

    attack() {
        this.state.socket.emit(`attack ${this.state.id}`);
    }

    healYourself() {
        this.state.socket.emit(`heal ${this.state.id}`, this.state.name);
    }

    healFriend() {
        this.state.socket.emit(`heal ${this.state.id}`, this.state.friend);
    }

    render() {
        return (<div>
            {
                this.state.yourTurn && <div>
                    <h1>Game board</h1>
                    <button onClick={this.attack}>Attack</button>
                    <button onClick={this.healYourself}>Heal yourself</button>
                    <button onClick={this.healFriend}>Heal friend</button>
                </div>)
            }
        </div>);
    }
}

module.exports = Spellbar;
