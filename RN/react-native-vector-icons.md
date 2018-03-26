###react-native-vector-icons Android配置
 
 1. 编辑android/settings.gradle

```js
  rootProject.name = '项目名字'
  + include ':react-native-vector-icons'
  + project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')

  include ':app'
```

2. 编辑android/app/build.gradle

```js
  dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
    + compile project(':react-native-vector-icons')
  }
```

3. 编辑 android/app/src/main/java/MainApplication.java文件

```js
  package com.myapp;

  + import com.oblador.vectoricons.VectorIconsPackage;

  ....

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage()
  +   , new VectorIconsPackage()
    );
  }
}
```
> 千万不要忘记加逗号，要不然会很尴尬的。

4. 删除 node_modules/react-native/local-cli/core/ _ fixtures _/files/package.json 文件
> 基本大功告成了