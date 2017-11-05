'use strict';

import React from 'react';
import ReactDom from 'react-dom';

var Info = React.createClass({
    render: function() {
        return (
            <div>
                <h5 className="title">个人信息页面</h5>
                <div>用户信息</div>
            </div>
        );
    }
});

export { Info }