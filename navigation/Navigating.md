### 嵌套goBack失效时候解决方案

  - 当顶层路由堆栈跳转时候，进入了一个信的堆栈，这个时候goBack方法失效。因为在进入心的堆栈的时候会形成新的路由历史。随意当前路由就是顶层路由。此时的navigation跟顶层路由页面得到的不是同一路由堆栈。所以goBack方法失效。
  #### 下面是我的解决方案

  ```js
  // App.js

  import NavigationService from './NavigationService';

  const TopLevelNavigator = StackNavigator({ /* ... */ })

  class App extends React.Component {
    // ...

    render(): {
      return (
        <TopLevelNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }
  ```
  > 你可以通过REF访问导航器并将其传递给导航服务，稍后我们将使用该导航服务进行导航。只使用应用程序的顶级（根）导航器。
  ```js
  import { NavigationActions } from 'react-navigation';

  let _navigator;

  function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
  }

  function navigate(routeName, params) {
    _navigator.dispatch(
      NavigationActions.navigate({
        type: NavigationActions.NAVIGATE,
        routeName,
        params,
      })
    );
  }

  // add other navigation functions that you need and export them

  export default {
    navigate,
    setTopLevelNavigator,
  };
  ```
  > 在下一个步骤中，我们定义导航服务，它是一个简单的模块，具有调度用户定义的导航动作的功能。

  ##### navigatorRef是App.js传递过来的实例对象，下面有很多的方法属性，你可以选择适合自己的，去自己封装方法

  ```js
  // any js module
  import NavigationService from 'path-to-NavigationService.js';

  // ...

  NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
  ```
  > 然后，在任何JavaScript模块中，只要导入从其中导出的导航服务和调用函数即可。你可以在你的反应组件之外使用这个方法，事实上，它在使用时也同样有效。