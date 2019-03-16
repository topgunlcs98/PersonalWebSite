import React, {Component} from 'react'
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment'

import guest from 'src/assets/guest.jpg'

export default class CommentItem extends Component {
    
      render() {
        const standardDate = moment(this.props.date).format('YYYY-MM-DD HH:mm:ss')
        var authorName= this.props.author || '匿名游客'
        return (
          <Comment
            author={authorName}
            avatar={(
              <Avatar
                src={guest}
                alt="guest"
              />
            )}
            content={(
              <p>{this.props.content}</p>
            )}
            datetime={(
              <Tooltip>
                <span style={{color: 'black'}}>{standardDate}</span>
              </Tooltip>
            )}
          />
        );
      }
}