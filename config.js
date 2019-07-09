window.FM_THIRD_PLATFORM = 'https://devwww.followme.com';
window.FM_CDN = 'https://devcdn.followme.com';
window.FM_API = 'https://devwww.followme.cn';
window.FM_BASE = 'https://devwww.followme.cn';
window.FM_TRADE = 'https://devtrade.followme.com';
window.FM_AUTH = 'https://devauth.followme.cn';
window.FM_KAIHU = 'https://devcreate.followme.com';
window.FM_MOBILE = 'https://devm.followme.com';
window.FM_SPECIAL = 'https://special.followme.com';
window.FM_LIVE = 'https://devwww.followme.cn/live';
window.FM_PUSH = 'https://devpush.followme.com/social';
window.FM_UPLOAD = 'https://devwww.followme.cn';
/**==== */
// window.FM_BASE = 'https://alibetawww.followme-internal.com';
//   window.FM_API = 'https://alibetawww.followme-internal.com';
//     window.FM_AUTH = 'https://alibetaauth.followme-internal.com';
//       window.FM_TRADE = 'https://alibetatrade.followme-internal.com';
//         window.FM_CDN = 'https://alibetacdn.followme-internal.com';
//           window.FM_KAIHU = 'http://alibetakaihu.followme-internal.com';
//             window.FM_MOBILE = 'https://alibetam.followme-internal.com';
//               window.FM_SPECIAL = 'https://alibetaspecial.followme-internal.com';
//                 window.FM_LIVE = 'https://alibetalive.followme-internal.com';
window.LANG = 'zh-CN';
window.LANG_LIST = [
	{
		name: '简体中文',
		domain: 'devwww.followme.cn',
		lang: 'zh-CN',
		isActive: true
	},
	{ name: 'English', domain: 'devwww.followme.com', lang: 'en-US' },
	{ name: '繁體中文', domain: 'devwww.followme.tw', lang: 'zh-TW' }
];
window.APPID = { weibo: 3478303175, facebook: false, twitter: false };
(function() {
	try {
		var img = document.createElement('script');
		img.setAttribute(
			'src',
			'/dzt.html?targets=https://devwww.followme.com/dzt-ok.html&login=1'
		);
		// img.setAttribute('src', '/dzt.html?targets=https://alibetawww.followme.com/dzt-ok.html');
		// img.setAttribute('src', 'https://alibetawww.followme.com/dzt.html?targets=/dzt-ok.html');
		// img.setAttribute('style', 'display:none;');
		document.head.appendChild(img);
	} catch (e) {
		console.log('set dzt.html');
	}

	var lanauge = function() {
		// 这个数组中的url不弹窗
		var blackPath = [
			'/live',
			'/baike',
			'/ask',
			'/jyds',
			'/trading-contest',
			'/trading-strategy/invest',
			'trade.followme.com',
			'create.followme.com'
		];
		var getLocationLang = function() {
			var h = location.host;
			var suffix = h.substr(h.lastIndexOf('.'));
			switch (suffix) {
				case '.com':
					return 'en-US';
				case '.tw':
					return 'zh-TW';
				case '.cn':
					return 'zh-CN';
				default:
					return '';
			}
		};

		var boxText = {
			'zh-CN': {
				suffix: '.cn',
				title: '跳转到简体中文版',
				main: '需要切换到<span class="red">简体中文版</span>吗？',
				confirm: '确定',
				cancel: '取消',
				domain: 'www.followme.cn'
			},
			'zh-TW': {
				suffix: '.tw',
				title: '跳轉到繁體中文版',
				main: '需要切換到<span class="red">繁體中文版</span>嗎？',
				confirm: '確定',
				cancel: '取消',
				domain: 'www.followme.tw'
			},
			'zh-HK': {
				suffix: '.cn',
				title: '跳轉到繁體中文版',
				main: '需要切換到<span class="red">繁體中文版</span>嗎？',
				confirm: '確定',
				cancel: '取消',
				domain: 'www.followme.tw'
			},
			'en-US': {
				suffix: '.com',
				title: 'You can use the English version.',
				main:
					'Need to switch to <span class="red">English version</span>?',
				confirm: 'Yes',
				cancel: 'No',
				domain: 'www.followme.com'
			}
		};

		// 浏览器语言
		var sysLang = navigator.language || navigator.userLanguage;
		// 用户输入的域名对应的语言
		var domainLang = getLocationLang();
		if (!domainLang || !sysLang) return;
		var currentText = boxText[sysLang];
		if (!currentText) return;
		if (domainLang == sysLang) return;

		console.log(
			'language-> domainLang:',
			domainLang,
			' ->sysLang:',
			sysLang
		);
		var key = domainLang + '_' + sysLang;
		var ls = sessionStorage.getItem(key);
		if (ls + '' == 'false') {
			// 同一个会话下关闭就不在展示
			return;
			// 关闭自动跳转逻辑
			// return jump();
		}

		// 判斷是否需要彈框
		for (var i = 0; i < blackPath.length; i++) {
			var p = blackPath[i];
			if (location.href.indexOf(p) !== -1) {
				console.log('language->符合黑名单');
				return;
			}
		}

		var jump = function() {
			var h = location.host;
			var suffix = h.substr(h.lastIndexOf('.'));
			var u =
				location.protocol +
				'//' +
				location.host.replace(suffix, currentText.suffix); // + location.pathname + location.search;
			var img = document.createElement('img');
			img.onload = function(e) {
				location.href = u;
			};
			img.onerror = function(e) {
				console.log('error:', e);
				location.href = u;
			};
			console.log('img init');
			img.src = '/dzt.html?targets=' + u + '/dzt-ok.html';
		};

		var html =
			'@keyframes myfirst{0%{right:-450px}100%{right:20px}}@media(max-width:480px){@keyframes myfirst{0%{bottom:-180px}100%{bottom:0}}}@media(max-width:480px){.language_warp{right:0!important;left:0!important;bottom:0!important;width:100%!important;height:160px}}.language_warp{position:fixed;right:20px;top:80px;width:430px;height:160px;background:#fff;border-radius:5px;box-shadow:0 0 16px 0 rgba(0,0,0,0.15);animation:myfirst 1s;z-index:99999!important}.language_title{width:100%;height:50px;border:0;border-bottom:1px #e9e9e9 solid;color:rgba(118,118,118,1);font-size:24px;font-family:Followme-iconfont;font-weight:normal}.language_title span{display:inline-block;height:50px;line-height:50px;float:left;padding-left:20px;font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(17,17,17,1)}.language_title a{display:inline-block;width:36px;height:36px;line-height:36px;text-align:center;margin-top:5px;float:right;margin-right:14px;padding:0;cursor:pointer}.language_title a:hover{background-color:#f5f5f5;border-radius:50%}.language_title a span{font-size:24px;width:25px;height:25px;line-height:25px;margin-top:6px;margin-left:6px;padding:0;color:#767676}.language_content{width:100%;height:40px;border:0;padding-left:20px;padding-top:15px;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(102,102,102,1)}.language_content *{vertical-align:middle}.language_content span.icon{background-color:#999;color:#fff;border-radius:50%;font-size:18px;margin-right:4px;background-image:none!important}.language_content span.red{vertical-align:baseline;color:#ff6200}.language_action{width:100%;height:auto;border:0;color:#e6e6e6;padding-top:0}.language_action .button{width:60px;height:30px;background-color:#ff6200;color:#fff;border-radius:15px;margin-left:10px;float:right;text-align:center;border:0;outline:0;cursor:pointer;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;text-decoration:none}.language_action .button.cancel{background-color:#fff;color:#333;line-height:30px}.language_action .button.cancel:hover{color:#ff6200}.language_action .button.done{margin-right:20px;line-height:30px}.language_action .button.done:hover{background-color:#f05102}@media(max-width:480px){.language_warp{right:0!important;left:0!important;bottom:0!important;width:100%!important;height:160px;border-radius:0;top:auto}}';
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = html;
		document
			.getElementsByTagName('HEAD')
			.item(0)
			.appendChild(style);
		var div = document.createElement('div');
		div.innerHTML =
			'<div class="language_title"><span>' +
			currentText.title +
			'</span><a id="language_close"><span class="icon-close_24px"></span></a></div><div class="language_content"><span class="icon icon-swap_24px"></span><label>' +
			currentText.main +
			'</label></div><div class="language_action"><a href="javascript:void(0);" class="button done" id="language_done">' +
			currentText.confirm +
			'</a><a href="javascript:void(0);" class="button cancel" id="language_cancel">' +
			currentText.cancel +
			'</a></div>';
		div.setAttribute('id', 'language_warp');
		div.setAttribute('class', 'language_warp');
		document.body.appendChild(div);

		var languageClose = document.getElementById('language_close');
		var languageDone = document.getElementById('language_done');
		var languageCancel = document.getElementById('language_cancel');
		var close = function(type) {
			return function() {
				console.log('>>type:', type);
				var language = document.getElementById('language_warp');
				language.style.display = 'none';
				if (type == 'done') {
					sessionStorage.setItem(key, true);
					jump();
				} else {
					sessionStorage.setItem(key, false);
				}
			};
		};

		languageClose.addEventListener('click', close('hide'), false);
		languageCancel.addEventListener('click', close('hide'), false);
		languageDone.addEventListener('click', close('done'), false);
	};

	document.addEventListener('DOMContentLoaded', lanauge, false);

	document.addEventListener(
		'DOMContentLoaded',
		function() {
			try {
				var _c = window.document.cookie;
				if (
					_c &&
					_c.indexOf('fmfinger') !== -1 &&
					_c.indexOf('fmfinger=;') === -1
				) {
					// cookie里面有fmfinger，并且fmfinger的值不是‘’, 不需要继续
					return;
				}
				const finger = document.createElement('script');
				finger.setAttribute(
					'src',
					'//cdn.followme.com/common/fingerprint2-1.8.0.min.js'
				);
				document.body.appendChild(finger);
				finger.onload = function() {
					const fin = window.Fingerprint2();
					fin.get(function() {
						const f = arguments[0];
						console.log(f);
						if (typeof window == 'undefined') return;
						const d = new Date();
						d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 9999);
						let cookie =
							'fmfinger=' +
							f +
							';path=/;expires=' +
							d.toGMTString();
						const domain = window.location.host;
						if (domain)
							cookie +=
								';domain=' + domain.match(/[^.]+?\.[^.]+?$/);
						window.document.cookie = cookie;
					});
				};
			} catch (e) {
				console.log(e);
			}
		},
		false
	);
})();
