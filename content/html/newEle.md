### HTML5新标签

 - hgroup：网页或区段(section)标题进行组合
 ```html
  <hgroup>我要和下面的一起使用</hgroup>
  <section>
    <span>我爹和上面组合</span>
    <span>我爹和上面组合</span>
  </section>
 ```
 - figure: 文档中插入图像
 - figcaption： 文档插图图像标题
 ```html
  <figure>
    <img src="./images/1.jpg" />
    <figcaption>我是图片的标题或底部解释呦</figcaption>
  </figure>
```
  > Internet Explorer 8 以及更早的版本不支持 figcaption标签。"figcaption" 元素应该被置于 "figure" 元素的第一个或最后一个子元素的位置。
  - article: 标签规定独立的自包含内容（论坛帖子、报纸文章、博客条目、用户评论）
  - asid: 定义文章以外的内容
  ```html
  <article>
    <h1>我是文章标题</h1>
    <p>我是文章内容</p>
  </article>
  <aside>
    <h4>我是文章外面的内容小标题</h4>
    我就是内容啦！
  </aside>
  ```
  - center: 文章内容水平剧中（等同于text-align:center）
  ```html
  <h1><center>这样我就直接居中拉 不需要css样式</center></h1>
  ```

  - table相关的一些东西
  ```html
  <table>
    <thead>
      <tr>
        <th>我变粗了</th>
        <th>我也变粗了</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>我是主题内容</td>
        <td>我是主题内容</td>
      </tr>
      <tr>
        <td>我是主题内容</td>
        <td>我是主题内容</td>
      </tr>
    </tbody>
    <tfoot>和上面类似</tfoot>
  </table>
  ```
  > th可以加粗字体  tr成行  td成单元格  这些标签好用但是兼容性不好，所以别用到的少
