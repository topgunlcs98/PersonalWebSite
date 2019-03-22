import React, {Component} from 'react'
import { List } from 'antd'
import { PostApi } from 'src/ajax'

import BlogItem from './components/BlogItem'
import styles from './MyBlog.css'

export default class MyClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        this.fetchInfos()
    }

    fetchInfos = async() => {
        try {
            const {data} = await PostApi.fetchPost()
            this.setState({
                blogs: data
            })
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        console.log(this.state)
        return(
            <div className={styles.container}>
                <h3>MyBlogs:</h3>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                >
                    {this.state.blogs.map((value,key) =>
                        <div key={key} className={styles.itemContainer}> 
                            <BlogItem key={key} title={value.title} id={value._id} 
                                tag={value.tag} body={value.body} updateInfo={this.fetchInfos}/>
                        </div>
                        )}
                </List>
            </div>
        )
    }
}