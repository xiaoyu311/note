### JavaScript深入之词法作用域

  ##### 作用域

  <font size=3>作用域是指程序源代码中定义变量的区域。<br>
  作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。<br>
  JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。</font>

  ##### 重点在于JavaScript采用词法作用域

  <font size=3>让我们认真看个例子就能明白之间的区别：</font>

  ```js
    var value = 1;

    function foo() {
        console.log(value);
    }

    function bar() {
        var value = 2;
        foo();
    }

    bar();

    // 结果是 ???
  ```
  <font size=3>假设JavaScript采用静态作用域，让我们分析下执行过程：<br>
  执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。<br>
  前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。</font>

  <font size=3>最后，让我们看一个《JavaScript权威指南》中的例子：</font>

  ```js
    var scope = "global scope";
    function checkscope(){
        var scope = "local scope";
        function f(){
            return scope;
        }
        return f();
    }
    checkscope();
  ```
  ```js
    var scope = "global scope";
    function checkscope(){
        var scope = "local scope";
        function f(){
            return scope;
        }
        return f;
    }
    checkscope()();
  ```
  <font size=3>两段代码都会打印：local scope。</font>

  而引用《JavaScript权威指南》的回答就是：

  > JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。

  <strong><font color='orange'>参考文献：</font></strong>
  https://github.com/mqyqingfeng/Blog/issues/3