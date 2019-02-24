import Taro, { Component, Config } from '@tarojs/taro'
import { ComponentClass } from 'react'
import { View } from '@tarojs/components';

import './index.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Detail {
  props: IProps
}

class Detail extends Component {

  config:Config ={
    navigationBarTitleText: '详情'
  }

  componentDidMount(){
    console.log(this.$router.params)
  }

  render(){
    return <View>详情</View>
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>
