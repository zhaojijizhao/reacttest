'use strict';

import React from 'react';
import ReactDom from 'react-dom';

var Error = React.createClass({
    render: function() {
        return (
            <div className="error">
                <h5 className="title">对不起没有找到指定页面，请点击返回！</h5>
                <div><a href="#/">返回首页</a></div>
            </div>
        );
    }
});

export { Error }