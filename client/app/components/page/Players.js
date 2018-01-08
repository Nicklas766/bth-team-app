import React from 'react';
import api from '../../utils/api';

class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            playerCount: 0
        };
    }

    componentDidMount() {
        api.fetchUsers().
            then((users) => {
                this.setState({
                    loading: false,
                    playerCount: users.length
                });
            }).
            catch(err => console.log(err));
    }
    render() {
        return (
            <div className='content-container' style={{
                border: 'solid 0.5px silver', backgroundImage: `url(../images/friend.jpg)`
            }}>
                <div style={{
                    background: '#1E2326', textAlign: 'left',
                    padding: '50px', opacity: '0.9', height: '88.9%'
                }}>
                    <h1> Our community currently consists of {this.state.playerCount} accounts </h1>
                    {this.state.loading && <div>Loading..</div>}
                </div>
            </div>
        );
    }
}

module.exports = Players;
