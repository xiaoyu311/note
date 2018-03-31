## fetch网络请求
  #### fetch 和 ajax 的不同
  1. 当接受一个错误的请求的时候，fetch的返回promise不会被标记为reject，会执行resolve
  2. 但是会将resolve的返回值的ok属性设置为false， 当网络故障的时候会执行reject
  3. fetch不会从服务端发送或者接收cookie
  4. 由于原生的fetch API并不支持timeout属性，如果项目中需要控制fetch的请求超时时间，需要对fetch请求进一步封装实现timeout功能。

  ##### 代码在下方：

  ```js
    import settings from '../config';
/**
 * @param {string}    method       [请求类型]
 * @param {string}    url          [请求地址]
 * @param {object}    params       [请求参数]
 * @param {boolean}   delay        [延时请求]
 */

const xFetch = async (method = 'GET', url = '', params = {}, delay = false) => {
	method = method.toUpperCase();
	let Url;
	let requestConfig = {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		mode: "cors",
	};
	let token = false;
	if (method === 'GET') {
		let startParams = '';
		Object.keys(params).forEach(item => {
			startParams = startParams + item + '=' + params[item] + '&';
		});
		if (startParams) {
			Url = settings.BaseUrl + url + '?' + startParams.substring(0, startParams.lastIndexOf('&'));
		} else {
			Url = settings.BaseUrl + url;
		}
	}
	if (method === 'POST') {
		Object.defineProperty(requestConfig, 'body', {
			value: JSON.stringify(params)
		})
	}
	const PromiseObj = fetch(Url, requestConfig);
	if (delay) {
		return await timeoutFetch(settings.TIME_OUT, PromiseObj);
	}
	const res = await timeoutPromise(settings.TIME_OUT, PromiseObj);
	if (res.status === 200) {
		const response = await res.json();
		return response;
	} else {
		throw new Error(`${res.code} ${response.message}`);
	}
}

const checkIfErrorOccurs = res => {
	return {
		code: res.status,
		res
	}
}
/**
* 延时异步请求async
* @Author   xiaoyu
* @DateTime 2018-01-19
* @param    {number}   ms      [延时时间]
* @param    {Object}   promise [Promise]
*/
const timeoutPromise = (ms, promise) => {
	return new Promise((resolve, reject) => {
		const time = setTimeout(() => {
			reject(new Error('request time out'))
		}, ms)
		promise.then((res) => {
			clearTimeout(time);
			resolve(res);
		})
		promise.catch((error) => {
			clearTimeout(time);
			resolve(checkIfErrorOccurs(res));
		})
	})
}

export default xFetch;
```

> 加入超时处理的fetchRequest网络请求的使用方法跟没加入超时处理一样。 对于fetch网络请求的超时处理的封装参考下面这篇文章而写：

[React Native 网络请求封装：使用 Promise 封装 fetch 请求](https://juejin.im/entry/590fe17b1b69e6006854987b)