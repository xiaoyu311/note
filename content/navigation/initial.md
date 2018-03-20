### navigation初始化react-native项目路由页面

  - router路由文件下创建路由页面文件
  
  ```js
    import { StackNavigator } from 'react-navigation';
    import OneScreen from './One';
    import TwoScreen from './Two';
    const AppNavigator = ({
      One: {
        screen: OneScreen
      },
      Two: {
        screen: TwoScreen
      }
    }, {
      initialRouteName: 'One',
    });
    
    export default AppNavigator;
  ```

  > StackNavigator是一个返回React组件的函数, 所以我们可以直接从它导出App.js以用作我们的应用程序的根组件。 initialRouteName初始化路由

  - App文件中如下
  ```js
    import React, { Component } from 'react';
    import AppNavigator from './router';
    export default class App extends Component {
      render() {
        return <AppNavigator />
      }
    }
  ```