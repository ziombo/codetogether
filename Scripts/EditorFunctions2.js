﻿/****************************************************************************
*																			*
*					JavaScript used to optimize editor						*
*																			*
****************************************************************************/

var modes = ['abap', 'abc', 'actionscript', 'ada', 'apache_conf', 'applescript', 'asciidoc', 'assembly_x86', 'autohotkey', 'batchfile',
				'c9search', 'cirru', 'clojure', 'cobol', 'coffee', 'coldfusion', 'csharp', 'css', 'curly', 'c_cpp', 'd', 'dart', 'diff', 'django',
				'dockerfile', 'dot', 'eiffel', 'ejs', 'elixir', 'elm', 'erlang', 'forth', 'fortran', 'ftl', 'gcode', 'gherkin', 'gitignore', 'glsl',
				'gobstones', 'golang', 'groovy', 'haml', 'handlebars', 'haskell', 'haxe', 'html', 'html_elixir', 'html_ruby', 'ini', 'io', 'jack', 'jade',
				'java', 'javascript', 'json', 'jsoniq', 'jsp', 'jsx', 'julia', 'latex', 'lean', 'less', 'liquid', 'lisp', 'livescript', 'live_script',
				'logiql', 'lsl', 'lua', 'luapage', 'lucene', 'makefile', 'markdown', 'mask', 'matlab', 'mavens_mate_log', 'maze', 'mel', 'mipsassembler',
				'mips_assembler', 'mushcode', 'mysql', 'nix', 'nsis', 'objectivec', 'ocaml', 'pascal', 'perl', 'pgsql', 'php', 'plain_text', 'powershell',
				'praat', 'prolog', 'properties', 'protobuf', 'python', 'r', 'razor', 'rdoc', 'rhtml', 'rst', 'ruby', 'rust', 'sass', 'scad', 'scala',
				'scheme', 'scss', 'sh', 'sjs', 'smarty', 'snippets', 'soy_template', 'space', 'sql', 'sqlserver', 'stylus',
				'svg', 'swift', 'swig', 'tcl', 'tex', 'text', 'textile', 'toml', 'twig', 'typescript', 'vala', 'vbscrip'];

var themes = ['ambiance', 'chaos', 'chrome', 'clouds', 'clouds_midnight', 'cobalt', 'crimson_editor', 'dawn', 'dreamweaver', 'eclipse', 'github',
				'idle_fingers', 'iplastic', 'katzenmilch', 'kr_theme', 'kuroir', 'merbivore', 'merbivore_soft', 'mono_industrial', 'monokai',
				'pastel_on_dark', 'solarized_dark', 'solarized_light', 'sqlserver', 'terminal', 'textmate', 'tomorrow', 'tomorrow_night',
				'tomorrow_night_blue', 'tomorrow_night_bright', 'tomorrow_night_eighties', 'twilight', 'vibrant_ink', 'xcode'];


/* FIRST EDITOR */
var editor = ace.edit("first");
editor.setTheme("ace/theme/ambiance");
editor.getSession().setUseWrapMode(true);
editor.getSession().setMode("ace/mode/abap");
editor.setShowPrintMargin(false);
document.getElementById("first").style.fontSize = "18px";


//load into mode droplist
var sel = document.getElementById('modeSelect');
var fragment = document.createDocumentFragment();
modes.forEach(function (modes, index) {
	var opt = document.createElement('option');
	opt.innerHTML = modes;
	opt.value = modes;
	fragment.appendChild(opt);
});
sel.appendChild(fragment);

//load into theme droplist		
var kek = document.getElementById('themeSelect');
var fragment2 = document.createDocumentFragment();
themes.forEach(function (themes, index) {
	var opt = document.createElement('option');
	opt.innerHTML = themes;
	opt.value = themes;
	fragment2.appendChild(opt);
});
kek.appendChild(fragment2);

//change mode of editor whenever new option is picked
function changeMode1() {
	var mode = document.getElementById("modeSelect");
	var strUser = mode.options[mode.selectedIndex].text;
	editor.getSession().setMode("ace/mode/" + strUser);
	editor.focus();
	changeMod();
};

//change theme of editor whenever new option is picke
function changeTheme1() {
	var theme = document.getElementById("themeSelect");
	var strUser = theme.options[theme.selectedIndex].text;
	editor.setTheme("ace/theme/" + strUser);
	document.getElementsById("text").focus();
	editor.focus();
};


/* SECOND EDITOR  */
var editor2 = ace.edit("third");
editor2.setTheme("ace/theme/ambiance");
editor2.getSession().setUseWrapMode(true);
editor2.getSession().setMode("ace/mode/abap");
editor2.setShowPrintMargin(false);
editor2.setReadOnly(true);
document.getElementById('third').style.fontSize = '18px';

//load	 into theme droplist
var kek = document.getElementById('themeSelect2');
var fragment2 = document.createDocumentFragment();
themes.forEach(function (themes, index) {
	var opt = document.createElement('option');
	opt.innerHTML = themes;
	opt.value = themes;
	fragment2.appendChild(opt);
});
kek.appendChild(fragment2);

//change theme of editor whenever new option is picke
function changeTheme2() {
	var theme = document.getElementById("themeSelect2");
	var strUser = theme.options[theme.selectedIndex].text;
	editor2.setTheme("ace/theme/" + strUser);
};