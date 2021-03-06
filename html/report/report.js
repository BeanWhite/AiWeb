let USER_ID = sstorage.getItem('logins');
if (USER_ID == null || USER_ID == undefined)
	location.href = '../../index.html'
USER_ID = USER_ID.id
const imgBase = 'D://AixlProject//AiWeb//'
const endName = '.png' //默认图片后缀名
let S = []; //接收医生发送过来的需要打印的量表id
let reportSize = [];
for (let i = 0; i < 100; i++)
	S.push(i);
let userMsg = sstorage.getItem("userMsg"); //从本地缓存获取用户信息

if (userMsg == null) {
	console.log('没有用户信息');
}

let obj = $.ajax({
	url: '../../JSON/report.json', //获取所有报告主要内容
	async: false
}).responseJSON;
const msgObject = $.ajax({
	url: '../../JSON/report.json', //基本信息获取
	async: false
}).responseJSON.msg;

let RESULT_DATA = {};
let foreignData = {}; //外部测验报告数据
let Tong = []; //通用报告
sstorage.getItem("RESULT_DATA"); //所有量表的结论信息，每一个属性为一个allResult数组,从本地获取


try {
	/**
	 * 从历史记录打印
	 */
	let a = decodeURI(location.href).split('?')[1];
	if (!a) {
		throw new Error('no url explain')
	} else {
		/**
		 * @param {Object} e从服务器获取相应的报告记录ArrayList
		 */
		console.log('从服务器获取')
		/**
		 * 获取用户信息
		 */
		let n = JSON.parse(a)[0].aiUserId;
		$.ajax({
			url:config.url+'/users/msgForDoc/'+n,
			type:'GET',
			async:false,
			success:function(e){
				userMsg = e.object;
			}
		})
		$.ajax({
			url: config.url + '/report/contents/' + a,
			type: 'GET',
			async: false,
			success: function(e) {
				console.log(e, '后台数据');
				let arr = e.object;
				for (let i = 0; i < arr.length; i++) {
					try {
						JSON.parse(arr[i].reportContent)
					} catch (e) {
						console.log(e)
						continue
					}
					if (arr[i].aiScaleId == 5) {
						foreignData.adas = JSON.parse(arr[i].reportContent); //vue中的adas数据直接获取该值
					} else if (arr[i].aiScaleId == 2) {
						foreignData.mmse = JSON.parse(arr[i].reportContent);
					} else if (arr[i].aiScaleId >= 30) {
						Tong.push(JSON.parse(arr[i].reportContent));
					} else {
						RESULT_DATA[arr[i].aiScaleId] = JSON.parse(arr[i].reportContent)
					}
					/**
					 * 
					 */
					if (arr[i].aiScaleId >= 30) {
						if (reportSize.indexOf(30) < 0)
							reportSize.push(30);
					} else {
						reportSize.push(arr[i].aiScaleId)
					}
				}

			}
		})
	}
} catch (e) {
	console.log(e, '在线打印')
	/**
	 * 做完题是直接打印报告，从本地缓存中获取数据
	 * 
	 *	@warnning 秀版本为从本地缓存获取内容，新版本直接从服务器缓存中获取内容
	 */
	// for (let i = 0; i < S.length; i++) {
	// 	let o = sstorage.getItem('&' + i);
	// 	if (o != null) {
	// 		/**
	// 		 * 需要将本地缓存内容删掉防止下次打印报告数据错乱
	// 		 */
	// 		sstorage.removeItem('&' + i)
	// 		if (i == 5) {
	// 			foreignData.adas = o; //vue中的adas数据直接获取该值
	// 		} else if (i == 2) {
	// 			foreignData.mmse = o;
	// 			console.log(o, 'mmse')
	// 		} else if (i >= 30) {
	// 			Tong.push(o);
	// 		} else {
	// 			RESULT_DATA[i] = o
	// 		}


	// 		if (i >= 30) {
	// 			if (reportSize.indexOf(30) < 0)
	// 				reportSize.push(30);
	// 		} else {
	// 			reportSize.push(S[i])
	// 		}
	// 	}
	// }
	$.ajax({
		url: config.url + '/report/redis/' + USER_ID,
		async: false,
		type: 'GET',
		success: function(e) {
			let data = e.object;
			for (let i = 0; i < data.length; i++) {
				if (data[i].aiScaleId == 5) {
					foreignData.adas = JSON.parse(data[i].reportContent); //vue中的adas数据直接获取该值
					foreignData.adasMsg = data[i].msg;
				} else if (data[i].aiScaleId == 2) {
					foreignData.mmse = JSON.parse(data[i].reportContent);
					foreignData.mmseMsg = data[i].msg;
					console.log(JSON.parse(data[i].reportContent), 'mmse')
				} else if (data[i].aiScaleId >= 30) {
					Tong.push(JSON.parse(data[i].reportContent));
				} else {
					RESULT_DATA[data[i].aiScaleId] = JSON.parse(data[i].reportContent)
					RESULT_DATA[data[i].aiScaleId].msg = data[i].msg;
				}


				if (data[i].aiScaleId >= 30) {
					if (reportSize.indexOf(30) < 0)
						reportSize.push(30);
				} else {
					reportSize.push(data[i].aiScaleId)
				}
			}
			console.log(e, '在线打印报告内容')
		},
		error: function(e) {

		}
	})
	console.log(RESULT_DATA, '**********')

}


