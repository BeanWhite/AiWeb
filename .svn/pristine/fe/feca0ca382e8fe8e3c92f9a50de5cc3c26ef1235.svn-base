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
	
	removeItem(key){
		sessionStorage.removeItem(key)
	}
	
	clearAll(){
		sessionStorage.clear()
	}
}
/**
 * 封装的计时器
 */
class Timer{
	constructor(o, hour, min, seconds, p, timerSpeed) {
		this.status = 0;
		this.SS  = 0;
		this.timer = null;
		this.o = {};
		this.o = o;
		this.TimerObj = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			p: 0
		}
		if (hour)
			this.hours = hour;
		else
			this.hours = 0;
		if (min)
			this.minutes = min;
		else
			this.minutes = 0;
		if (seconds)
			this.seconds = seconds;
		else
			this.seconds = 0;
		if (p)
			this.p = p;
		else
			this.p = 0;
		if (timerSpeed)
			this.timerSpeed = timerSpeed;
		else
			this.timerSpeed = 1000;
	}
	__init(){
		this.TimerObj = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			p: 0
		}
	}
	setObject(o) {
		this.o = o;
		//clearInterval(this.timer);
	}
	setHours(h) {
		this.hours = h;
		//clearInterval(this.timer);
	}
	setMinute(min) {
		this.minutes = min;
		//clearInterval(this.timer);
	}
	setSeconds(s) {
		this.seconds = s;
		//clearInterval(this.timer);
	}
	setSpeeds(s){
		this.timerSpeed = s;
	}
	setP(p) {
		this.p = p;
		//clearInterval(this.timer);
	}
	reSet(o, hour, min, seconds, p, timerSpeed){
		clearInterval(this.timer)
		this.o = {};
		this.o = o;
		this.TimerObj = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			p: 0
		}
		if (hour)
			this.hours = hour;
		else
			this.hours = 0;
		if (min)
			this.minutes = min;
		else
			this.minutes = 0;
		if (seconds)
			this.seconds = seconds;
		else
			this.seconds = 0;
		if (p)
			this.p = p;
		else
			this.p = 0;
		if (timerSpeed)
			this.timerSpeed = timerSpeed/100;
		else
			this.timerSpeed = 10;
	}
	
	/**
	 * 正常计时
	 */
	startTimer() {
		this.SS = 0;
		let m;
		if(this.p>=100){
			m = this.p;
			this.p = this.p%100;
			this.seconds = this.seconds + Math.floor(m/100);
		}
		if(this.seconds>=60){
			m = this.seconds;
			this.seconds = this.seconds%60;
			this.minutes = this.minutes + Math.floor(m/60);
		}
		if(this.minutes>=60){
			m = this.minutes;
			this.minutes = this.minutes%60;
			this.hour = this.hour + Math.floor(m/60); 
		}
		
		if(this.status==-10)
			this.status=0;
		if(this.status==0){
			this.status=1;
			let that = this;
			this.timer = setInterval(function() {
				that.TimerObj.p++;
				if (that.TimerObj.p == 100) {
					that.TimerObj.p = 0;
					that.TimerObj.seconds++;
					if (that.TimerObj.seconds == 60) {
						that.TimerObj.seconds = 0;
						that.TimerObj.minutes++;
						if (that.TimerObj.minutes == 60) {
							that.TimerObj.hours++
						}
					}
				}
				for(let i in that.TimerObj){
					that.o[i] = that.TimerObj[i];
				}
				that.__stopTimer(1);
			}, 1);
		}else return
	}
	/**
	 * 暂停
	 */
	pause(){
		clearInterval(this.timer);
		this.status = -10;
	}
	
	/**
	 * 继续
	 */
	goOn(){
		if(this.SS ==0){
			this.startTimer()
		}else if(this.SS = 1){
			this.startCutDown()
		}
	}
	/**
	 * 停止
	 */
	stop(){
		clearInterval(this.timer);
		this.status = 0;
	}
	
	/**
	 * 重新开始倒计时
	 */
	reStartCutDown(o, hour, min, seconds, p, timerSpeed){
		reSet(o, hour, min, seconds, p, timerSpeed);
		startCutDown()
	}
	
	/**
	 * 重新开始正常计时
	 */
	reStart(o, hour, min, seconds, p, timerSpeed){
		reSet(o, hour, min, seconds, p, timerSpeed);
		startTimer();
	}
	
	/**
	 * 开始倒计时
	 */
	startCutDown() {
		this.SS = 1;
		if(this.status==-10)
		this.status=0;
		if(this.status ==0 ){
			this.status = 1;
			let that =this;
			this.timer = setInterval(function(){
				that.p--;
				if(that.p<0){
					that.p=99;
					that.seconds--;
					if(that.seconds<0){
						that.seconds = 59;
						that.minutes--;
						if(that.minutes<0){
							that.minutes =0;
							that.hours--;
							if(that.hours<0)
								that.hours=0;
						}
					}
				}
				that.o.hours = that.hours;
				that.o['minutes'] = that.minutes;
				that.o['seconds'] = that.seconds;
				that.o['p'] = that.p;
				that.__stopTimer(2);
			},1)
		}	
	}
	__stopTimer(a) {
		
			if (this.TimerObj.hours == this.hours && this.TimerObj.minutes == this.minutes &&
			this.TimerObj.seconds == this.seconds && this.TimerObj.p == this.p) {
				clearInterval(this.timer);
				this.status = 0;
				console.log('重置成功');
			}		
	}
}

var storage = new Storage();
var sstorage = new seStorage();
