import React from 'react';


class Home extends React.Component {
    render() {
        return (
            <div className='content-container'>
                <h1>Welcome! Home and join the fun.</h1>

                <div className='boss-container'>
                    <div className='health-bar'>
                        <img src="images/boss.jpg"/>
                        <p> name </p>
                        <p> 120 </p>
                    </div>
                </div>


                <div className='player-container'>
                    <div className='health-bar'>
                        <img src="images/knight.jpg "/>
                        <p> name </p>
                        <p> 120 </p>
                    </div>
                    <div className='action-bar'>

                        <div className='spell-bar'>
                            <div style={{backgroundImage: `url(images/sword.png)`}} className='spell' />
                            <div style={{backgroundImage: `url(images/add.png)`}} className='spell' />
                            <div style={{backgroundImage: `url(images/charity.png)`}} className='spell' />
                        </div>
                    </div>
                    <div className='health-bar'>
                        <img src="images/friend.jpg "/>
                        <p> name </p>
                        <p> 120 </p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Home;
