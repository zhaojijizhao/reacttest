'use strict';

import React from 'react';
import ReactDom from 'react-dom';

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div>React Router: </div>
                <div><a href="#/list">list page111</a></div>
                <div><a href="#/detail">detail page</a></div>
            </div>
        );
    }
});

export { App } 
