### 梳理 *浏览器模式* 和 *doctype* 作用
  <hr/>

  #### 浏览器模式介绍

  有的网站是遵循标准创作，有的却不是。即使不能遵循创建标准的网页，我们浏览器也可以显示那些页面，呈现方式可能会有所区别，这是为什么呢？显然是因为浏览器有自己的解析代码规则的。

  ***浏览器呈现模式***

  1. <font color="green">Standards:</font> 标准模式（也就是严格呈现模式）用于呈现遵循最新标准的网页。
  2. <font color="green">Quirks：</font> 包容模式，用于呈现为传统浏览器而设计的网页。
  3. <font color="green"> Almost Standards：</font> 近似标准模式，用于支持为标准的某个老版本而设计的网页。

  #### ***DOCTYPE***（文档解析器）

  > ***w3c介绍：<!DOCTYPE>*** 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。它声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。

  在遵循标准的所有Web文档中，DOCTYPE这条指令是必不可少的，不仅会影响代码校验，还决定浏览器最终如何解析你的Web文档它告诉类似的代码校验器或者浏览器应该按照什么规则集解析文档，这些“规则”就是W3C发表的文档类型定义（DTD）中包含的规则。

  ##### ***文档类型定义（DTD)***

  DTD中包含了一系列标记、属性，用于标记Web文档中能出现哪些元素和元素之间的包含关系。如果没有指定有效的DOCTYPE声明，浏览器可能会使用内置的默认DTD。你也可以自定义DTD，但一般不推荐这样。常见的DOCTYPE声明如下：

  ```html
    HTML 5(HTML5 不基于 SGML，所以不需要引用 DTD。)
    <!DOCTYPE html>

    HTML 4.01 Strict：
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

    HTML 4.01 Transitional：
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

    HTML 4.01 Frameset：
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

    HTML 3.2：
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">

    HTML 2：
    <!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">

    XHTML 1.0 Strict：
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

    XHTML 1.0 Transitional：
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    XHTML 1.0 Frameset：
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

    XHTML 1.1：
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

    XHTML 1.1 plus MathML plus SVG：
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//EN" "http://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd">
  ```

  > **DOCTYPE声明这一条指令必须在<html>标记之前定义。**

   <strong><font color='orange'>参考文献：</font></strong>

  http://blog.csdn.net/jom_ch/archive/2007/09/04/1772165.aspx
  https://en.wikipedia.org/wiki/Document_type_declaration
  https://html.spec.whatwg.org/multipage/syntax.html#the-doctype


  