console.log(Tong, '通用')
//console.log(RESULT_DATA, '报告数据')
const imgBaseURL = 'D:/AixlProject/AiWeb/'; //设置打印图片的基本目录


//console.log(RESULT_DATA, '从本地获取的结果信息，包括所画图片url')

console.log(msgObject, 'a')
console.log(obj, 'b')

$(document).ready(function() {
	
	//开始渲染数据,并将图片信息保存到服务器
	for (let i = 0; i < msgObject.length; i++) {
		try {
			if (userMsg == null||userMsg == undefined) {
				console.log('没有用户信息');
				/**
				 * 使用测试数据
				 */
				userMsg = $.ajax({
					url: '../../JSON/userMsgTest.json',
					async: false
				}).responseJSON;
				console.log(userMsg, '测试用户数据')
			}
			userMsg[msgObject[i].name]
		} catch (e) {
			//TODO handle the exception
			console.log('读取用户信息出错出错', e);
			return
		}
		console.log('报错')
		msgObject[i].msg_b = userMsg[msgObject[i].name]; //渲染基础信息

	}
	/**
	 * 遍历所有待打印的报告，找到有图片的内容并保存到服务器
	 */
	let imgs = {
		images: []
	}
	for (let i = 0; i < reportSize.length; i++) {
		/**
		 * 跳过阿尔茨海默,mmse,通用
		 */
		if (reportSize[i] == 5 || reportSize[i] == 2 || reportSize[i] >= 30) {
			/**
			 * 处理mmse中图片
			 */
			if (reportSize[i] == 2) {
				let m = foreignData.mmse;
				for (let t = 0; t < m.item.length; t++) {
					if (m.item[t].img) {
						/**
						 * 将图片保存到服务器
						 */
						let o = {
							url: m.item[t].answer[0], //图片base64编码
							name: 'mmse' + userMsg.aiUserId //图片的文件名
						}
						imgs.images.push(o);
						$.ajax({
							type: "POST",
							url: config.url + '/pdf/Img',
							async: false,
							contentType: "application/json;charset=UTF-8",
							data: JSON.stringify(imgs),
							success: function(e) {
								console.log('图片保存成功')
							},
							error: function(e) {
								console.log(912)
							}
						})
					}
				}
			}
			continue
		}
		console.log('开始扫描图片')
		let a = vue[vue.config[reportSize[i]].properName];
		if (a.serviceImg) {
			console.log('有图片')
			for (let j = 0; j < a.serviceImg.length; j++) {
				let o = {
					url: a.serviceImg[j].base64, //图片base64编码
					name: a.serviceImg[j].title + '=' + userMsg.aiUserId //图片的文件名
				}
				a.serviceImg[j].proURL = o.name + '.png';
				imgs.images.push(o);
			}
		}

		console.log(a.serviceImg, '//////////////////////////////')
	}
	console.log(imgs, '???????>>>>>>>>>>>>>')
	if (imgs.images)
		if (imgs.images.length > 0)
			$.ajax({
				type: "POST",
				url: config.url + '/pdf/Img',
				async: false,
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(imgs),
				success: function(e) {
					console.log('图片保存成功')
				},
				error: function(e) {
					console.log(912)
				}
			})
	/**
	 * 页面渲染结束就执行打印
	 * 
	 */
	console.log(vue)
	setTimeout(() => {
		printPDF()
	})
})

function printPDF() {
	console.log('开始打印')
	var k = document.documentElement.outerHTML;
	var pdf = 'test' + '.pdf';
	$.ajax({
		type: "POST",
		url: config.url + '/pdf/p',
		async: true,
		data: {
			s: k,
			name: pdf
		},
		// processData: false, // 告诉jQuery不要去处理发送的数据
		// contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success: function(data) {
			console.log(data)
			if (data.object == true) {
				location.href = '../../js/pdf.js/web/viewer.html?../../pdfDocument/' + data.msg, 'PDF';
				//window.open('../../js/pdf.js/web/viewer.html?../../pdfDocument/' + data.msg, 'PDF');
			} else {
				window.close()
			}
		},
		error: function() {
			console.log(555)
		}
	})


};

function isArray(arr) {
	if (Object.prototype.toString.call(arr) == '[object Array]')
		return true
	else
		return false
}

function getImg64_src(src) {
	//var img = document.getElementById(id);
	let img = document.createElement('img');
	img.src = src;
	img.onload = function() {
		let canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, img.width, img.height);
		let dataURL = canvas.toDataURL("image/webp", 0.1);
		//vue.img[name] = dataURL;
		//console.log(dataURL)
		return
	}
};

/**
 * 页脚部分
 */
const divF = new Vue({
	el: '#divFooter',
	data: {
		office: "科室", //科室
		date: "完成日期", //完成日期
	}
});

/**
 * 正文部分
 */
