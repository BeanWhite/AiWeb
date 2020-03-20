const imgBase = 'D://AixlProject//AiWeb//'
const endName = '.png' //默认图片后缀名
let S = []; //接收医生发送过来的需要打印的量表id
let reportSize = [];
for (let i = 0; i < 30; i++)
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

let RESULT_DATA = {}
sstorage.getItem("RESULT_DATA"); //所有量表的结论信息，每一个属性为一个allResult数组,从本地获取


for (let i = 0; i < S.length; i++) {
	let o = sstorage.getItem('&' + i);
	if (o != null){
		RESULT_DATA[i] = o
		reportSize.push(S[i])
	}
		
}

const imgBaseURL = 'D:/AixlProject/AiWeb/'; //设置打印图片的基本目录

const patientID = 222; //获取病人账号信息，用于图片保存，目前为测试账号


console.log(RESULT_DATA, '从本地获取的结果信息，包括所画图片url')

console.log(msgObject, 'a')
console.log(obj, 'b')

$(document).ready(function() {
	//开始渲染数据,并将图片信息保存到服务器
	for (let i = 0; i < msgObject.length; i++) {
		try {
			if (userMsg == null) {
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
		msgObject[i].msg_b = userMsg[msgObject[i].name]; //渲染基础信息
	}
	
	
	/**
	 * 遍历所有待打印的报告，找到有图片的内容并保存到服务器
	 */
	let imgs={
		images:[]
	}
	for(let i=0;i<reportSize.length;i++){
		let a = vue[vue.config[reportSize[i]].properName];
		for(let j=0;j<a.serviceImg.length;j++){
			let o = {
				url:a.serviceImg[j].base64,	//图片base64编码
				name:a.serviceImg[j].title+'='+userMsg.aiUserId		//图片的文件名
			}
			a.serviceImg[j].proURL = o.name+'.png';
			imgs.images.push(o);
		}
		//console.log(a,'???????>>>>>>>>>>>>>')
	}
	console.log(imgs,'???????>>>>>>>>>>>>>')
	if(imgs.images.length>0)
		$.ajax({
			type: "POST",
			url: 'http://localhost:80/pdf/Img',
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(imgs),
			success: function(e) {
				console.log('图片保存成功')
			},
			error: function(e) {
				console.log(912)
			}
		})
})

function printPDF() {
	var k = document.documentElement.outerHTML;
	var pdf = 'test.pdf';
	$.ajax({
		type: "POST",
		url: config.url + '/pdf/p',
		data: {
			s: k,
			name: pdf
		},
		// processData: false, // 告诉jQuery不要去处理发送的数据
		// contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success: function(data) {
			console.log(data)
			if (data.object == true)
				window.open('../../js/pdf.js/web/viewer.html?../../pdfDocument/' + pdf, 'PDF');
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
		msgObject,
		office: obj['11'].office,
		date: obj['11'].date,
		adas: $.ajax({
			url: 'report_adas.html',
			async: false
		}).responseText,
		config: {
			"5": {
				title: "阿尔茨海默病评定量表",
				properName: "scale_5"
			},
			"11": {
				title: "画中测验",
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
			img: obj['5'].serviceImg,
		},
		scale_11: {
			msgObject, //基本信息,因为是一个人的一份或多份报告，一份信息就够了
			rTableObject: obj['11'].projects, //项目内容，报告结论，中文
			useTime: obj['11'].useTime, //花费时间
			allResult: obj['11'].allResult, //量表测量结果信息(总结论),二维数组存放，防止多个项目
			img: obj['11'].serviceImg, //服务器保存的图片信息，方便pdf打印图片，用户答题图片
			// [{
			// 	localURL:'',	//用于打印pdf时的本地url
			// 	proURL:'',		//在项目中url
			// 	title:''		//图片标题名称
			// }]


		},
		scale_12: {

			rTableObject: obj['12'].projects,
			useTime: obj['12'].useTime,
			allResult: obj['12'].allResult,
			img: obj['12'].serviceImg,


		},
		scale_13: {

			rTableObject: obj['13'].projects,
			useTime: obj['13'].useTime,
			allResult: obj['13'].allResult,
			img: obj['13'].serviceImg,


		},
		scale_14: {

			rTableObject: obj['14'].projects,
			useTime: obj['14'].useTime,
			allResult: obj['14'].allResult,
			img: obj['14'].serviceImg,


		},
		scale_15: {
			rTableObject: obj['15'].projects, //项目内容，报告结论，中文
			useTime: obj['15'].useTime, //花费时间
			allResult: obj['15'].allResult, //量表测量结果信息(总结论)
			img: obj['15'].serviceImg, //服务器保存的图片信息，方便pdf打印图片，用户答题图片


		},
		scale_18: {

			rTableObject: obj['18'].projects,
			useTime: obj['18'].useTime,
			allResult: obj['18'].allResult,
			img: obj['18'].serviceImg,


		},
		scale_19: {

			rTableObject: obj['19'].projects,
			useTime: obj['19'].useTime,
			allResult: obj['19'].allResult,
			img: obj['19'].serviceImg,


		},
		scale_20: {
			msgObject,
			rTableObject: obj['20'].projects,
			useTime: obj['20'].useTime,
			allResult: obj['20'].allResult,
			img: obj['20'].serviceImg
		},
		imgURL:config.imgPrintUrl,//打印图片地址
		img: {
			img_1: [imgBase + 'img//5//flower.jpg'],
			img_2: [imgBase + 'img//5//shuttlecock.jpg'],
		}
	},
	created() {
		for (let i in RESULT_DATA) {
			for (let j in RESULT_DATA[i]) {
				this[this.config[i].properName][j] = RESULT_DATA[i][j]
			}


		}

		console.log(this.scale_11)
	},
	computed: {
		getUserTime: function() {

			return '365天'
		},
		getClusion: function() {
			return '痴呆晚期'
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