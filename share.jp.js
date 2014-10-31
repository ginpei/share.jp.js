(function() {
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

	// TODO
	share.like = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('LIKE'));
		elBlock.appendChild(elButton);
	}

	// TODO
	share.facebook = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('FACEBOOK'));
		elBlock.appendChild(elButton);
	}

	// TODO
	share.twitter = function(elBlock) {
		var elButton = document.createElement('DIV');
		elButton.appendChild(document.createTextNode('TWITTER'));
		elBlock.appendChild(elButton);
	}

	// TODO
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

	gp.share();
	document.addEventListener('DOMContentLoaded', gp.share);
})();
