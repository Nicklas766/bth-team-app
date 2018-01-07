var React = require('react');
var ReactDOM = require('react-dom');

require('./style/index.css');
require('./style/header.css');
require('./style/profile.css');
require('./style/spinning.css');
var App = require('./components/App');

ReactDOM.render(< App />, document.getElementById('app'));
