import env from './env.js';
import React from 'react';
import ReactDom from 'react-dom';

function getFullTime(str) {
	//时间处理
	var date = new Date(str);
	return date.toLocaleString();
}

function getAjaxUrl(path) {
	//根据环境配置ajax请求头
	return 'https://cnodejs.org/api/v1/' + path;
}

function toHtml(str) {
	//展示html内容
	if (str) {
		str = str.replace(/\/user\//g, '#/info/');
		str = str.replace(/http[s]*:\/\/cnodejs.org\//g, '#/');
	}
	var html = {__html: str};
	return <div dangerouslySetInnerHTML={html}></div>
}

export { getFullTime, getAjaxUrl, toHtml }