import React from 'react';
import PropTypes from 'prop-types';


/**
* This clients avatar for health
*/

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerObject: this.props.playerObject,
            effect: '',
            image: this.props.image,
            effectActive: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {playerObject} = this.state;
        // Compare current health with new to decide the css-animation
        const conditionHeal = playerObject.hp < nextProps.playerObject.hp;
        const conditionDmg = playerObject.hp > nextProps.playerObject.hp;
        const effect = conditionHeal ? 'heal' : (conditionDmg ? 'dmg' : ' ');

        console.log(effect);

        if (this.state.effectActive) {
            this.startEffect(nextProps.playerObject, effect, 4000);
        } else {
            this.setState({
                playerObject: nextProps.playerObject,
                effect: effect,
                effectActive: true
            });
            setTimeout(() => {
                this.setState({
                    effect: ' ',
                    effectActive: false
                });
            }, 2000);
        }
    }

    // To remove effect we added
    startEffect(playerObject, effect, waitTime) {
        setTimeout(() => {
            this.setState({
                playerObject: playerObject,
                effect: effect,
                effectActive: true
            });
        }, waitTime);

        setTimeout(() => {
            this.setState({
                effect: ' ',
                effectActive: false
            });
        }, waitTime + 2000);
    }



    render() {
        return (
            <div className={'health-bar ' + this.state.effect}>
                <img src={this.state.image}/>
                <p>{this.state.playerObject.name}: </p>
                <p>{this.state.playerObject.hp}</p>
            </div>
        );
    }
}

Avatar.propTypes = {
    playerObject: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired
};

module.exports = Avatar;
