function toJump(id) {
	switch (id) {
		case 1:
			break;
		case 2:
			window.close();
			window.location.href = '../html/doc_mmse.html?' + USER_ID
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			window.location.href = '../html/doc_ADAS.html?' + USER_ID;
			break;
		case 6:
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
		case 10:
			break;
		case 11:
			window.location.href = '../html/doc_drawClock.html?' + USER_ID;
			break;
		case 12:
			window.location.href = '../html/doc_ravlt.html?' + USER_ID;
			break;
		case 13:
			window.location.href = '../html/doc_DST.html?' + USER_ID;
			break;
		case 14:
			window.location.href = '../html/doc_sdmt.html?' + USER_ID;
			break;
		case 15:
			window.location.href = '../html/doc_cwt.html?' + USER_ID;
			break;
		case 16:
			window.location.href = '../html/doc_fom.html?' + USER_ID;
			break;
		case 17:
			window.location.href = '../html/doc_bd.html?' + USER_ID;
			break;
		case 18:
			break;
		case 19:
			window.location.href = '../html/doc_vft.html?' + USER_ID;
			break;
		case 20:
			window.location.href = '../html/doc_ligature.html?' + USER_ID;
			break;
		case 21:
			break;
		case 22:
			break;
		case 23:
			break;
		case 24:
			break;
		case 25:
			break;
		case 26:
			break;
		case 27:
			break;
		case 28:
			break;
		case 29:
			break;
		case 30:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+"蒙特利尔认知评估量表(MoCA)&30"
			break;
		case 31:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'临床疗效总评量表(CGI)&31'
			break;
		case 32:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'缺血指数量表(HIS)&32'
			break;
		case 33:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'日常生活能力量表(ADL)&33'
			break;
		case 34:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'神经精神科问卷(NPI)&34'
			break;
		case 35:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'汉密尔顿抑郁量表(HAMD)&35'
			break;
		case 36:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'老年抑郁量表(GDS)&36'
			break;
		case 37:
			window.close();
			window.location.href = '../html/doc_foreign.html?'+USER_ID+'&'+'汉密尔顿焦虑量表(HAMA)&37'
			break;
		default:
			console.log('错误指向')
			break;
	}
}
