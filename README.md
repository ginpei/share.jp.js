# share.jp.js

日本国内向けのシェアボタンを設置するJSライブラリーです。

jQueryプラグイン版は別途。

# 対象

* Facebookいいね！
* Facebookシェア
* Twitter
* はてなブックマーク
* LINE
* mixi

# 特徴

## らくちん

* 省略時、URLはページのものを、文章はmetaタグから取得
	* canocalがあればそっち優先
	* もちろん個別に設定できます

## かんたん

* タグ書いてJSファイル読み込んで終わりです
	* 細かい事やらないならね

## まとめて

* 一か所に複数のボタンを配置
* 文言は一度の設定で十分

## 日本国内用

* 日本でよく使われるSNSに対応

# 使い方

## ページの説明を用意

いつも書いてるやつです。

```html
<meta name="description" content="このページすごいよ！">
```

## 読み込む箇所にタグを書く

`data-share`属性の値に、設置したいボタンの種類を書きます。一覧は別項参照。

```html
<div class="gp-share" data-share="like twitter hatebu"></div>
```

## share.jp.jsを読み込む

読み込み以外にスクリプトの実行も特に不要です。

```html
<script src="share.jp.js"></script>
```

# 細かい使い方

## URL、文章を設定する

片方でも構いません。

```html
<div class="gp-share"
	data-share="like twitter hatebu"
	data-share-url="http://example.com/foo/bar?hoge#fuga"
	data-share-text="これはすごいコンテンツだよ！！！"
	></div>
```

この書き方の場合はひとつのページ内に、複数の種類のボタンを配置できます。

