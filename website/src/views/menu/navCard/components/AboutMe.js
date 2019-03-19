import React, {Component} from 'react'
import styles from './AboutMe.css'

import pic from 'src/assets/derrick.jpg'
export default class AboutMe extends Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.upper}>
                    <div className={styles.left}>
                        <p className={styles.title}><span className={styles.text}>Topgun</span> 偶尔写字的地方</p>
                        <p>菜鸟程序员</p>
                        <p>对前端开发、设计感兴趣，数据挖掘入门小白</p>
                        <p>喜欢屯书吃灰，历史政治随便翻翻</p>
                        <p>曾梦想做个文艺青年，后来放弃了计划</p>
                        <p>篮球运动爱好者，常年关注<span className={styles.text}>NBA</span></p>
                        <p>最早是芝加哥公牛队球迷，现在转进明尼苏达森林狼</p>
                        <p><span className={styles.text}>虎扑</span>JRS，<em>他强任他强，清风拂山岗</em></p>
                    </div>
                    <div className={styles.right}>
                    <img src={pic} width={200} height={280} alt="pic"/>
                    </div>
                </div>
                <div className={styles.bottom}>
                《黄金时代》里我喜欢的一段话：
                <blockquote>
                那一天我二十一岁，在我一生的黄金时代，我有好多奢望。
                我想爱，想吃，还想在一瞬间变成天上半明半暗的云。
                后来我才知道，生活就是个缓慢受槌的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了槌的牛一样。
                可是我过二十一岁生日时没有预见到这一点。<span className={styles.text}>我觉得自己会永远生猛下去，什么也槌不了我。</span>
                </blockquote>
                </div>
            </div>
        )
    }
}