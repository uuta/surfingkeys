// an example to create a new mapping `ctrl-y`
api.mapkey('<Ctrl-y>', 'Show me the money', function() {
  Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
api.map('gt', 'T');

// an example to remove mapkey `Ctrl-i`
api.unmap('<Ctrl-i>');

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
api.unmap('j');
api.unmap('k');
api.unmap('l');

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
api.map('@', 'l');

// Google jp 1年以内
api.addSearchAlias('1', 'Google jp 1年以内', 'https://www.google.co.jp/search?q={0}&tbs=qdr:y,lr:lang_1ja&lr=lang_ja');
api.mapkey('o1', '#8Open Search with alias 1', function() {
  Front.openOmnibar({type: "SearchEngine", extra: "1"});
});

settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i;

// weblio翻訳
api.mapkey('ow', '#8Open weblio with alias w', function() {
  Clipboard.read(function(response) {
      value = response.data;
      tabOpenLink('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' + value + '&tl=en&total=1&idx=0');
  });
});

const copyTitleAndUrl = (format) => {
  const text = format
    .replace('%URL%', location.href)
    .replace('%TITLE%', document.title)
  Clipboard.write(text)
}
const copyHtmlLink = () => {
  const clipNode = document.createElement('a')
  const range = document.createRange()
  const sel = window.getSelection()
  clipNode.setAttribute('href', location.href)
  clipNode.innerText = document.title
  document.body.appendChild(clipNode)
  range.selectNode(clipNode)
  sel.removeAllRanges()
  sel.addRange(range)
  document.execCommand('copy', false, null)
  document.body.removeChild(clipNode)
  Front.showBanner('Ritch Copied: ' + document.title)
}

api.mapkey('cm', '#7Copy title and link to markdown', () => {
  copyTitleAndUrl('[%TITLE%](%URL%)')
})
api.mapkey('cb', '#7Copy title and link to scrapbox', () => {
  copyTitleAndUrl('[%TITLE% %URL%]')
})
api.mapkey('ca', '#7Copy title and link to href', () => {
  copyTitleAndUrl('<a href="%URL%">%TITLE%</a>')
})
api.mapkey('cr', '#7Copy rich text link', () => {
  copyHtmlLink()
})

// Move to next or previous page
settings.prevLinkRegex = /((<<|prev(ious)?|Prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next|Next)|>|›|»|→|次へ|次のページ+)/i;

// Disable keys in specific URL
api.unmapAllExcept(['v','f'], /netflix.com/);
