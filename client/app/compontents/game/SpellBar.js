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
        this.heal = this.heal.bind(this);
        this.attack = this.attack.bind(this);
    }

    componentDidMount() {
        const {playerTurn, name} = this.state;

        if (playerTurn === name) {
            this.setState({yourTurn: true});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTurn === this.state.name) {
            console.log('Its a new turn for', nextProps.playerTurn)
            this.setState({
                yourTurn: true,
                playerTurn: nextProps.playerTurn
            });
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
        this.nextTurn();
    }
    heal(event) {
        console.log(event.target.value)
        this.state.socket.emit(`heal ${this.state.id}`, event.target.value);
        this.nextTurn();
    }


    render() {
        const {friend, name, playerTurn} = this.state;

        return (<div style={{width: '100%'}}>
            {
                this.state.yourTurn && <div className='spell-bar'>
                    <button onClick={this.attack} style={{backgroundImage: `url(images/sword.png)`}} className='spell' />
                    <button value={name} onClick={this.heal} style={{backgroundImage: `url(images/add.png)`}} className='spell' />
                    <button value={friend} onClick={this.heal} style={{backgroundImage: `url(images/charity.png)`}} className='spell' />
            </div>}
        </div>);
    }
}

module.exports = Spellbar;
