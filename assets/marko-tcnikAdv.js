import css from './css-Un9Esv_X.js';
import less from './less-53Q3M91C.js';
import scss from './scss-nyyskVYX.js';
import javascript from './javascript-nWoSUArv.js';

const lang = Object.freeze(JSON.parse('{"displayName":"Marko","fileTypes":["marko"],"name":"marko","patterns":[{"begin":"^\\\\s*(style)\\\\s+(\\\\{)","beginCaptures":{"1":{"name":"storage.type.marko.css"},"2":{"name":"punctuation.section.scope.begin.marko.css"}},"comment":"CSS style block, eg: style { color: green }","contentName":"source.css","end":"\\\\}","endCaptures":{"0":{"name":"punctuation.section.scope.end.marko.css"}},"name":"meta.embedded.css","patterns":[{"include":"source.css"}]},{"begin":"^\\\\s*(style)\\\\.(less)\\\\s+(\\\\{)","beginCaptures":{"1":{"name":"storage.type.marko.css"},"2":{"name":"storage.modifier.marko.css"},"3":{"name":"punctuation.section.scope.begin.marko.css"}},"comment":"Less style block, eg: style.less { color: green }","contentName":"source.less","end":"\\\\}","endCaptures":{"0":{"name":"punctuation.section.scope.end.marko.css"}},"name":"meta.embedded.less","patterns":[{"include":"source.css.less"}]},{"begin":"^\\\\s*(style)\\\\.(scss)\\\\s+(\\\\{)","beginCaptures":{"1":{"name":"storage.type.marko.css"},"2":{"name":"storage.modifier.marko.css"},"3":{"name":"punctuation.section.scope.begin.marko.css"}},"comment":"SCSS style block, eg: style.scss { color: green }","contentName":"source.scss","end":"\\\\}","endCaptures":{"0":{"name":"punctuation.section.scope.end.marko.css"}},"name":"meta.embedded.scss","patterns":[{"include":"source.css.scss"}]},{"begin":"^\\\\s*(?:(static )|(?=(?:class|import|export) ))","beginCaptures":{"1":{"name":"keyword.control.static.marko"}},"comment":"Top level blocks parsed as JavaScript","contentName":"source.js","end":"(?=\\\\n|$)","name":"meta.embedded.js","patterns":[{"include":"#javascript-statement"}]},{"include":"#content-concise-mode"}],"repository":{"attrs":{"patterns":[{"applyEndPatternLast":1,"begin":"(?:\\\\s+|,)(?:(key|on[a-zA-Z0-9_$-]+|[a-zA-Z0-9_$]+Change|no-update(?:-body)?(?:-if)?)|([a-zA-Z0-9_$][a-zA-Z0-9_$-]*))(:[a-zA-Z0-9_$][a-zA-Z0-9_$-]*)?","beginCaptures":{"1":{"name":"support.type.attribute-name.marko"},"2":{"name":"entity.other.attribute-name.marko"},"3":{"name":"support.function.attribute-name.marko"}},"comment":"Attribute with optional value","end":"(?=.|$)","name":"meta.marko-attribute","patterns":[{"include":"#html-args-or-method"},{"applyEndPatternLast":1,"begin":"\\\\s*(:?=)\\\\s*","beginCaptures":{"1":{"patterns":[{"include":"source.js"}]}},"comment":"Attribute value","contentName":"source.js","end":"(?=.|$)","name":"meta.embedded.js","patterns":[{"include":"#javascript-expression"}]}]},{"applyEndPatternLast":1,"begin":"(?:\\\\s+|,)\\\\.\\\\.\\\\.","beginCaptures":{"1":{"name":"keyword.operator.spread.marko"}},"comment":"A ...spread attribute","contentName":"source.js","end":"(?=.|$)","name":"meta.marko-spread-attribute","patterns":[{"include":"#javascript-expression"}]},{"begin":"\\\\s*(,(?!,))","captures":{"1":{"patterns":[{"include":"source.js"}]}},"comment":"Consume any whitespace after a comma","end":"(?!\\\\S)"},{"include":"#javascript-comment-multiline"},{"include":"#invalid"}]},"concise-html-block":{"begin":"\\\\s*(--+)\\\\s*$","beginCaptures":{"2":{"name":"punctuation.section.scope.begin.marko"}},"comment":"--- HTML block within concise mode content. ---","end":"\\\\1","endCaptures":{"1":{"name":"punctuation.section.scope.end.marko"}},"name":"meta.section.marko-html-block","patterns":[{"include":"#content-html-mode"}]},"concise-html-line":{"captures":{"1":{"name":"punctuation.section.scope.begin.marko"},"2":{"patterns":[{"include":"#html-comments"},{"include":"#tag-html"},{"match":"\\\\\\\\.","name":"string"},{"include":"#placeholder"},{"match":".+?","name":"string"}]}},"comment":"-- HTML line within concise mode content. (content-html-mode w/o scriptlet)","match":"\\\\s*(--+)(?=\\\\s+\\\\S)(.*$)","name":"meta.section.marko-html-line"},"concise-open-tag-content":{"patterns":[{"include":"#tag-before-attrs"},{"begin":"\\\\s*\\\\[","beginCaptures":{"0":{"name":"punctuation.section.scope.begin.marko"}},"end":"]","endCaptures":{"0":{"name":"punctuation.section.scope.end.marko"}},"patterns":[{"include":"#attrs"},{"include":"#invalid"}]},{"begin":"(?!^)(?= )","end":"(?=--)|(?<!,)(?=\\\\n)","patterns":[{"include":"#attrs"},{"include":"#invalid"}]}]},"concise-script-block":{"begin":"(\\\\s+)(--+)\\\\s*$","beginCaptures":{"2":{"name":"punctuation.section.scope.begin.marko"}},"comment":"--- Embedded concise script content block. ---","end":"(\\\\2)|(?=^(?!\\\\1)\\\\s*\\\\S)","endCaptures":{"1":{"name":"punctuation.section.scope.end.marko"}},"name":"meta.section.marko-script-block","patterns":[{"include":"#content-embedded-script"}]},"concise-script-line":{"applyEndPatternLast":1,"begin":"\\\\s*(--+)","beginCaptures":{"1":{"name":"punctuation.section.scope.begin.marko"}},"comment":"-- Embedded concise script content line.","end":"$","name":"meta.section.marko-script-line","patterns":[{"include":"#content-embedded-script"}]},"concise-style-block":{"begin":"(\\\\s+)(--+)\\\\s*$","beginCaptures":{"2":{"name":"punctuation.section.scope.begin.marko"}},"comment":"--- Embedded concise style content block. ---","contentName":"source.css","end":"(\\\\2)|(?=^(?!\\\\1)\\\\s*\\\\S)","endCaptures":{"1":{"name":"punctuation.section.scope.end.marko"}},"name":"meta.section.marko-style-block","patterns":[{"include":"#content-embedded-style"}]},"concise-style-block-less":{"begin":"(\\\\s+)(--+)\\\\s*$","beginCaptures":{"2":{"name":"punctuation.section.scope.begin.marko"}},"comment":"--- Embedded concise style content block. ---","contentName":"source.less","end":"(\\\\2)|(?=^(?!\\\\1)\\\\s*\\\\S)","endCaptures":{"1":{"name":"punctuation.section.scope.end.marko"}},"name":"meta.section.marko-style-block","patterns":[{"include":"#content-embedded-style-less"}]},"concise-style-block-scss":{"begin":"(\\\\s+)(--+)\\\\s*$","beginCaptures":{"2":{"name":"punctuation.section.scope.begin.marko"}},"comment":"--- Embedded concise style content block. ---","contentName":"source.scss","end":"(\\\\2)|(?=^(?!\\\\1)\\\\s*\\\\S)","endCaptures":{"1":{"name":"punctuation.section.scope.end.marko"}},"name":"meta.section.marko-style-block","patterns":[{"include":"#content-embedded-style-scss"}]},"concise-style-line":{"applyEndPatternLast":1,"begin":"\\\\s*(--+)","beginCaptures":{"1":{"name":"punctuation.section.scope.begin.marko"}},"comment":"-- Embedded concise style content line.","contentName":"source.css","end":"$","name":"meta.section.marko-style-line","patterns":[{"include":"#content-embedded-style"}]},"concise-style-line-less":{"applyEndPatternLast":1,"begin":"\\\\s*(--+)","beginCaptures":{"1":{"name":"punctuation.section.scope.begin.marko"}},"comment":"-- Embedded concise style content line.","contentName":"source.less","end":"$","name":"meta.section.marko-style-line","patterns":[{"include":"#content-embedded-style-less"}]},"concise-style-line-scss":{"applyEndPatternLast":1,"begin":"\\\\s*(--+)","beginCaptures":{"1":{"name":"punctuation.section.scope.begin.marko"}},"comment":"-- Embedded concise style content line.","contentName":"source.scss","end":"$","name":"meta.section.marko-style-line","patterns":[{"include":"#content-embedded-style-scss"}]},"content-concise-mode":{"comment":"Concise mode content block.","name":"meta.marko-concise-content","patterns":[{"include":"#scriptlet"},{"include":"#javascript-comments"},{"include":"#html-comments"},{"include":"#concise-html-block"},{"include":"#concise-html-line"},{"include":"#tag-html"},{"comment":"A concise html tag.","patterns":[{"begin":"^(\\\\s*)(?=style\\\\.less\\\\b)","comment":"Concise style tag less","patterns":[{"include":"#concise-open-tag-content"},{"include":"#concise-style-block-less"},{"include":"#concise-style-line-less"}],"while":"(?=^\\\\1\\\\s+(\\\\S|$))"},{"begin":"^(\\\\s*)(?=style\\\\.scss\\\\b)","comment":"Concise style tag scss","patterns":[{"include":"#concise-open-tag-content"},{"include":"#concise-style-block-scss"},{"include":"#concise-style-line-scss"}],"while":"(?=^\\\\1\\\\s+(\\\\S|$))"},{"begin":"^(\\\\s*)(?=style\\\\b)","comment":"Concise style tag","patterns":[{"include":"#concise-open-tag-content"},{"include":"#concise-style-block"},{"include":"#concise-style-line"}],"while":"(?=^\\\\1\\\\s+(\\\\S|$))"},{"begin":"^(\\\\s*)(?=script\\\\b)","comment":"Concise script tag","patterns":[{"include":"#concise-open-tag-content"},{"include":"#concise-script-block"},{"include":"#concise-script-line"}],"while":"(?=^\\\\1\\\\s+(\\\\S|$))"},{"begin":"^(\\\\s*)(?=[a-zA-Z0-9_$@])","comment":"Normal concise tag","patterns":[{"include":"#concise-open-tag-content"},{"include":"#content-concise-mode"}],"while":"(?=^\\\\1\\\\s+(\\\\S|$))"}]},{"include":"#invalid"}]},"content-embedded-script":{"name":"meta.embedded.js","patterns":[{"include":"#placeholder"},{"include":"source.js"}]},"content-embedded-style":{"name":"meta.embedded.css","patterns":[{"include":"#placeholder"},{"include":"source.css"}]},"content-embedded-style-less":{"name":"meta.embedded.css.less","patterns":[{"include":"#placeholder"},{"include":"source.css.less"}]},"content-embedded-style-scss":{"name":"meta.embedded.css.scss","patterns":[{"include":"#placeholder"},{"include":"source.css.scss"}]},"content-html-mode":{"comment":"HTML mode content block.","patterns":[{"include":"#scriptlet"},{"include":"#html-comments"},{"include":"#tag-html"},{"match":"\\\\\\\\.","name":"string"},{"include":"#placeholder"},{"match":".+?","name":"string"}]},"html-args-or-method":{"patterns":[{"include":"#javascript-args"},{"begin":"(?<=\\\\))\\\\s*(?=\\\\{)","comment":"Attribute method shorthand following parens","contentName":"source.js","end":"(?<=\\\\})","name":"meta.embedded.js","patterns":[{"include":"source.js"}]}]},"html-comments":{"patterns":[{"begin":"\\\\s*(<!(--)?)","beginCaptures":{"1":{"name":"punctuation.definition.comment.marko"}},"comment":"HTML comments, doctypes & cdata","end":"\\\\2>","endCaptures":{"0":{"name":"punctuation.definition.comment.marko"}},"name":"comment.block.marko"},{"begin":"\\\\s*(<html-comment>)","beginCaptures":{"1":{"name":"punctuation.definition.comment.marko"}},"comment":"Preserved HTML comment tag","end":"</html-comment>","endCaptures":{"0":{"name":"punctuation.definition.comment.marko"}},"name":"comment.block.marko"}]},"invalid":{"match":"[^\\\\s]","name":"invalid.illegal.character-not-allowed-here.marko"},"javascript-args":{"begin":"(?=\\\\()","comment":"Javascript style arguments","contentName":"source.js","end":"(?<=\\\\))","name":"meta.embedded.js","patterns":[{"include":"source.js"}]},"javascript-comment-line":{"captures":{"0":{"patterns":[{"include":"source.js"}]}},"comment":"JavaScript // single line comment","contentName":"source.js","match":"\\\\s*//.*$"},"javascript-comment-multiline":{"begin":"\\\\s*(?=/\\\\*)","comment":"JavaScript /* block comment */","contentName":"source.js","end":"(?<=\\\\*/)","patterns":[{"include":"source.js"}]},"javascript-comments":{"patterns":[{"include":"#javascript-comment-multiline"},{"include":"#javascript-comment-line"}]},"javascript-enclosed":{"comment":"Matches JavaScript content and ensures enclosed blocks are matched.","patterns":[{"include":"#javascript-comments"},{"include":"#javascript-args"},{"begin":"(?={)","end":"(?<=})","patterns":[{"include":"source.js"}]},{"begin":"(?=\\\\[)","end":"(?<=])","patterns":[{"include":"source.js"}]},{"begin":"(?=\\")","end":"(?<=\\")","patterns":[{"include":"source.js"}]},{"begin":"(?=\')","end":"(?<=\')","patterns":[{"include":"source.js"}]},{"begin":"(?=`)","end":"(?<=`)","patterns":[{"include":"source.js"}]},{"begin":"/(?!<[\\\\]})A-Z0-9.<%]\\\\s*/)(?!/?>|$)","captures":{"0":{"name":"string.regexp.js"}},"contentName":"source.js","end":"/[gimsuy]*","patterns":[{"include":"source.js#regexp"},{"include":"source.js"}]},{"begin":"\\\\s*(?:(?:\\\\b(?:new|typeof|instanceof|in)\\\\b)|\\\\&\\\\&|\\\\|\\\\||[\\\\^|&]|[!=]=|[!=]==|<|<[=<]|=>|[?:]|[-+*%](?!-))","captures":{"0":{"patterns":[{"include":"source.js"}]}},"end":"(?=\\\\S)"}]},"javascript-expression":{"patterns":[{"include":"#javascript-enclosed"},{"captures":{"0":{"patterns":[{"include":"source.js"}]}},"comment":"Match identifiers and member expressions","match":"[0-9a-zA-Z$_.]+"}]},"javascript-statement":{"patterns":[{"include":"#javascript-enclosed"},{"include":"source.js"}]},"open-tag-content":{"patterns":[{"include":"#tag-before-attrs"},{"begin":"(?= )","comment":"Attributes begin after the first space within the tag name","end":"(?=/?>)","patterns":[{"include":"#attrs"}]}]},"placeholder":{"begin":"\\\\$!?{","beginCaptures":{"0":{"name":"punctuation.definition.template-expression.begin.js"}},"comment":"${ } placeholder","contentName":"source.js","end":"}","endCaptures":{"0":{"name":"punctuation.definition.template-expression.end.js"}},"patterns":[{"include":"source.js"}]},"scriptlet":{"begin":"^\\\\s*(\\\\$)\\\\s+","beginCaptures":{"1":{"name":"keyword.control.scriptlet.marko"}},"comment":"An inline JavaScript scriptlet.","contentName":"source.js","end":"$","name":"meta.embedded.js","patterns":[{"include":"#javascript-statement"}]},"tag-before-attrs":{"comment":"Everything in a tag before the attributes content","patterns":[{"include":"#tag-name"},{"comment":"Shorthand class or ID attribute","match":"[#.][a-zA-Z0-9_$][a-zA-Z0-9_$-]*","name":"entity.other.attribute-name.marko"},{"begin":"/(?!/)","beginCaptures":{"0":{"name":"punctuation.separator.key-value.marko"}},"comment":"Variable for a tag","contentName":"source.js","end":"(?=:?=|\\\\s|>|$|\\\\||\\\\(|/)","name":"meta.embedded.js","patterns":[{"comment":"Match identifiers","match":"[a-zA-Z$_][0-9a-zA-Z$_]*","name":"variable.other.constant.object.js"},{"include":"source.js#object-binding-pattern"},{"include":"source.js#array-binding-pattern"},{"include":"source.js#var-single-variable"},{"include":"#javascript-expression"}]},{"applyEndPatternLast":1,"begin":"\\\\s*(:?=)\\\\s*","beginCaptures":{"1":{"patterns":[{"include":"source.js"}]}},"comment":"Default attribute value","contentName":"source.js","end":"(?=.|$)","name":"meta.embedded.js","patterns":[{"include":"#javascript-expression"}]},{"begin":"\\\\|","beginCaptures":{"0":{"name":"punctuation.section.scope.begin.marko"}},"comment":"Parameters for a tag","end":"\\\\|","endCaptures":{"0":{"name":"punctuation.section.scope.end.marko"}},"patterns":[{"include":"source.js#function-parameters-body"},{"include":"source.js"}]},{"include":"#html-args-or-method"}]},"tag-html":{"comment":"Matches an HTML tag and its contents","patterns":[{"begin":"\\\\s*(<)(?=(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"}},"comment":"HTML void elements","end":"/?>","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"}]},{"begin":"\\\\s*(<)(?=style\\\\.less\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.marko"}},"comment":"HTML style tag with less","end":"/>|(?<=>)","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"},{"begin":">","beginCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"comment":"Style body content","contentName":"source.less","end":"\\\\s*(</)(style)?(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"},"2":{"patterns":[{"include":"#tag-name"}]},"3":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#content-embedded-style-less"}]}]},{"begin":"\\\\s*(<)(?=style\\\\.scss\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.marko"}},"comment":"HTML style tag with scss","end":"/>|(?<=>)","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"},{"begin":">","beginCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"comment":"Style body content","contentName":"source.less","end":"\\\\s*(</)(style)?(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"},"2":{"patterns":[{"include":"#tag-name"}]},"3":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#content-embedded-style-scss"}]}]},{"begin":"\\\\s*(<)(?=style\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.marko"}},"comment":"HTML style tag","end":"/>|(?<=>)","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"},{"begin":">","beginCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"comment":"Style body content","contentName":"source.css","end":"\\\\s*(</)(style)?(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"},"2":{"patterns":[{"include":"#tag-name"}]},"3":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#content-embedded-style"}]}]},{"begin":"\\\\s*(<)(?=script\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.marko"}},"comment":"HTML script tag","end":"/>|(?<=>)","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"},{"begin":">","beginCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"comment":"Script body content","contentName":"source.js","end":"\\\\s*(</)(script)?(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"},"2":{"patterns":[{"include":"#tag-name"}]},"3":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#content-embedded-script"}]}]},{"begin":"\\\\s*(<)(?=[a-zA-Z0-9_$@])","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.marko"}},"comment":"HTML normal tag","end":"/>|(?<=>)","endCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#open-tag-content"},{"begin":">","beginCaptures":{"0":{"name":"punctuation.definition.tag.end.marko"}},"comment":"Body content","end":"\\\\s*(</)([a-zA-Z0-9_$:@-]+)?(.*?)(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.marko"},"2":{"patterns":[{"include":"#tag-name"}]},"3":{"patterns":[{"include":"#invalid"}]},"4":{"name":"punctuation.definition.tag.end.marko"}},"patterns":[{"include":"#content-html-mode"}]}]}]},"tag-name":{"patterns":[{"begin":"\\\\${","beginCaptures":{"0":{"name":"punctuation.definition.template-expression.begin.js"}},"comment":"Dynamic tag.","end":"}","endCaptures":{"0":{"name":"punctuation.definition.template-expression.end.js"}},"patterns":[{"include":"source.js"}]},{"captures":{"1":{"name":"entity.name.tag.marko"},"2":{"name":"storage.type.marko.css"},"3":{"patterns":[{"comment":"Core tag.","match":"(attrs|return|import)(?=\\\\b)","name":"support.type.builtin.marko"},{"comment":"Core tag.","match":"(for|if|while|else-if|else|macro|tag|await|let|const|effect|set|get|id|lifecycle)(?=\\\\b)","name":"support.function.marko"},{"comment":"Attribute tag.","match":"@.+","name":"entity.other.attribute-name.marko"},{"comment":"Native or userland tag.","match":".+","name":"entity.name.tag.marko"}]}},"match":"(style)\\\\.([a-zA-Z0-9$_-]+(?:\\\\.[a-zA-Z0-9$_-]+)*)|([a-zA-Z0-9_$@][a-zA-Z0-9_$@:-]*)"}]}},"scopeName":"text.marko","embeddedLangs":["css","less","scss","javascript"]}'));
var marko = [
  ...css,
  ...less,
  ...scss,
  ...javascript,
  lang
];

export { marko as default };
