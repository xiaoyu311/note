### StackNavigator配置动画

- react-navigation内置跳转动画的路径发生了改变，由react-navigation/src/views/CardStackStyleInterpolator 改为react-navigation/src/views/CardStack/CardStackStyleInterpolator

 - 使用StackNavigator跳转页面时，react-navigation根据平台的不同内置了相应的跳转动画。内置的跳转动画在react-navigation/src/views/CardStack/CardStackStyleInterpolator中，共三种。forHorizontal:从右向左进入、forVertical:从下向上进入、forFadeFromBottomAndroid:从底部淡出。
  - 关于修改默认的跳转动画或者自定义动画效果，以下给出两个场景。

  ```js
  import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
  const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
      const { scene } = sceneProps;
      const { route } = scene;
      const params = route.params || {};
      const transition = params.transition || 'forHorizontal';
      return CardStackStyleInterpolator[transition](sceneProps);
    },
  });
  const CustomerNavigator = StackNavigator({
    ScreenKey: { screen: MyScreen },
    // other screens
  }, {
    transitionConfig: TransitionConfiguration,
  });
  ```

  > 假如希望CustomerNavigator内的某个页面使用forVertical的跳转动画效果，调用this.props.navigate('SomeScreenKey', { transition: 'forVertical' });切换页面即可。

  参考连接：
  [react-navigation自定义StackNavigator页面跳转动画](https://germinate.github.io/2017/title-%20react-navigation%E8%87%AA%E5%AE%9A%E4%B9%89StackNavigator%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC%E5%8A%A8%E7%94%BB/)