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

api.mapkey("ow", "#8Open google translate with alias ow", function () {
  Clipboard.read(function (response) {
    const v = response.data;
    tabOpenLink(soundURL(v));
    downloadSoundFile(soundURL(v), v);
    tabOpenLink(playPhraseURL(v));
    tabOpenLink(exampleURL(v));
    tabOpenLink(meaningURL(v));
  });
});

// Google Translate (Turkish)
api.mapkey("ot", "#8Open google translate with alias ot", function () {
  Clipboard.read(function (response) {
    const v = response.data;
    soundURL = soundURL(v, "tr");
    tabOpenLink(soundURL);
    downloadSoundFile(soundURL, v);
    tabOpenLink(playPhraseURL(v));
    tabOpenLink(exampleURL(v));
    tabOpenLink(meaningURL(v));
  });
});

// Download a sound file
api.mapkey("os", "#8Download a sound file with alias os", function () {
  Clipboard.read(function (response) {
    const v = response.data;
    soundURL = soundURL(v);
    tabOpenLink(soundURL);
    downloadSoundFile(soundURL, v);
  });
});

function soundURL(v, lang = "en") {
  return (
    "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=" +
    encodeURIComponent(v) +
    "&tl=" +
    lang +
    "&total=1&idx=0"
  );
}

function meaningURL(v) {
  return (
    "https://www.google.com/search?q=" +
    encodeURIComponent(v) +
    "+meaning&oq=" +
    encodeURIComponent(v) +
    "+meaning"
  );
}

function exampleURL(v) {
  return (
    "https://www.google.com/search?q=" +
    encodeURIComponent(v) +
    "+example+sentence&oq=" +
    encodeURIComponent(v) +
    "+example+sentence"
  );
}

function playPhraseURL(v) {
  return `https://www.playphrase.me/#/search?q=${v}`;
}

/*
 * download a sound file
 * @param string url
 * @param string filename
 * */
async function downloadSoundFile(url, filename) {
  const response = await fetch(url, { mode: "no-cors" });
  const blob = await response.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename + ".mp3";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

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
const copyTitle = () => {
  const title = document.querySelector("title");
  const titleText = title.textContent;

  navigator.clipboard.writeText(titleText).then(
    function () {
      Front.showBanner("Title Copied: " + title);
    },
    function (err) {
      Front.showBanner("Failed to copy title: ", err);
    }
  );
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
api.mapkey("cr", "#7Copy title", () => {
  copyTitle();
});

// Move to next or previous page
settings.prevLinkRegex =
  /((<<|prev(ious)?|Prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next|Next)|>|›|»|→|次へ|次のページ+)/i;

// Disable keys in specific URL
api.unmapAllExcept(["v", "f"], /netflix.com|youtube.com/);
