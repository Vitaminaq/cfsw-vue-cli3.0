var _hmt = _hmt || [];
!(function() {
	var a = document.createElement('script');
	a.src = '//hm.baidu.com/hm.js?6fcd62ad8d4fa46fe6c001c4876b8e3d';
	var b = document.getElementsByTagName('script')[0];
	b.parentNode.insertBefore(a, b);
})();
var _sdk_url = '//cdn.followme.com/analytics/sensors-1.11.6/sensorsdata.min.js',
	_heatmap_url = '//cdn.followme.com/analytics/sensors-1.11.6/heatmap.min.js';
!(function(a) {
	var b = a.sdk_url,
		c = a.name,
		d = window,
		e = document,
		f = 'script',
		g = null,
		h = null;
	(d.sensorsDataAnalytic201505 = c),
		(d[c] =
			d[c] ||
			function(a) {
				return function() {
					(d[c]._q = d[c]._q || []).push([a, arguments]);
				};
			});
	for (
		var i = [
				'track',
				'quick',
				'register',
				'registerPage',
				'registerOnce',
				'trackSignup',
				'trackAbtest',
				'setProfile',
				'setOnceProfile',
				'appendProfile',
				'incrementProfile',
				'deleteProfile',
				'unsetProfile',
				'identify',
				'login',
				'logout',
				'trackLink',
				'clearAllRegister',
				'getAppStatus'
			],
			j = 0;
		j < i.length;
		j++
	)
		d[c][i[j]] = d[c].call(null, i[j]);
	d[c]._t ||
		((g = e.createElement(f)),
		(h = e.getElementsByTagName(f)[0]),
		(g.async = 1),
		(g.src = b),
		g.setAttribute('charset', 'UTF-8'),
		h.parentNode.insertBefore(g, h),
		(d[c].para = a));
})({
	sdk_url: _sdk_url,
	heatmap_url: _heatmap_url,
	name: 'sa',
	web_url: 'https://analytics.followme.com/?project=followme',
	server_url: 'https://analytics.followme.com/sa?project=followme',
	heatmap: {},
	show_log: !1,
	source_channel: ['pid', 'vcode', 'from', 'act_name', 'act_source']
}),
	sa.quick('autoTrack'),
	(window.FMAnalytics = (function() {
		return {
			login: function(a) {
				if (a && !isNaN(a)) {
					a = Number(a);
					var b = new Date().getTime();
					try {
						window.sa &&
							(window.sa.login(a),
							window.sa.track('weblogin', {
								userId: a,
								loginTime: b
							}));
					} catch (c) {
						setTimeout(function() {
							window.sa &&
								(window.sa.login(a),
								window.sa.track('weblogin', {
									userId: a,
									loginTime: b
								}));
						}, 3e3);
					}
					try {
						_hmt.push([
							'_trackEvent',
							'login',
							'login',
							'login',
							a + ''
						]);
					} catch (c) {
						setTimeout(function() {
							_hmt.push([
								'_trackEvent',
								'login',
								'login',
								'login',
								a + ''
							]);
						}, 3e3);
					}
				}
			},
			register: function(a) {
				var b = a.userId;
				if (b && !isNaN(b)) {
					b = Number(b);
					var c = new Date().getTime(),
						d = {
							userId: b,
							channel: a.channel || 'fm',
							type: a.type || 'mobile',
							mobile: a.mobile || '',
							email: a.email || '',
							platform: a.platform || 'pc.web',
							registerTime: c,
							vcode: a.vcode || window.localStorage.vcode,
							href: a.href || window.location.href,
							Nickname: a.nickname || ''
						};
					try {
						window.sa &&
							(window.sa.login(b),
							window.sa.track('webregister', d),
							a.nickname &&
								sa.setProfile({ Nickname: a.nickname }));
					} catch (e) {
						setTimeout(function() {
							window.sa.login(b),
								window.sa.track('webregister', d);
						}, 3e3);
					}
					JSON.stringify(d);
					try {
						_hmt.push(['_trackEvent', 'reg', 'reg', d.userId]);
					} catch (e) {
						setTimeout(function() {
							_hmt.push(['_trackEvent', 'reg', 'reg', d.userId]);
						}, 3e3);
					}
				}
			},
			share: function(a) {
				var b = this.formatDate(new Date());
				try {
					window.sa &&
						window.sa.track('share', {
							channel: a,
							pathname:
								window.location.origin +
								window.location.pathname,
							href: window.location.href,
							track_time: b
						});
				} catch (c) {
					setTimeout(function() {
						window.sa &&
							window.sa.track('share', {
								channel: a,
								pathname:
									window.location.origin +
									window.location.pathname,
								href: window.location.href,
								track_time: b
							});
					}, 3e3);
				}
			},
			track: function(a, b) {
				if (a) {
					var c = this.formatDate(new Date());
					try {
						window.sa &&
							window.sa.track('web_blur_account', {
								mobile: a,
								pathname:
									window.location.origin +
									window.location.pathname,
								href: window.location.href,
								track_time: c,
								code_type: b || 'blur'
							});
					} catch (d) {
						setTimeout(function() {
							window.sa &&
								window.sa.track('web_blur_account', {
									mobile: a,
									pathname:
										window.location.origin +
										window.location.pathname,
									href: window.location.href,
									track_time: c,
									code_type: b || 'blur'
								});
						}, 3e3);
					}
				}
			},
			formatDate: function(a) {
				var b = a.getFullYear() + '-';
				return (
					(b =
						a.getMonth() < 10
							? b + '0' + a.getMonth()
							: b + '' + a.getMonth()),
					(b += '-'),
					(b =
						a.getDate() < 10
							? b + '0' + a.getDate()
							: b + '' + a.getDate()),
					(b += ' '),
					(b =
						a.getHours() < 10
							? b + '0' + a.getHours()
							: b + '' + a.getHours()),
					(b += ':'),
					(b =
						a.getMinutes() < 10
							? b + '0' + a.getMinutes()
							: b + '' + a.getMinutes()),
					(b += ':'),
					(b =
						a.getSeconds() < 10
							? b + '0' + a.getSeconds()
							: b + '' + a.getSeconds())
				);
			}
		};
	})()),
	(function() {
		var a = document.createElement('script'),
			b = window.location.protocol.split(':')[0];
		'https' === b
			? (a.src = 'https://zz.bdstatic.com/linksubmit/push.js')
			: (a.src = 'http://push.zhanzhang.baidu.com/push.js');
		var c = document.getElementsByTagName('script')[0];
		c.parentNode.insertBefore(a, c);
	})(),
	(function() {
		function a(a) {
			if (!a || a.indexOf('?') < 0) return {};
			var b = a
				.substring(a.indexOf('?') + 1)
				.split('&')
				.map(function(a) {
					return a.split('=');
				})
				.reduce(function(a, b) {
					return (a[b[0]] = b[1] || ''), a;
				}, {});
			return b;
		}
		var b = document.referrer;
		if (
			!(
				!b ||
				(b && b.indexOf('.baidu.com') == -1) ||
				(b && b.indexOf('eqid=') == -1)
			)
		)
			try {
				var c = a(document.referrer);
				if (c.eqid) {
					var d = new XMLHttpRequest();
					(d.withCredentials = !0),
						d.overrideMimeType('application/json'),
						d.open(
							'GET',
							'//bdstatistic.followme.com/bdkw?eqid=' +
								c.eqid +
								'&ref=' +
								encodeURIComponent(document.referrer),
							!0
						),
						(d.onload = function() {
							var a = JSON.parse(d.responseText);
							a.wd &&
								window.sa &&
								window.sa.track('baidu_keyword', {
									keyword: a.wd
								});
						}),
						d.send(null);
				}
			} catch (e) {
				console.log('百度关键词解析失败');
			}
	})(),
	console.log(
		'万水千山总是情 \n我就问你行不行？\n如果行就给我们你的简历\n我们的邮箱是\n%cfrontend@followme-inc.com\n%c另外我们还需要node,golang,.net人才',
		'color:red;font-size:20px;',
		'color:black'
	),
	(function() {
		var a = document.createElement('script'),
			b = window.location.protocol.split(':')[0];
		'https' === b
			? (a.src =
					'https://www.googletagmanager.com/gtag/js?id=UA-81113615-1')
			: (a.src =
					'http://www.googletagmanager.com/gtag/js?id=UA-81113615-1'),
			a.setAttribute('async', 'async');
		var c = document.getElementsByTagName('script')[0];
		c.parentNode.insertBefore(a, c),
			(a.onload = a.onreadystatechange = function() {
				function a() {
					dataLayer.push(arguments);
				}
				try {
					console.log('ga init'),
						(window.dataLayer = window.dataLayer || []),
						a('js', new Date()),
						a('config', 'UA-81113615-1');
				} catch (b) {
					console.log('ga error');
				}
			});
	})();
