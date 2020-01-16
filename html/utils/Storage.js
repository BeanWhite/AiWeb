/**
 * 封装的localStorage
 */

class Storage {
	constructor(arg) {
		this.name = 'storage';
	}
	//设置缓存
	setItem(key, value, expires) {
		let obj = {
			key: key,
			value: value,
			expires: expires, //过期时间,毫秒级
			startTime: new Date().getTime() //记录缓存存入时间，毫秒级
		};
		let options = {};

		//对象合并
		Object.assign(options, obj);

		if (options.expires) {
			//如果设置了过期时间
			localStorage.setItem(options.key, JSON.stringify(options));
		} else {
			//如果没有设置过期时间,获取value的对象类型
			let type = Object.prototype.toString.call(options.value);

			//如果是对象或者数组需要转为JSON字符串
			if (type == '[object Object]')
				options.value = JSON.stringify(options.value);
			if (type == '[object Array]')
				options.value = JSON.stringify(options.value);

			localStorage.setItem(options.key, options.value);
		}
	}

	//取出缓存
	getItem(key) {
		var item = localStorage.getItem(key);
		try {
			item = JSON.parse(item); //如果是JSON类型就转变为对象,一般用于封装存储
		} catch (e) {
			item = item; //如果不是JSON类型就直接返回值，没有封装存储
		}

		//判断是否设置了过期时间，通过封装存储的才有过期时间
		if (item.startTime) {
			let date = new Date().getTime();
			if (date - item.startTime > item.expires) {
				localStorage.removeItem(key)
				return false;
			} else {
				return item.value
			}
		} else {
			//返回未经过封装的对象
			return item
		}
	}
	removeItem(key) {
		localStorage.removeItem(key);
	}
	clear() {
		localStorage.clear();
	}
}

class seStorage {

	constructor(arg) {
		this.name = "sessionStorage";
	}
	setItem(key, value) {
		let obj = {
			key: key,
			value: value,
		};
		let options = {};
		//对象合并
		Object.assign(options, obj);
		//获取value的对象类型
		let type = Object.prototype.toString.call(options.value);
		//如果是对象或者数组需要转为JSON字符串
		if (type == '[object Object]')
			options.value = JSON.stringify(options.value);
		if (type == '[object Array]')
			options.value = JSON.stringify(options.value);

		sessionStorage.setItem(options.key, options.value);

	}
	getItem(key) {
		var item = sessionStorage.getItem(key);
		try {
			item = JSON.parse(item); //如果是JSON类型就转变为对象,一般用于封装存储
		} catch (e) {
			item = item; //如果不是JSON类型就直接返回值，没有封装存储
		}
		return item;
	}
}

var storage = new Storage();
var sstorage = new seStorage();