### 介绍$route对象

 - params: 就是来获得这个动态部分的。它是一个对象，属性名，就是路径中定义的动态部分 id, 属性值就是router-link中to 属性中的动态部分

 ```vue
  {path: '/home/:id', component: home}

  <router-link to="`/home/${1}`"></router-link>
```
 - path：当前的路由值
 ```
  {path: '/home', component: home}
```
> 其中的path就是/home 也就是当前对应的路由

  - qurey