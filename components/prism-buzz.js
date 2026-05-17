(function (Prism) {
	var interpolation = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/.source;
	var keywords =
		/and|any|as|bool|break|catch|continue|do|double|else|enum|export|extern|fib|final|for|foreach|from|fun|if|import|in|int|is|match|mut|namespace|obj|object|or|out|pat|protocol|resolve|resume|return|rg|static|str|test|throw|try|type|typeof|ud|until|var|void|while|yield|zdef/.source;
	var reservedWords = keywords + "|false|null|this|true";
	var quotedIdentifier = /@"(?:\\.|[^"\\\r\n])*"/.source;
	var identifier = /[a-z_]\w*/.source + "|" + quotedIdentifier;

	Prism.languages.buzz = {
		hashbang: {
			pattern: /^#!.*/,
			greedy: true,
			alias: "comment",
		},
		"doc-comment": {
			pattern: /\/\/\/.*(?:\r?\n[ \t]*\/\/\/.*)*/,
			greedy: true,
			alias: "comment",
		},
		comment: {
			pattern: /\/\/.*/,
			greedy: true,
		},
		pattern: {
			pattern: /\$"(?:""|\\.|[^"\\\r\n])*"/,
			greedy: true,
			alias: "regex",
			inside: {
				"regex-delimiter": /^\$"|"$/,
				"regex-source": {
					pattern: /[\s\S]+/,
					alias: "language-regex",
					inside: Prism.languages.regex,
				},
			},
		},
		"string-literal": {
			pattern: RegExp(
				"`(?:\\\\[\\s\\S]|" +
					interpolation +
					"|[^\\\\{`])*`" +
					"|" +
					'"(?:\\\\[\\s\\S]|' +
					interpolation +
					'|[^\\\\{"\\r\\n])*"'
			),
			greedy: true,
			inside: {
				interpolation: {
					pattern: RegExp(
						/((?:^|[^\\])(?:\\{2})*)/.source + interpolation
					),
					lookbehind: true,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\{|\}$/,
							alias: "punctuation",
						},
					},
				},
				"string-punctuation": {
					pattern: /^["`]|["`]$/,
					alias: "punctuation",
				},
				string: /[\s\S]+/,
			},
		},
		char: {
			pattern: /'(?:\\(?:[0abfnrtv\\'"]|\d{1,3})|[^\\'\r\n])'/,
			greedy: true,
		},
		number: {
			pattern:
				/(^|\W)(?:0b[01]+(?:_[01]+)*|0x[\da-f]+(?:_[\da-f]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?)(?!\w)/i,
			lookbehind: true,
		},
		boolean: /\b(?:false|true)\b/,
		null: {
			pattern: /\bnull\b/,
			alias: "constant",
		},
		this: {
			pattern: /\bthis\b/,
			alias: "constant",
		},
		"function-definition": {
			pattern: RegExp("(\\bfun\\s+)(?:" + identifier + ")"),
			lookbehind: true,
			greedy: true,
			alias: "function",
		},
		variable: {
			pattern: RegExp(
				"(\\b(?:final|var)[ \\t]+)(?!(?:" +
					reservedWords +
					")\\b)(?:" +
					identifier +
					")"
			),
			lookbehind: true,
			greedy: true,
		},
		"quoted-identifier": {
			pattern: RegExp(quotedIdentifier),
			greedy: true,
			alias: "symbol",
		},
		namespace: [
			{
				pattern:
					/(\b(?:as|namespace)\s+)[A-Za-z_]\w*(?:\\[A-Za-z_]\w*)+/,
				lookbehind: true,
				inside: {
					punctuation: /\\/,
				},
			},
			{
				pattern: /\b[A-Za-z_]\w*(?:\\[A-Za-z_]\w*)*\\/,
				inside: {
					punctuation: /\\/,
				},
			},
		],
		keyword: RegExp("\\bas\\?|\\b(?:" + keywords + ")\\b"),
		function: /\b(?!match\b)[a-z_]\w*(?=\s*(?:(?:::<[\s\S]*?>)\s*)?(?:\(|\.\{))/,
		"class-name": [
			{
				pattern: /(\b(?:enum|object|protocol)\s+)[A-Z]\w*/,
				lookbehind: true,
			},
			/\b[A-Z]\w*\b/,
		],
		operator: /!>|->|=>|::|\.\.|\?\?|<<=?|>>=?|[-+*/%&|^~!=<>]=?|\?/,
		punctuation: /[{}[\]();,.:\\]/,
	};

	Prism.languages.buzz["string-literal"].inside["interpolation"].inside.rest =
		Prism.languages.buzz;
})(Prism);
