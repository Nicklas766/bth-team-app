import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CreateLink = (props) => (<li><Link target='.blank' to={props.url}>{props.url}</Link></li>);
const LinkWithText = (props) => (<li><Link target='.blank' to={props.url}>{props.text}</Link></li>);

CreateLink.propTypes = {
    url: PropTypes.string.isRequired
};

LinkWithText.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};



class About extends React.Component {
    render() {
        return (
            <div className='content-container' style={{background: '#1E2326'}}>
                <h1>Welcome to our website!</h1>
                <p> Thanks for visiting and maybe also playing our game? </p>


                <h3> Credit </h3>
                <p> I have made all the software for this project and you are free
                to check out the code at </p>
                <CreateLink url={'https://github.com/Nicklas766'} />
                <CreateLink url={'https://github.com/Nicklas766/bth-team-app'} />
                <CreateLink url={'https://github.com/Nicklas766/socket-mansion'} />
                <CreateLink url={'https://github.com/Nicklas766/mongo-connecter'} />

                <p> I'm no designer, but I always strive to make it look good aswell.
                    I have borrowed some awesome music and images to make the website
                    more "complete". Below you can see the credits for these. </p>


                <p> The music for the login and battle is made by www.bensound.com </p>
                <CreateLink url={'https://www.bensound.com/'} />

                <p> The background images is from the very broad and nice website Pixabay</p>
                <CreateLink url={'https://pixabay.com/'} />


                <p> Icons I've used from flaticon </p>


                <LinkWithText url={'https://www.flaticon.com'} text={'flaticon'}/>

                <p>Authors</p>
                <LinkWithText url={'https://www.flaticon.com/authors/becris'} text={'Becris'}/>
                <LinkWithText url={'https://www.flaticon.com/authors/smashicons'} text={'Smashicons'}/>
                <LinkWithText url={'http://www.freepik.com'} text={'Freepik'}/>
                <LinkWithText url={'https://www.flaticon.com/authors/baianat'} text={'Baianat'}/>
                <LinkWithText url={'https://www.flaticon.com/authors/gregor-cresnar'} text={'Gregor Cresnar'}/>

            </div>
        );
    }
}

module.exports = About;
