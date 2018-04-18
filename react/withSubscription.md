### React高阶组件

 - 其实高阶组件[官方文档](https://reactjs.org/)说的其实比较详细的，类似于容器组件， 组件之间通过props之间传递数据。但是高阶组件有自己的优点和不同之处。
  1. 组件是将props转化成UI，然而高阶组件将一个组价转化成另外一个组件。注意是形成了一个新组建。
  2. 高阶组件主要是为了处理逻辑的，而不是注重UI视图的。
 - 具体来说，高阶组件是一个函数，能够接受一个组件并返回一个新的组件。
 话不多说直接帖我的工作代码了
 - WithSubscription.js
 ```js
export default (WrappedComponent, url) => {
  return class extends Component {
    state = {
      DiscountList: [],
      Str: ''
    }

    componentDidMount = async () => {
      let goodsInfo = await getStore('goodsInfo');
      console.log(goodsInfo)
      let list = goodsInfo.map(item => ({ goods_id: item.goods_id, attr_value: item.attr_value }));
      let requestConfig = {
        method: 'POST',
        headers: {
          'Accept': 'application/json', //cros 不仅接受contenttype
        },
        body: JSON.stringify({ list })
      };
      let res = await fetch((settings.BaseUrl + url), requestConfig);
      let data = await res.json();
      if (data.status == 1) {
        let Str = url.split('/').pop();
        let DiscountList = data.data[0];
        this.setState({ DiscountList, Str });
      }
    }
    render() {
      const { DiscountList } = this.state;
      return (<WrappedComponent Str={Str} DiscountList={DiscountList} />)
    }
  }
}
  ```
  > 这是我自己的高阶组件。组件就是一个函数，通过传入UI视图组件，和一个字符串，请求数据，在进行数据的处理。把UI视图组件需要的数据传递下去。

  - Discount.js
```js
class Discount extends Component {
  componentWillReceiveProps = ({ DiscountList }) => {
    this.setState({ DiscountList });
  }
  render() {
    const { id, DiscountList } = this.state;
    console.log(DiscountList)
    const List = DiscountList.map((item, index) => (
      <View key={item.id} style={[styles.container, index == DiscountList.length - 1 ? styles.wrap : {}]}>
        <ImageBackground style={[styles.background]} source={require('../../assets/img/myCouponOn.png')}>
          <TouchableOpacity onPress={() => this._selectDiscount(item.id)}>
            <View style={[styles.background, id == item.id ? styles.Select : styles.NotSelect]}>
              {
                item.id == id ? <Image style={styles.icon} source={require('../../assets/img/able.png')} /> : null
              }
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    ));
    return (
      <ScrollView>
        {List}
      </ScrollView>
    )
  }
}
Discount.propTypes = {
  DiscountList: PropTypes.array.isRequired
};
export default Discount;
```
> 这是UI视图组件。此时我还没有完成组件全部任务。希望你能结合官网慢慢理解。UI视图组件通过接收高阶组件传递过来的数据，进行渲染UI视图
  - Coupon.js
```js
class Coupon extends Component {
  render() {
    return (
      <View>
        <CouponWithSubscription />
        <Button title="使用" top={Utils.size.height - Utils.statusBarHeight - Utils.pxScale(88) - 2 * Utils.pxScale(80) + Utils.pxScale(3)} callback={() => this._Used} />
      </View>
    )
  }
}
const CouponWithSubscription = WithSubscription(Discount, '/home/Coupon/myCouponOn');
export default TabStackNavigator;
```
> 这是容器组件。通过WithSubscription方法的调用，传递一个视图组件Discount和一个字符串，返回一个新的组件。新组建被渲染的时候，高阶组件中的类方法就回去执行。UI渲染、数据展示到此也就完成了。

- redux中很多地方都是使用的高阶组件。等待研究

 - 参考文献：
 [深入理解React 高阶组件](https://juejin.im/post/59eb26e951882578c6738fb0)