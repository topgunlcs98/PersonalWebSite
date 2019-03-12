import React, { Component } from 'react';
import { Card, Icon } from 'antd'

import AboutMe from './components/AboutMe'

export default class NavTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: 'me',
            noTitleKey: 'me'
        }
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
      }
    
    render() {
        const labelArticle = (
            <div><Icon type="highlight" theme="twoTone" />文章article</div>
        )
        const labelAboutMe = (
            <div> <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />我About Me</div>
        )
        const labelResume = (
            <div> <Icon type="file-pdf" theme="twoTone" twoToneColor="#52c41a" />在线简历Resume</div>
        )
        const contentListNoTitle = {
            article: <p>article content</p>,
            me: <AboutMe />,
            resume: <p>project content</p>,
          }
          const tabListNoTitle = [{
            key: 'article',
            tab: labelArticle,
          }, {
            key: 'me',
            tab: labelAboutMe,
          }, {
            key: 'resume',
            tab: labelResume,
          }]

        return(
            <div style={{marginTop: '10px'}}>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                >
                    {contentListNoTitle[this.state.noTitleKey]}
                </Card>
            </div>
        )
    }
}