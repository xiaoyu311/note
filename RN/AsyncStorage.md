### AsyncStorage 在android 调试 onload后 AsyncStorage方法失效。

  - RN坑真的有点多，作为一程序人天天都是水深火热中。记录这些坑，你们遇到的时候能尽快的决解问题。跳出深坑。

  ```js
  import { AsyncStorage } from 'react-native';
    /**
 * 数据持久化存储
 * @param key 键 
 * @param value 键值 
 * @param callback 回掉函数 
  */
  export const setStore = (key, value) => {
    'static';
    return new Promise((resolve, reject) => { 
      if (!key) return;
      if (!value) return;
      AsyncStorage.setItem(key, JSON.stringify(value), error => {
        if (!error)
          resolve(true);
        else
          reject(false);
      });
    });
  };

  export const getStore = key => {
    return new Promise((resolve, reject) => {
      if (!(key && typeof key === 'string')) return;
      AsyncStorage.getItem(key, (err, value) => {
        if (!err) {
          resolve(JSON.parse(value));
        } else {
          reject(null);
        }
      });
    });
  }
  ```
  - React Native version: React Native @0.52

  上面是我封装的存储方法，在第一次页面渲染的时候是可以执行的，但是你在写其他代码的时候，你们页面会onload。之后方法就不在去执行。

  - 这应该是RN中一个bug

  #### 我们就直奔主题直接决解这个问题；

  - 我们在我们的 Android/app/src/AndroidManifest.xml文件中假如一行代码，
  ```js
   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  ```
  - 这样就给程序加了一个并行权限，问题应该就决解了。

  - 参考连接： 
    1. [安卓机上load无法使用的问题 #147](https://github.com/sunnylqm/react-native-storage/issues/147)
    2. [AsyncStorage not fulfilling promise on Android 7+ #14101](https://github.com/facebook/react-native/issues/14101#issuecomment-345563563)