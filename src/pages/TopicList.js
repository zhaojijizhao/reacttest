'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import scroll from '../components/common/scroll.js';
import { topicType } from '../common/data';
import { getFullTime, getAjaxUrl, toHtml } from '../common/util';

const topics = getAjaxUrl('topics');

var TopicList = React.createClass({
	getInitialState() {  
        return {  
            page: 1,
            limit: 20,
            mdrender: false,
            topics: []
        };  
    },
	getlistInfo(add) {
		//ajax方法后期需要进行封装
		var params = {
			page: this.state.page,
			mdrender: this.state.mdrender,
			limit: this.state.limit
		};
		if (this.state.tab) {
			params.tab = this.state.tab;
		}
		return axios.get(topics, { params })
		.then((res) => {
			if (res.data && res.data.success && res.data.data) {
				let topics = this.state.topics || [];
				if (add) {
					topics = topics.concat(res.data.data);
				} else {
					topics = res.data.data;
				}
				this.setState({ topics, isScrolling: false });
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	componentDidMount() {
		this.getlistInfo().then(() => {
			this.bindPushRefresh();
		})
	},
	bindPushRefresh() {
		window.addEventListener('scroll', this.pushRefresh);
	},
	pushRefresh() {
		//处理滚动的事件，后期需要抽离成scroll组件
		let scrolllog = document.getElementById('scrolllog');
		if (scrolllog) {
			let scrollHeight = document.body.scrollTop;
			let bodyHeight =  document.body.offsetHeight;
			let windowHeight = window.innerHeight;
			let loadingHeight = scrolllog.offsetHeight;
			let ifRefreah  = (scrollHeight + windowHeight - loadingHeight) >  (bodyHeight - 20);
			if (ifRefreah && !this.state.isScrolling) {
				this.state.isScrolling = true;
				this.state.page++;
				this.getlistInfo(true);
			}
		}		
	},
	getTopicType(item) {
		return item.top ? '置顶' : topicType[item.tab];
	},
	getTopicClass(item) {
		return  (item.top || item.good) ? 'hilight tab' : 'tab';
	},
	toDetail(id) {
		location.href = "#/detail/" + id;
	},
    render: function() {
        return (
            <div>
            	<div className="topic-list" id="topic-list">
            		{
            			this.state.topics.map((v, k) => {
            				return (
            					<div className="item" key={k} onClick={this.toDetail.bind(this, v.id)}>
            						<div className="author">
            							<img src={v.author.avatar_url} />
            							<div>{v.author.loginname}</div>
            						</div>
            						<div className="content">
            							<div className="title">
            								{toHtml(v.title)}
            							</div>
            							<div className="time">
	            							{getFullTime(v.last_reply_at)}
	            						</div>
            						</div>
            						<div className={this.getTopicClass(v)}>
            							{this.getTopicType(v)}
            						</div>
            						
            						<div className="reply">
            							{v.reply_count}/{v.visit_count}
            						</div>
            					</div>
            				)
            			})
            		}
            		<div id="scrolllog"></div>
            	</div>
            </div>
        );
    }
});

export { TopicList }