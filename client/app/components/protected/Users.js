import React from 'react';
import api from '../../utils/api';
import PropTypes from 'prop-types';

const Table = (props) => (
    <table>
        <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Games</th>
        </tr>

        {props.children}

    </table>
)

Table.propTypes = {
    children: PropTypes.node.isRequired
};

const UserScores = (props) => {
    const {users} = props;

    const mockUsers = [
        {
            name: 'Jamesbond',
            wins: 2,
            losses: 0
        },
        {
            name: 'Searcher',
            wins: 10,
            losses: 0
        },
        {
            name: 'Bloodeye',
            wins: 10,
            losses: 0
        },
    ]
    const sortedUsers = mockUsers.sort((curr, next) => (curr.wins < next.wins));

    return sortedUsers.map(user =>
        <tr>
            <td>{user.name}</td>
            <td>{user.wins}</td>
            <td>{user.losses}</td>
            <td>{user.wins + user.losses}</td>
        </tr>
    )

}

UserScores.propTypes = {
    users: PropTypes.array.isRequired
};

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };

    }

    componentDidMount() {
        api.fetchUsers().
        then((users) => {
            this.setState({
                loading: false,
                users: users
            })
        }).
        catch(err => console.log(err));
    }


    // <Audio url='../music/bensound-epic.mp3'><Login setLoggedIn={this.login}/></Audio>
    render() {
        return (<div className='score-container'>

                <div className='room-header'>
                    <p> Scoreboard </p>
                </div>

                {this.state.loading && <p>loading...</p>}

                {!this.state.loading && <Table> <UserScores users={this.state.users} /></Table>}
        </div>);
    }
}

module.exports = Users;
