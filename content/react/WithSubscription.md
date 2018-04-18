### React高阶组件

 - 其实高阶组件[官方文档](https://reactjs.org/)说的其实比较详细的，类似于容器组件， 组件之间通过props之间传递数据。但是高阶组件有自己的优点和不同之处。
  1. 组件是将props转化成UI，然而高阶组件将一个组价转化成另外一个组件。注意是形成了一个新组建。
  2. 高阶组件主要是为了处理逻辑的，而不是注重UI视图的。

 - 具体来说，高阶组件是一个函数，能够接受一个组件并返回一个新的组件。

 话不多说直接帖我的工作代码了


 - WithSubscription.js
 ```js
import React, { Component } from 'react';
import settings from '../../config';
import { getStore } from '../../assets/utils/Utils';


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
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { TimeAnalysis } from '../../assets/utils/Utils';
import Utils from '../../assets/utils';

class Discount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...props,
      id: undefined
    }
  }

  componentWillReceiveProps = ({ DiscountList }) => {
    this.setState({ DiscountList });
  }

  //选择优惠
  _selectDiscount = Id => {
    this.setState(({ id }) => {
      return {
        id: id == Id ? undefined : Id
      };
    });
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
              <View style={styles.info_container}>
                <View style={[styles.discount_wrap, id == item.id ? styles.wrap_margin_selected : styles.wrap_margin_Notselected]}>
                  <Text style={{ fontSize: Utils.pxText(100), color: '#fff' }}>{parseFloat(item.discount) * 10}</Text>
                  <Text style={{fontSize: Utils.pxText(60), color: '#fff'}}>折</Text>
                </View>
                <View style={styles.info_wrap}>
                  <Text style={{fontSize: Utils.pxText(36), color: '#FF9F00'}}>优惠券</Text>
                  <Text style={{fontSize: Utils.pxText(22), color: '#999'}}>无门槛使用</Text>
                  <Text style={{ fontSize: Utils.pxText(22), color: '#999' }}>{TimeAnalysis(item.createtime)}-{TimeAnalysis(item.activetime)}</Text>
                </View>
              </View>
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

const styles = StyleSheet.create({
  container: {
    width: Utils.size.width,
    marginTop: Utils.pxScale(30),
    alignItems: 'center'
  },
  wrap: {
    marginBottom: Utils.pxScale(108)
  },
  background: {
    width: Utils.size.width - 2 * Utils.pxScale(20),
    height: 17 / 68 * (Utils.size.width - 2 * Utils.pxScale(20)),
    justifyContent: 'center'

  },
  NotSelect: {
    borderWidth: Utils.pxScale(0)
  },
  Select: {
    borderWidth: Utils.pxScale(5),
    borderColor: '#FF9F00'
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: Utils.pxScale(73),
    height: Utils.pxScale(73)
  },
  discount_wrap: {
    height: 17 / 68 * (Utils.size.width - 2 * Utils.pxScale(20)) - Utils.pxScale(5) * 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  info_wrap: {
    height: 17 / 68 * (Utils.size.width - 2 * Utils.pxScale(20)) - Utils.pxScale(5) * 2,
    marginLeft: Utils.pxScale(90),
    justifyContent: 'space-around',
  },
  wrap_margin_selected: {
    marginLeft: Utils.pxScale(40) - Utils.pxScale(5)
  },
  wrap_margin_Notselected: {
    marginLeft: Utils.pxScale(40)
  },
  info_container: {
    width: Utils.size.width - 2 * Utils.pxScale(20) - Utils.pxScale(5) * 2,
    height: 17 / 68 * (Utils.size.width - 2 * Utils.pxScale(20)) - Utils.pxScale(5) * 2,
    flexDirection: 'row',
  }
});

Discount.propTypes = {
  DiscountList: PropTypes.array.isRequired
};

export default Discount;
```
> 这是UI视图组件。此时我还没有完成组件全部任务。希望你能结合官网慢慢理解。UI视图组件通过接收高阶组件传递过来的数据，进行渲染UI视图

  - Coupon.js
```js
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Header from '../../common/Header';
import Button from '../../common/Button';
import Discount from '../../common/Discount';
import WithSubscription from '../../common/WithSubscription';
import Utils from '../../../assets/utils';

class Coupon extends Component {

  //使用优惠券
  _Used = () => {

  }
  
  render() {
    return (
      <View>
        <CouponWithSubscription />
        <Button title="使用" top={Utils.size.height - Utils.statusBarHeight - Utils.pxScale(88) - 2 * Utils.pxScale(80) + Utils.pxScale(3)} callback={() => this._Used} />
      </View>
    )
  }
}

class NotCoupon extends Component {
  
  render() {
    return (
      <View>
        <NotCouponWithSubscription />
      </View>
    )
  }
}

const TabBar = TabNavigator({
  Coupon: {
    screen: Coupon,
    navigationOptions: {
      tabBarLabel: ({ tintColor, foused }) => {
        return (<Text style={{ color: tintColor }}>可使用优惠券</Text>)
      }
    }
  },
  NotCoupon: {
    screen: NotCoupon,
    navigationOptions: {
      tabBarLabel: ({ tintColor, foused }) => {
        return (<Text style={{ color: tintColor }}>不可使用优惠券</Text>)
      }
    }
  },
}, {
    initialRouteName: 'Coupon',
    tabBarPosition: 'top', //tabbar位置  
    tabBarOptions: {
      activeTintColor: '#35D4A0',
      inactiveTintColor: '#333',
      labelStyle: {
        color: '#333',
        fontSize: Utils.pxText(28),
        top: Utils.pxScale(-13)
      },
      style: { //tabBar样式对象
        // padding: 0,
        height: Utils.pxScale(80),
        backgroundColor: '#FFFFFF',
      },
      indicatorStyle: {// 底行样式对象
        // width: Utils.pxText(28) * 3,
        backgroundColor: '#35D4A0',
        // marginLeft: Utils.size.width / 5 / 2 - Utils.pxText(28) * 3 / 2
      }
    }
  });

TabBar.navigationOptions = {
  header: null
};


const TabStackNavigator = StackNavigator({
  TabOrder: {
    screen: TabBar
  }
});

TabStackNavigator.navigationOptions = {
  header: () => (<Header title="使用优惠券" />)
};

const CouponWithSubscription = WithSubscription(Discount, '/home/Coupon/myCouponOn');
const NotCouponWithSubscription = WithSubscription(Discount, '/home/Coupon/myCouponOff');

export default TabStackNavigator;
```

> 这是容器组件。通过WithSubscription方法的调用，传递一个视图组件Discount和一个字符串，返回一个新的组件。新组建被渲染的时候，高阶组件中的类方法就回去执行。UI渲染、数据展示到此也就完成了。

- redux中很多地方都是使用的高阶组件。等待研究

 - 参考文献：
 [深入理解React 高阶组件](https://juejin.im/post/59eb26e951882578c6738fb0)