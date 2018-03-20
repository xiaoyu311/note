### navigation实现路由跳转

  - 给上一节路由页面添加跳转功能
  
  ```js
    import React, { Component } from 'react';
    import { View, Text, Button } from 'react-native';

    export default class One extends Component {
      render() {
        return (
          <View>
            <Text>one page</Text>
            <Button 
              title="go to Tow"
              onPress={() => this.props.navigation.navigator('Two')}/>
          </View>
        )
      }
    }
  ```
  > 我也不是很明白这个this.props里面都是写什么东西啊，这时候我们应该输出一下看一看的
  > 输出的结果是一个对象

  ```js
    { screenProps: undefined, navigation: {
      dispatch: function(inputAction){},
      goBack: function(key){},
      navigate: function(routeName, params, action){},
      setParams: function(params){},
      state: {
        key: "Init-id-1521554322230-0",
        routeName: "Two"
      }
    }}
  ```
  > 对象下很多方法，和属性。等实践过就来解释一下
  - navigate第一个单数routeName，明显就是路由url了， 第二个参数params就是你想自己传递的数据了.当点击路由跳转到你传递参数的路由时候。你便可以从this.props.navigation.state.params中获取传递过来的参数了。