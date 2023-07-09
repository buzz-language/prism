Prism.languages.buzz = {
	comment: /\/\/[^\n]*/m,
	number: /\b([0-9][^xb][0-9_]*(\.[0-9_]+)?)|(0b[0-1_]+)|(0x[0-9A-Fa-f_]+?)\b/i,
	boolean: /\b(?:false|true)\b/,
	null: {
		pattern: /\bnull\b/,
		alias: 'constant'
	},
	this: {
		pattern: /\bthis\b/,
		alias: 'constant'
	},
	regex: {
		pattern: /^\$"[\s\S]+"/,
		lookbehind: true,
		alias: 'language-regex',
		inside: Prism.languages.regex
	},
	keyword:
		/\b(?:typeof|type|zdef|static|extern|import|export|from|test|as|in|while|if|else|fun|try|catch|throw|constructor|return|switch|default|break|for|foreach|do|until|continue|resolve|resume|yield|any|out|var|const|and|or|!|\?\?|enum|object|protocol|ud|str|int|float|obj|fib|bool|pat|type|any|rg|void|namespace|is)\b/,

	function: /\b[a-z_]\w*(?=\s*\()/i,
	'class-name': /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,

	operator: /([-+*/%=!<>&^~?|]+)|(\/)[^/]|(->)|(>>)|(<<)|(=>)|(::)/,
	punctuation: /[@{}[\]\\();,.:\\]/,

	'string-literal': {
		pattern: /(?:\`[\s\S]*?\`)|("(?:\\.|(?!")[^\\\r\n])*")/,
		greedy: true,
		inside: {
			interpolation: {
				pattern: /\{(?:[^{}]|\([^{}]*\})*\}/,
				lookbehind: true
			},
			'interpolation-punctuation': {
				pattern: /^\}|\{$/,
				alias: 'punctuation'
			},
			punctuation: /\\(?=[\r\n])/,
			string: /[\s\S]+/
		}
	},

	'function-definition': {
		pattern: /(\bfun\s+)\w+/,
		lookbehind: true,
		alias: 'function'
	}
}

// Prism.languages.buzz['string-literal'].forEach(function (rule) {
// 	rule.inside['interpolation'].inside = Prism.languages.buzz
// })
