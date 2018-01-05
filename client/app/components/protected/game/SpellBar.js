import React from 'react';
import PropTypes from 'prop-types';
/**
* Spellbar makes sure the events for the spells are correct
* it also receives props from GameBoard, so we know who's
* turn it is
*/
class SpellBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: this.props.id,
            name: this.props.name,
            friend: this.props.friend,
            playerTurn: this.props.playerTurn,
            yourTurn: false,
            started: false
        };
        this.heal = this.heal.bind(this);
        this.attack = this.attack.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                started: true
            });
        }, 6000);
    }

    // We have to wait 6000 before next turn due to effects
    componentWillReceiveProps(nextProps) {
        if (nextProps.playerTurn === this.state.name) {
            setTimeout(() => {
                this.setState({
                    yourTurn: true,
                    playerTurn: nextProps.playerTurn
                });
            }, 6000);
        }
    }

    // Start boss attack after 3 sec
    nextTurn() {
        this.setState({yourTurn: false});
        this.state.socket.emit(`boss attack ${this.state.id}`);
    }

    attack() {
        this.state.socket.emit(`attack ${this.state.id}`);
        this.nextTurn();
    }
    heal(event) {
        console.log('I will heal', event.target.value)
        console.log(event.target.value);
        this.state.socket.emit(`heal ${this.state.id}`, event.target.value);
        this.nextTurn();
    }


    render() {
        if (!this.state.started) {
            return (<div className='spell-bar'>
                <p> Game starts in 5 sec </p>
            </div>)
        }
        if (!this.state.yourTurn) {
            return (<div className='spell-bar'>
                <p> {this.state.friend} turn </p>
            </div>)
        }


        const {friend, name} = this.state;
        const spellStyle1 = {backgroundImage: `url(../images/sword.png)`};
        const spellStyle2 = {backgroundImage: `url(../images/add.png)`};
        const spellStyle3 = {backgroundImage: `url(../images/charity.png)`};


        return (<div className='spell-bar'>
                <button onClick={this.attack} style={spellStyle1} className='spell' />
                <button onClick={this.heal} value={name} style={spellStyle2} className='spell' />
                <button onClick={this.heal} value={friend} style={spellStyle3} className='spell' />
        </div>);
    }
}

SpellBar.propTypes = {
    socket: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    friend: PropTypes.string.isRequired,
    playerTurn: PropTypes.string.isRequired,
};


module.exports = SpellBar;
