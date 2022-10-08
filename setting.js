const {
  aceVimMap,
  mapkey,
  imap,
  imapkey,
  getClickableElements,
  vmapkey,
  map,
  unmap,
  vunmap,
  cmap,
  addSearchAlias,
  removeSearchAlias,
  tabOpenLink,
  readText,
  Clipboard,
  Front,
  Hints,
  Visual,
  RUNTIME,
} = api;

// an example to create a new mapping `ctrl-y`
api.mapkey("<Ctrl-y>", "Show me the money", function () {
  Front.showPopup(
    "a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close)."
  );
});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
api.map("gt", "T");

// an example to remove mapkey `Ctrl-i`
api.unmap("<Ctrl-i>");

// set theme
settings.theme = `
.sk_theme {
  font-family: Earth Orbiter, Osaka, Input Sans Condensed, Charcoal, sans-serif;
  font-size: 10pt;
  background: #002B36;
  color: #93A1A1;
}
.sk_theme input {
  color: #93A1A1;
}
.sk_theme .url {
  color: #268BD2;
}
.sk_theme .annotation {
  color: #93A1A1;
}
.sk_theme kbd {
  background: #EEE8D5;
  color: #111;
}
.sk_theme .omnibar_highlight {
  color: #CB4B16;
}
.sk_theme .omnibar_folder {
  color: #2AA198;
}
.sk_theme .omnibar_timestamp {
  color: #657B83;
}
.sk_theme .omnibar_visitcount {
  color: #B58900;
}
.sk_theme .prompt, .sk_theme .resultPage {
  color: #93A1A1;
}
.sk_theme .feature_name {
  color: #859900;
}
.sk_theme .separator {
  color: #859900;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
  background: #002F3B;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
  background: #083D4A;
}
#sk_status, #sk_find {
  font-size: 12pt;
}
#sk_keystroke {
  background: #002B36;
}
.expandRichHints span.annotation {
  color: #93A1A1;
}`;

Visual.style("marks", "background: unset; background-color: #37b71d");
Visual.style("cursor", "background: unset; background-color: #37b71d");
Hints.style(
  " \
  font-family: Earth Orbiter, Osaka, Input Sans Condensed, Charcoal, sans-serif; \
  font-size: 13px; \
  font-weight: 400; \
  border: unset; \
  padding: 3px; \
  color: #ffffff; \
  background: unset; \
  background-color: #002B36; \
"
);
Hints.style(
  "\
  font-family: Earth Orbiter, Osaka, Input Sans Condensed, Charcoal, sans-serif; \
  border: solid 1px #37b71d;\
  padding: 1px;\
  color: #fff;\
  background: #37b71d",
  "text"
);

// Remove mapkey
api.unmap("j");
api.unmap("k");
api.unmap("l");

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
api.map("@", "l");

// Google jp 1年以内
api.addSearchAlias(
  "1",
  "Google jp 1年以内",
  "https://www.google.co.jp/search?q={0}&tbs=qdr:y,lr:lang_1ja&lr=lang_ja"
);
api.mapkey("o1", "#8Open Search with alias 1", function () {
  Front.openOmnibar({ type: "SearchEngine", extra: "1" });
});

settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i;

// Google翻訳
api.mapkey("ow", "#8Open google translate with alias w", function () {
  Clipboard.read(function (response) {
    value = response.data;
    //      tabOpenLink('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' + value + '&tl=en&total=1&idx=0');
    postData("https://example.com/answer", { answer: 42 }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  });
});

const copyTitleAndUrl = (format) => {
  const text = format
    .replace("%URL%", location.href)
    .replace("%TITLE%", document.title);
  Clipboard.write(text);
};
const copyDescAndUrl = (format) => {
  const text = format.replace(
    "%DESC%",
    document.getElementsByName("description")[0].content
  );
  Clipboard.write(text);
};
const copyHtmlLink = () => {
  const clipNode = document.createElement("a");
  const range = document.createRange();
  const sel = window.getSelection();
  clipNode.setAttribute("href", location.href);
  clipNode.innerText = document.title;
  document.body.appendChild(clipNode);
  range.selectNode(clipNode);
  sel.removeAllRanges();
  sel.addRange(range);
  document.execCommand("copy", false, null);
  document.body.removeChild(clipNode);
  Front.showBanner("Ritch Copied: " + document.title);
};

api.mapkey("cm", "#7Copy title and link to markdown", () => {
  copyTitleAndUrl("[%TITLE%](%URL%)");
});
api.mapkey("cb", "#7Copy title and link to scrapbox", () => {
  copyTitleAndUrl("[%TITLE% %URL%]");
});
api.mapkey("ca", "#7Copy title and link to href", () => {
  copyTitleAndUrl('<a href="%URL%">%TITLE%</a>');
});
api.mapkey("cd", "#7Copy description", () => {
  copyDescAndUrl("%DESC%");
});
api.mapkey("cr", "#7Copy rich text link", () => {
  copyHtmlLink();
});

// Move to next or previous page
settings.prevLinkRegex =
  /((<<|prev(ious)?|Prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next|Next)|>|›|»|→|次へ|次のページ+)/i;

// Disable keys in specific URL
api.unmapAllExcept(["v", "f"], /netflix.com/);

function download_mp3(file_name, data) {
  const blob = new Blob([data], { type: "text/plain" });
  // const url = URL.create < em class="Highlight" match = "object" loopnumber = "913486946" style = "padding: 1px; box-shadow: rgb(229, 229, 229) 1px 1px; border-radius: 3px; -webkit-print-color-adjust: exact; background-color: rgb(247, 255, 137); color: rgb(20, 43, 19); font-style: inherit;" > Object</em > URL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = file_name;
  a.href = url;
  a.click();
  a.remove();
  // URL.revoke < em class="Highlight" match = "object" loopnumber = "913486946" style = "padding: 1px; box-shadow: rgb(229, 229, 229) 1px 1px; border-radius: 3px; -webkit-print-color-adjust: exact; background-color: rgb(247, 255, 137); color: rgb(20, 43, 19); font-style: inherit;" > Object</em > URL(url);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="translation.mp3"',
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
