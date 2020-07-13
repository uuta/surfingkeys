// an example to create a new mapping `ctrl-y`
mapkey('<Ctrl-y>', 'Show me the money', function() {
  Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
map('gt', 'T');

// an example to remove mapkey `Ctrl-i`
unmap('<Ctrl-i>');

// set theme
settings.theme = `
.sk_theme {
  font-family: Osaka, Input Sans Condensed, Charcoal, sans-serif;
  font-size: 10pt;
  background: #24272e;
  color: #abb2bf;
}
.sk_theme tbody {
  color: #fff;
}
.sk_theme input {
  color: #d0d0d0;
}
.sk_theme .url {
  color: #61afef;
}
.sk_theme .annotation {
  color: #56b6c2;
}
.sk_theme .omnibar_highlight {
  color: #528bff;
}
.sk_theme .omnibar_timestamp {
  color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
  color: #98c379;
}
.sk_theme #sk_omnibarSearchResult>ul>li:nth-child(odd) {
  background: #303030;
}
.sk_theme #sk_omnibarSearchResult>ul>li.focused {
  background: #3e4452;
}
#sk_status, #sk_find {
  font-size: 20pt;
}`;
// click `Save` button to make above settings to take effect.

// Remove mapkey
unmap('j');
unmap('k');
unmap('l');

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
map('@', 'l');

// Google jp 1年以内
addSearchAliasX('1', 'Google jp 1年以内', 'https://www.google.co.jp/search?q={0}&tbs=qdr:y,lr:lang_1ja&lr=lang_ja');
mapkey('o1', '#8Open Search with alias 1', function() {
Front.openOmnibar({type: "SearchEngine", extra: "1"});
});

settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i;

// weblio翻訳
mapkey('ow', '#8Open weblio with alias w', function() {
  Clipboard.read(function(response) {
      value = response.data;
      tabOpenLink('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' + value + '&tl=en&total=1&idx=0');
  });
});

// Get a title of the current page
mapkey('ct', '#Get a title with alias ct1', function() {
  var global = window;

  global.COPY_TO_CLIPBOARD = global.COPY_TO_CLIPBOARD || {}

  // URLの情報を取得する
  global.COPY_TO_CLIPBOARD.getUrlInfo = function () {
      var title = document.title;
      // 各フォーマット向けにエスケープしたい文字列を定義して置換
      var replacedStrings = {
          ':': '：',
          '\\[': '［',
          '\\]': '］',
          '\\|': '｜'
      };
      for (var key in replacedStrings) {
          title = title.replace(new RegExp(key, 'g'), replacedStrings[key]);
      }
      // 各サービスのLink形式のフォーマットにした文字列を返す
      return '[' + title + ' ' + document.URL + ']';
  };

  // 文字列を取得するFunctionの結果をクリップボードにコピーする
  global.COPY_TO_CLIPBOARD.copyToClipboard = function() {
      // Clipboardにコピーするやりかたを真似た
      var copyFrom = document.createElement("textarea");
      copyFrom.textContent = this.getUrlInfo();

      var bodyElm = document.getElementsByTagName("body")[0];
      bodyElm.appendChild(copyFrom);
      copyFrom.select();

      var retVal = document.execCommand('copy');
      bodyElm.removeChild(copyFrom);
      return retVal;
  };

  global.COPY_TO_CLIPBOARD.copyToClipboard();
});

// Move to next or previous page
settings.prevLinkRegex = /((<<|prev(ious)?|Prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next|Next)|>|›|»|→|次へ|次のページ+)/i;