'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { topicType } from '../common/data';
import { getFullTime, getAjaxUrl, toHtml } from '../common/util';

const topics = getAjaxUrl('topics');

var TopicDetail = React.createClass({
	getInitialState() {  
        return {
        	topic: {},
            accesstoken : '',
            mdrender: true,
            detailUrl: getAjaxUrl('topic/' + this.props.params.id)
        };  
    },
    getDetailInfo() {
    	//ajax方法后期需要进行封装
    	var params = {
			mdrender: this.state.mdrender
		};
		if (this.state.accesstoken) {
			params.accesstoken = this.state.accesstoken;
		}
		return axios.get(this.state.detailUrl, { params })
		.then((res) => {
			if (res.data && res.data.success && res.data.data) {
				this.setState({ topic: res.data.data });
			}
		})
		.catch(function (error) {
			console.log(error);
		});
    },
    getTopicType(item) {
		return item.top ? '置顶' : topicType[item.tab];
	},
	up() {

	},
	answer() {

	},
    componentDidMount() {
		this.getDetailInfo()
	},
    render: function() {
        return (
        	<div>
	            <div className="topic-detail">
	            	<div className="top">
		            	<div className="title">
							{toHtml(this.state.topic.title)}
						</div>
						<div className="time">
							发布时间：{getFullTime(this.state.topic.last_reply_at)}
						</div>
		            	{ this.state.topic.author &&
							(<div className="author">
								作者：{this.state.topic.author.loginname}
							</div>)
						}
						<div className="tab">
							类型：{this.getTopicType(this.state.topic)}
						</div>
						<div className="visit">
							阅读：{this.state.topic.visit_count}
						</div>
					</div>
					<div className="main">
						<div className="content">
							{toHtml(this.state.topic.content)}
						</div>
					</div>
					<div className="append">
						<div className="count">
							回复：{this.state.topic.reply_count}
						</div>
						{ this.state.topic.replies && 
							<div className="content">
								{ this.state.topic.replies.map((v, k) => (
									<div className="reply-item" key={k}>
										<div className="top">
											<div className="left">
												<div className="user">
													<img src={v.author.avatar_url} />
													<div>{v.author.loginname}</div>
												</div>
												<div>{getFullTime(v.create_at)}</div>
												{v.is_uped && (<div>作者</div>)}
											</div>
											<div className="right">
												<i className="fa fa-thumbs-o-up" onClick={this.up.bind(this, v.id)} />
												<i className="fa fa-share" onClick={this.answer.bind(this, v.id)}></i>
											</div>
										</div>
										<div className="content">
											{toHtml(v.content)}	
										</div>
									</div>
								)) }
							</div>
						}
					</div>
	            </div>
            </div>
        );
    }
});

export { TopicDetail }