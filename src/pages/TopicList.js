'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import scroll from '../components/common/scroll.js';
import TypeTab from '../components/topicList/typeTab.js';
import { topicType } from '../common/data.js';
import { getFullTime, getAjaxUrl, toHtml } from '../common/util';

const topics = getAjaxUrl('topics');

var TopicList = React.createClass({
	getInitialState() {  
        return {  
            page: 1,
            limit: 20,
            mdrender: false,
            topics: [],
            tab: 'all',
            isLastPage: false
        };  
    },
	getlistInfo(add) {
		//ajax方法后期需要进行封装
		var params = {
			page: this.state.page,
			mdrender: this.state.mdrender,
			limit: this.state.limit
		};
		if (this.state.tab && this.state.tab != 'all') {
			params.tab = this.state.tab;
		}
		return axios.get(topics, { params })
		.then((res) => {
			if (res.data && res.data.success && res.data.data) {
				let topics = this.state.topics || [];
				let isLastPage = this.state.isLastPage;
				if (res.data.data.length == 0) {
					isLastPage = true;
				} else {
					if (add) {
						topics = topics.concat(res.data.data);
					} else {
						topics = res.data.data;
					}
				}
				this.setState({ topics, isLastPage, isScrolling: false });
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
			let ifRefreah  = (scrollHeight + windowHeight - loadingHeight) >  (bodyHeight - 72);
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
	resetParam() {
		this.state.page = 1;
        this.state.limit = 20;
        this.state.mdrender = false;
        this.state.tab = 'all';
        this.state.isLastPage = false;
	},
	clickTab(key) {
		if (key != this.state.tab) {
			this.resetParam();
			this.state.tab = key;
			this.getlistInfo();
		}
	},
	toDetail(id) {
		location.href = "#/detail/" + id;
	},
    render: function() {
        return (
            <div>
            	<div className="topic-list" id="topic-list">
            		<TypeTab 
            			clickTab={this.clickTab} 
            			tab={this.state.tab}
            		></TypeTab>
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
            		<div id="scrolllog">
            			{
            				this.state.isLastPage ? 
            				(<div className="scrolllog">
            					<div className="txt">{"已经没有更错内容了"}</div>
            				</div>)
            				:(<div className="scrolllog">
        						<div className="inner"></div>
        						<div className="txt">{"下刷新加载内容"}</div>
        					</div>)
            			}
            		</div>
            	</div>
            </div>
        );
    }
});

export { TopicList }