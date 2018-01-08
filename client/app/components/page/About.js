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
            <div className='content-container' style={{
                border: 'solid 0.5px silver', backgroundImage: `url(../images/friend.jpg)`
            }}>
                <div style={{
                    background: '#1E2326', textAlign: 'left', padding: '50px', opacity: '0.9'
                }}>
                    <h1> Thanks for visiting and maybe also playing our game? </h1>


                    <h3> Credit </h3>
                    <p> I have made all the software for this project and you are free
                to check out the code at </p>
                    <CreateLink url={'https://github.com/Nicklas766'} />
                    <CreateLink url={'https://github.com/Nicklas766/bth-team-app'} />
                    <CreateLink url={'https://github.com/Nicklas766/socket-mansion'} />
                    <CreateLink url={'https://github.com/Nicklas766/mongo-connecter'} />

                    <p> I am not a designer, but I always strive to make it look good aswell.
                I have borrowed some awesome music and images to make the website
                feel more alive. Below you can see the credits for these.</p>


                    <h3> Music </h3>
                    <p>  for the login and battle is made by www.bensound.com  </p>
                    <CreateLink url={'https://www.bensound.com/'} />

                    <h3> Images </h3>
                    <p> The background images is from the very broad and nice website, Pixabay. </p>
                    <CreateLink url={'https://pixabay.com/'} />


                    <h3> Icons </h3>


                    <LinkWithText url={'https://www.flaticon.com'} text={'flaticon'}/>

                    <p>Authors</p>
                    <LinkWithText url={'https://www.flaticon.com/authors/becris'} text={'Becris'}/>
                    <LinkWithText
                        url={'https://www.flaticon.com/authors/smashicons'}
                        text={'Smashicons'}/>
                    <LinkWithText url={'http://www.freepik.com'} text={'Freepik'}/>
                    <LinkWithText url={'https://www.flaticon.com/authors/baianat'}
                        text={'Baianat'}/>
                    <LinkWithText
                        url={'https://www.flaticon.com/authors/gregor-cresnar'}
                        text={'Gregor Cresnar'}/>
                </div>
            </div>
        );
    }
}

module.exports = About;
