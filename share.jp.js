(function(document) {
	var elBody = document.body;
	var gp = window.gp = window.gp || {};

	// API
	var share = gp.share = function() {
		// 対象要素を検索（設定済みのものは除く）
		var nodes = document.querySelectorAll('.gp-share:not(.gp-share-done)');
		for (var i=0, l=nodes.length; i<l; i++) {
			var elBlock = nodes[i];

			// 設定済みを記憶
			elBlock.className += ' gp-share-done';

			// 各ボタンを追加
			var types = (elBlock.getAttribute('data-share')||'').split(' ');
			for (var j=0, m=types.length; j<m; j++) {

				// ボタン追加処理があれば追加
				var generator = share[types[j]];
				if (generator) {
					generator(elBlock);
				}
			}
		}
	}

	// Facebook共通の初期処理
	share._initFacebook = function() {
		if (!share._fbLoaded) {
			appendHtml('<div id="fb-root"></div>');
			var elFbScript = document.createElement('SCRIPT');
			elFbScript.text =
				'(function(d, s, id) {\n' +
				'	var js, fjs = d.getElementsByTagName(s)[0];\n' +
				'	if (d.getElementById(id)) return;\n' +
				'	js = d.createElement(s); js.id = id;\n' +
				'	js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&appId=1513442402227370&version=v2.0";\n' +
				'	fjs.parentNode.insertBefore(js, fjs);\n' +
				'}(document, "script", "facebook-jssdk"));'
				;
			elBody.appendChild(elFbScript);
			share._fbLoaded = true;
		}
	};

	// Twitter共通の初期処理
	share._initTwitter = function() {
		if (!share._twitterLoaded) {
			var elFbScript = document.createElement('SCRIPT');
			elFbScript.text = "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');";
			elBody.appendChild(elFbScript);
			share._twitterLoaded = true;
		}
	};

	// いいね！ボタン
	// https://developers.facebook.com/docs/plugins/like-button
	share.like = function(elBlock) {
		share._initFacebook();
		appendHtml('<div class="fb-like" data-href="https://example.com" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>', elBlock);
	}

	// Facebook
	// https://developers.facebook.com/docs/plugins/share-button
	share.facebook = function(elBlock) {
		share._initFacebook();
		appendHtml('<div class="fb-share-button" data-href="https://example.com" data-layout="button"></div>', elBlock);
	}

	// Twitter
	// https://about.twitter.com/ja/resources/buttons
	share.twitter = function(elBlock) {
		share._initTwitter();
		appendHtml('<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://example.com" data-text="TEXT-TEXT" data-hashtags="hashtag">Tweet</a>', elBlock);
	}

	// はてブ
	share.hatebu = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('HATEBU'));
		elBlock.appendChild(elButton);
	}

	// TODO
	share.line = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('LINE'));
		elBlock.appendChild(elButton);
	}

	// TODO
	share.mixi = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('MIXI'));
		elBlock.appendChild(elButton);
	}

	// Util
	var elDummy = document.createElement('DIV');
	function html(source) {
		elDummy.innerHTML = source;
		var elResult = elDummy.firstChild;
		elDummy.innerHTML = '';
		return elResult
	}
	function appendHtml(source, elParent) {
		var el = html(source);
		(elParent || elBody).appendChild(el);
	}

	// Start
	gp.share();
	document.addEventListener('DOMContentLoaded', gp.share);
})(document);
