import React, {Component} from 'react'
import {Tag, Input, Tooltip, Icon, Button, message} from 'antd'

import {ProfileApi} from 'src/ajax'

export default class SkillSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: '',
          }
    }

    submitChange = async() => {
        const body={
            index: this.props.id,
            skill: this.state.tags
        }
        try {
            await ProfileApi.changeSkills(body)
        } catch(err) {
            console.log(err)
        }
        message.success('成功修改技能！')
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.skills
        })
    }
    
      handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        })
      }

      saveInputRef = input => this.input = input

    render(){
        const { tags, inputVisible, inputValue } = this.state
        return(
            <div>
                <h3>修改技能</h3>
                <Tag closable={false} color="#f50">我的技能</Tag>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
           <Button type="primary" size={'small'} onClick={this.submitChange}>去修改</Button>
          </div>
        )
    }
}