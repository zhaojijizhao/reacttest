'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { topicType } from '../../common/data';

class TypeTab extends React.Component {
    constructor(props) {
        super(props);
        var typeArr = [
            {
                key: 'all',
                value: '全部'
            }
        ];
        for (var key in topicType) {
            typeArr.push({
                key: key,
                value: topicType[key]
            })
        } 
        this.state = {  
            typeArr: typeArr
        }; 
    }
    getTabClass(key) {
        var result = "tab-item";
        if (this.props.tab == key) {
            result += " on";
        }
        return result;
    }
    clickTab(key) {
        this.props.clickTab(key);
    }
    render() {
        return (
            <div>
                <div className="topic-tab">
                    {
                        this.state.typeArr.map((v, k) => {
                            return (<div
                                key={k}
                                className={this.getTabClass(v.key)}
                                onClick={this.clickTab.bind(this, v.key)}>
                                {v.value}
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TypeTab;