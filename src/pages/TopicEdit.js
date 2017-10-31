'use strict';

import React from 'react';
import ReactDom from 'react-dom';

var TopicEdit = React.createClass({
    render: function() {
        return (
            <div>
                <h5 className="title">hello, yeoman app!</h5>
                <div><a href="#/">返回首页</a></div>
                <div>这是详情页</div>
            </div>
        );
    }
});

export { TopicEdit }