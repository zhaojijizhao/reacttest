'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
// import { App } from './pages/App';
import { TopicList } from './pages/TopicList';
import { TopicDetail } from './pages/TopicDetail';
import { Info } from './pages/Info';
import { Login } from './pages/Login';
import { TopicNew } from './pages/TopicNew';
import { TopicEdit } from './pages/TopicEdit';


//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={TopicList}></Route>
        <Route path='/login' component={Login} />
        <Route path='/list' component={TopicList} />
        <Route path='/detail/:id' component={TopicDetail} />
        <Route path='/info' component={Info} />
        <Route path='/new' component={TopicNew} />
        <Route path='/edit' component={TopicEdit} />
    </Router>
), document.getElementById('app'));
