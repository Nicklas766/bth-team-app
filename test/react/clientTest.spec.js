// /*eslint-disable no-unused-vars*/
//
// // Mocha
// import mocha from 'mocha';
// import { describe, it } from 'mocha';
//
// // Enzyme
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({ adapter: new Adapter() });
// import { shallow, mount } from 'enzyme';
//
// // React
// import React from 'react';
// import Home from '../../client/app/compontents/page/Home.js';
// import ClickShow from '../../client/app/compontents/ClickShow.js';
// /*eslint-enable no-unused-vars*/
//
// var assert = require('assert');
//
//
// // console.log(wrapper.debug());
//
// describe('<Home />', () => {
//     it('renders h1', () => {
//         const wrapper = shallow(<Home />);
//
//         assert(wrapper.find('h1').text() == 'Hej välkommen till min me-sida!');
//     });
// });
//
// describe('<ClickShow />', () => {
//     it('should not render child div, should render h2', () => {
//         const wrapper = shallow(
//             <ClickShow title="About me">
//                 <p>hello</p>
//             </ClickShow>
//         );
//
//         assert(wrapper.contains(<p>hello</p>) == false);
//         assert(wrapper.find('h2').text() == 'About me');
//     });
//
//     it('should render child div after click', () => {
//         const wrapper = shallow(
//             <ClickShow title="About me">
//                 <p>hello</p>
//             </ClickShow>
//         );
//
//         wrapper.simulate('click');
//         assert(wrapper.contains(<p>hello</p>) == true);
//
//         // PROCCESS EXIT TO ENSURE MONGODB TEST WORKS
//         process.exit(0);
//     });
// });
