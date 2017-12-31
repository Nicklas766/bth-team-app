var React = require('react');
import io from 'socket.io-client';



/**
* This clients avatar for health
*/
class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerObject: this.props.playerObject,
            effect: ''
        };
    }

componentWillReceiveProps(nextProps) {
        const {playerObject} = this.state;
        // Compare current health with new to decide the css-animation
        this.setState({
            playerObject: nextProps.playerObject
            effect: playerObject.hp < nextProps.playerObject.hp ? 'heal' : 'dmg'
        })

    }

    render() {
        return (
            <div className=`health-bar ${this.state.effect}`>
                <h1>Health bar for {this.state.playerObject.name}: </h1>
                <p>{this.state.playerObject.hp}</p>
            </div>
        );
    }
}

module.exports = Avatar;
