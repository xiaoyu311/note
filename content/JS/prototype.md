### 构造函数创建对象  
  <hr>
  <h6>创建一个对象：</h6>

  ```js
    function Person() {}
    var person = new Person();
    person.name = 'Kevin';
    console.log(person.name) // Kevin
  ```
  > <font size=3>这个例子Person就是一个构造函数，使用new创建一个实例对象person。</font>

  ##### prototype
  <font size=3>每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype ，比如：</font>

  ```js
    function Person() {}
    // 虽然写在注释里，但是你要注意：
    // prototype是函数才会有的属性
    Person.prototype.name = 'Kevin';
    var person1 = new Person();
    var person2 = new Person();
    console.log(person1.name) // Kevin
    console.log(person2.name) // Kevin
  ```
  <font size=3>那这个函数的 prototype 属性到底指向的是什么呢？是这个函数的原型吗？<br>
  其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。<br>
  那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。</font>
  
  <font size=3>让我们用一张图表示构造函数和实例原型之间的关系：</font>

  ![prototype](../../images/prototype1.png)

  <font size=3>在这张图中我们用 Object.prototype 表示实例原型。<br>
  那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：</font>

  ##### __proto __

  <font size=3>这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。<br>
  为了证明这一点,我们可以在火狐或者谷歌中输入：</font>

  ```js
    function Person() {}
    var person = new Person();
    console.log(person.__proto__ === Person.prototype); // true
  ```

  <font size=3>于是我们更新下关系图：</font>

  ![prototype2](../../images/prototype2.png)

  <font size=3>既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？</font>

  ##### constructor

  <font size=3>指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。<br>
  为了验证这一点，我们可以尝试：</font>

  ```js
    function Person() {}
    console.log(Person === Person.prototype.constructor); // true
  ```

  <font size=3>所以再更新下关系图：</font>

  ![prototype3](../../images/prototype3.png)

  <font size=3>综上我们已经得出：</font>

  ```js
    function Person() {}

    var person = new Person();

    console.log(person.__proto__ == Person.prototype) // true
    console.log(Person.prototype.constructor == Person) // true
    // 顺便学习一个ES5的方法,可以获得对象的原型
    console.log(Object.getPrototypeOf(person) === Person.prototype) // true
  ```

  <font size=3>了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：</font>

  ##### 实例与原型

  <font size=3>当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。<br>
  举个例子：</font>

  ```js
    function Person() {

    }

    Person.prototype.name = 'Kevin';

    var person = new Person();

    person.name = 'Daisy';
    console.log(person.name) // Daisy

    delete person.name;
    console.log(person.name) // Kevin
  ```

  <font size=3>在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。<br>
  但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.__proto __ ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。<br>
  但是万一还没有找到呢？原型的原型又是什么呢？</font>

  ##### 原型的原型

  <font size=3>在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：</font>


  ```js
    var obj = new Object();
    obj.name = 'Kevin'
    console.log(obj.name) // Kevin
  ```

  <font size=3>其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 __proto __ 指向构造函数的 prototype ，所以我们再更新下关系图：</font>

  ![prototype4](../../images/prototype4.png)

  ##### 原型链

  <font size=3>那 Object.prototype 的原型呢？<br>
  null，我们可以打印：</font>

  ```js
    console.log(Object.prototype.__proto__ === null) // true
  ```

  <font size=3>然而 null 究竟代表了什么呢？<br>
  引用阮一峰老师的 [《undefined与null的区别》](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html) 就是：<br>
  null 表示“没有对象”，即该处不应该有值。<br>
  所以 Object.prototype.__proto __ 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。<br>
  所以查找属性的时候查到 Object.prototype 就可以停止查找了。<br>
  最后一张关系图也可以更新为：</font>


  ![prototype5](../../images/prototype5.png)

  <font size=3>顺便还要说一下，图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。</font>

  ##### 补充

  <font size=3>最后，补充三点大家可能不会注意的地方：</font>

  **constructor**

  <font size=3>首先是 constructor 属性，我们看个例子：</font>

  ```js
    function Person() {

    }
    var person = new Person();
    console.log(person.constructor === Person); // true
  ```

  <font size=3>当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：</font>

  ```js
    person.constructor === Person.prototype.constructor
  ```

  **__proto __**

  <font size=3>其次是 __proto__ ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。</font>

  <strong><font color='orange'>参考文献：</font></strong>
  https://github.com/mqyqingfeng/Blog/issues/2