let vue = new Vue({
	el: '.vue',
	data: {
		reportSize: reportSize,
		msgObject: msgObject,
		office: obj['11'].office,
		date: obj['11'].date,
		config: {
			"5": {
				title: "阿尔茨海默病评定量表",
				properName: "scale_5"
			},
			"11": {
				title: "画钟测验",
				properName: "scale_11"
			},
			"12": {
				title: "Rey听觉词语学习测验",
				properName: "scale_12"
			},
			"13": {
				title: "数字广度测验",
				properName: "scale_13"
			},
			"14": {
				title: "符号数字转换测验",
				properName: "scale_14"
			},
			"15": {
				title: "Stroop色词测验",
				properName: "scale_15"
			},
			"18": {
				title: "Boston命名",
				properName: "scale_18"
			},
			"19": {
				title: "词语流畅性测验",
				properName: "scale_19"
			},
			"20": {
				title: "连线测验",
				properName: "scale_20"
			}
		},
		scale_5: {
			rTableObject: obj['5'].projects,
			useTime: obj['5'].useTime,
			allResult: obj['5'].allResult,
			serviceImg: obj['5'].serviceImg,
			msg: null
		},
		scale_11: {
			userMsg, //基本信息,在查询页面批量打印的时候可能出现多个信息，一般只用于查询打印报告用
			rTableObject: obj['11'].projects, //项目内容，报告结论，中文
			useTime: obj['11'].useTime, //花费时间
			allResult: obj['11'].allResult, //量表测量结果信息(总结论),二维数组存放，防止多个项目
			serviceImg: obj['11'].serviceImg, //服务器保存的图片信息，方便pdf打印图片，用户答题图片
			msg: null


		},
		scale_12: {

			rTableObject: obj['12'].projects,
			useTime: obj['12'].useTime,
			allResult: obj['12'].allResult,
			serviceImg: obj['12'].serviceImg,
			bottomMsg: obj['12'].bottomMsg,
			msg: null

		},
		scale_13: {

			rTableObject: obj['13'].projects,
			useTime: obj['13'].useTime,
			allResult: obj['13'].allResult,
			serviceImg: obj['13'].serviceImg,
			msg: null

		},
		scale_14: {

			rTableObject: obj['14'].projects,
			useTime: obj['14'].useTime,
			allResult: obj['14'].allResult,
			serviceImg: obj['14'].serviceImg,
			answer: obj['14'].answer,
			// answer:[
			// 	[
			// 		[1,2,3,4,5,6],
			// 		[1,2,3,4,5,6],
			// 		[1,2,3,4,5,6]
			// 	]
			// ],
			msg: null

		},
		scale_15: {
			rTableObject: obj['15'].projects, //项目内容，报告结论，中文
			useTime: obj['15'].useTime, //花费时间
			allResult: obj['15'].allResult, //量表测量结果信息(总结论)
			serviceImg: obj['15'].serviceImg, //服务器保存的图片信息，方便pdf打印图片，用户答题图片
			msg: null

		},
		scale_18: {

			rTableObject: obj['18'].projects,
			useTime: obj['18'].useTime,
			allResult: obj['18'].allResult,
			serviceImg: obj['18'].serviceImg,
			msg: null

		},
		scale_19: {

			rTableObject: obj['19'].projects,
			useTime: obj['19'].useTime,
			allResult: obj['19'].allResult,
			serviceImg: obj['19'].serviceImg,
			msg: null

		},
		scale_20: {
			//msgObject,
			rTableObject: obj['20'].projects,
			useTime: obj['20'].useTime,
			allResult: obj['20'].allResult,
			serviceImg: obj['20'].serviceImg,
			msg: null
		},
		imgURL: config.imgPrintUrl, //打印图片地址
		img: {
			img_1: [imgBase + 'img//5//flower.jpg'],
			img_2: [imgBase + 'img//5//shuttlecock.jpg'],
		},
		/**
		 * 阿尔茨海默
		 */
		adas: {
			adas: foreignData.adas,
			msg: foreignData.msg
		},
		/**
		 * mmse
		 */
		mmse: {
			mmse: foreignData.mmse,
			msg: foreignData.msg
		},
		/**
		 * 通用
		 */
		test: {
			status: 1,
			test: Tong,
		},

	},
	created() {
		for (let i in RESULT_DATA) {
			for (let j in RESULT_DATA[i]) {
				this[this.config[i].properName][j] = RESULT_DATA[i][j]
			}
			this[this.config[i].properName].msg = RESULT_DATA[i].msg
		}
		console.log(this.test, '通用', reportSize)
	},
	computed: {
		getUserTime: function() {

			return '365天'
		},
		getClusion: function() {
			return '下降'
		}
	},
	methods: {

	}
})


function getImg64_src(src) {
	//var img = document.getElementById(id);
	let img = document.createElement('img');
	img.src = src;
	console.log(img, '0000000')
	img.onload = function() {
		let canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, img.width, img.height);
		let dataURL = canvas.toDataURL('image/png');
		let o = {
			images: [{
				url: dataURL,
				name: 'ppp'
			}],
		}
		return
	}
};
