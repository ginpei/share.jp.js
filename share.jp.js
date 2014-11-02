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
			var elScript = document.createElement('SCRIPT');
			elScript.text =
				'(function(d, s, id) {\n' +
				'	var js, fjs = d.getElementsByTagName(s)[0];\n' +
				'	if (d.getElementById(id)) return;\n' +
				'	js = d.createElement(s); js.id = id;\n' +
				'	js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&appId=1513442402227370&version=v2.0";\n' +
				'	fjs.parentNode.insertBefore(js, fjs);\n' +
				'}(document, "script", "facebook-jssdk"));'
				;
			elBody.appendChild(elScript);
			share._fbLoaded = true;
		}
	};

	// Twitter共通の初期処理
	share._initTwitter = function() {
		if (!share._twitterLoaded) {
			var elScript = document.createElement('SCRIPT');
			elScript.text = "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');";
			elBody.appendChild(elScript);
			share._twitterLoaded = true;
		}
	};

	// はてブ共通の初期処理
	share._initHatebu = function() {
		if (!share._hatebuLoaded) {
			var elScript = document.createElement('SCRIPT');
			elScript.src = 'http://b.st-hatena.com/js/bookmark_button.js';
			elBody.appendChild(elScript);
			share._hatebuLoaded = true;
		}
	};

	// LINE共通の初期処理
	share._initLine = function() {
		if (!share._lineLoaded) {
			var elScript = document.createElement('SCRIPT');
			elScript.src = '//media.line.me/js/line-button.js?v=20140411';
			elBody.appendChild(elScript);
			share._lineLoaded = true;
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
	// http://b.hatena.ne.jp/guide/bbutton
	share.hatebu = function(elBlock) {
		share._initHatebu();
		appendHtml('<a href="http://b.hatena.ne.jp/entry/http://example.com" class="hatena-bookmark-button" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a>', elBlock);
	}

	// LINE
	// https://media.line.me/howto/ja/
	share.line = function(elBlock) {
		share._initLine();
		var elButton = document.createElement('DIV');
		elBlock.appendChild(elButton);

		// スクリプト読み込み完了まで待機
		(function() {
			if (window.media_line_me) {
				var elScript = document.createElement('SCRIPT');
				elScript.text = 'new media_line_me.LineButton({"pc":false,"lang":"ja","type":"a","text":"てきてきてきすと","withUrl":true});';
				elButton.appendChild(elScript);
			}
			else {
				setTimeout(arguments.callee, 1000);
			}
		})();
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
