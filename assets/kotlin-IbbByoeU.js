const lang = Object.freeze(JSON.parse('{"displayName":"Kotlin","fileTypes":["kt","kts"],"name":"kotlin","patterns":[{"include":"#import"},{"include":"#package"},{"include":"#code"}],"repository":{"annotation-simple":{"match":"(?<!\\\\w)@[\\\\w\\\\.]+\\\\b(?!:)","name":"entity.name.type.annotation.kotlin"},"annotation-site":{"begin":"(?<!\\\\w)(@\\\\w+):\\\\s*(?!\\\\[)","beginCaptures":{"1":{"name":"entity.name.type.annotation-site.kotlin"}},"end":"$","patterns":[{"include":"#unescaped-annotation"}]},"annotation-site-list":{"begin":"(?<!\\\\w)(@\\\\w+):\\\\s*\\\\[","beginCaptures":{"1":{"name":"entity.name.type.annotation-site.kotlin"}},"end":"\\\\]","patterns":[{"include":"#unescaped-annotation"}]},"binary-literal":{"match":"0(b|B)[01][01_]*","name":"constant.numeric.binary.kotlin"},"boolean-literal":{"match":"\\\\b(true|false)\\\\b","name":"constant.language.boolean.kotlin"},"character":{"begin":"\'","end":"\'","name":"string.quoted.single.kotlin","patterns":[{"match":"\\\\\\\\.","name":"constant.character.escape.kotlin"}]},"class-declaration":{"captures":{"1":{"name":"keyword.hard.class.kotlin"},"2":{"name":"entity.name.type.class.kotlin"},"3":{"patterns":[{"include":"#type-parameter"}]}},"match":"\\\\b(class|(?:fun\\\\s+)?interface)\\\\s+(\\\\b\\\\w+\\\\b|`[^`]+`)\\\\s*(?<GROUP><([^<>]|\\\\g<GROUP>)+>)?"},"code":{"patterns":[{"include":"#comments"},{"include":"#keywords"},{"include":"#annotation-simple"},{"include":"#annotation-site-list"},{"include":"#annotation-site"},{"include":"#class-declaration"},{"include":"#object"},{"include":"#type-alias"},{"include":"#function"},{"include":"#variable-declaration"},{"include":"#type-constraint"},{"include":"#type-annotation"},{"include":"#function-call"},{"include":"#method-reference"},{"include":"#key"},{"include":"#string"},{"include":"#string-empty"},{"include":"#string-multiline"},{"include":"#character"},{"include":"#lambda-arrow"},{"include":"#operators"},{"include":"#self-reference"},{"include":"#decimal-literal"},{"include":"#hex-literal"},{"include":"#binary-literal"},{"include":"#boolean-literal"},{"include":"#null-literal"}]},"comment-block":{"begin":"/\\\\*(?!\\\\*)","end":"\\\\*/","name":"comment.block.kotlin"},"comment-javadoc":{"patterns":[{"begin":"/\\\\*\\\\*","end":"\\\\*/","name":"comment.block.javadoc.kotlin","patterns":[{"match":"@(return|constructor|receiver|sample|see|author|since|suppress)\\\\b","name":"keyword.other.documentation.javadoc.kotlin"},{"captures":{"1":{"name":"keyword.other.documentation.javadoc.kotlin"},"2":{"name":"variable.parameter.kotlin"}},"match":"(@param|@property)\\\\s+(\\\\S+)"},{"captures":{"1":{"name":"keyword.other.documentation.javadoc.kotlin"},"2":{"name":"variable.parameter.kotlin"}},"match":"(@param)\\\\[(\\\\S+)\\\\]"},{"captures":{"1":{"name":"keyword.other.documentation.javadoc.kotlin"},"2":{"name":"entity.name.type.class.kotlin"}},"match":"(@(?:exception|throws))\\\\s+(\\\\S+)"},{"captures":{"1":{"name":"keyword.other.documentation.javadoc.kotlin"},"2":{"name":"entity.name.type.class.kotlin"},"3":{"name":"variable.parameter.kotlin"}},"match":"{(@link)\\\\s+(\\\\S+)?#([\\\\w$]+\\\\s*\\\\([^()]*\\\\)).*}"}]}]},"comment-line":{"begin":"//","end":"$","name":"comment.line.double-slash.kotlin"},"comments":{"patterns":[{"include":"#comment-line"},{"include":"#comment-block"},{"include":"#comment-javadoc"}]},"control-keywords":{"match":"\\\\b(if|else|while|do|when|try|throw|break|continue|return|for)\\\\b","name":"keyword.control.kotlin"},"decimal-literal":{"match":"\\\\b\\\\d[\\\\d_]*(\\\\.[\\\\d_]+)?((e|E)\\\\d+)?(u|U)?(L|F|f)?\\\\b","name":"constant.numeric.decimal.kotlin"},"function":{"captures":{"1":{"name":"keyword.hard.fun.kotlin"},"2":{"patterns":[{"include":"#type-parameter"}]},"4":{"name":"entity.name.type.class.extension.kotlin"},"5":{"name":"entity.name.function.declaration.kotlin"}},"match":"\\\\b(fun)\\\\b\\\\s*(?<GROUP><([^<>]|\\\\g<GROUP>)+>)?\\\\s*(?:(?:(\\\\w+)\\\\.)?(\\\\b\\\\w+\\\\b|`[^`]+`))?"},"function-call":{"captures":{"1":{"name":"entity.name.function.call.kotlin"},"2":{"patterns":[{"include":"#type-parameter"}]}},"match":"\\\\??\\\\.?(\\\\b\\\\w+\\\\b|`[^`]+`)\\\\s*(?<GROUP><([^<>]|\\\\g<GROUP>)+>)?\\\\s*(?=[({])"},"hard-keywords":{"match":"\\\\b(as|typeof|is|in)\\\\b","name":"keyword.hard.kotlin"},"hex-literal":{"match":"0(x|X)[A-Fa-f0-9][A-Fa-f0-9_]*(u|U)?","name":"constant.numeric.hex.kotlin"},"import":{"begin":"\\\\b(import)\\\\b\\\\s*","beginCaptures":{"1":{"name":"keyword.soft.kotlin"}},"contentName":"entity.name.package.kotlin","end":";|$","name":"meta.import.kotlin","patterns":[{"include":"#comments"},{"include":"#hard-keywords"},{"match":"\\\\*","name":"variable.language.wildcard.kotlin"}]},"key":{"captures":{"1":{"name":"variable.parameter.kotlin"},"2":{"name":"keyword.operator.assignment.kotlin"}},"match":"\\\\b(\\\\w=)\\\\s*(=)"},"keywords":{"patterns":[{"include":"#prefix-modifiers"},{"include":"#postfix-modifiers"},{"include":"#soft-keywords"},{"include":"#hard-keywords"},{"include":"#control-keywords"}]},"lambda-arrow":{"match":"->","name":"storage.type.function.arrow.kotlin"},"method-reference":{"captures":{"1":{"name":"entity.name.function.reference.kotlin"}},"match":"\\\\??::(\\\\b\\\\w+\\\\b|`[^`]+`)"},"null-literal":{"match":"\\\\bnull\\\\b","name":"constant.language.null.kotlin"},"object":{"captures":{"1":{"name":"keyword.hard.object.kotlin"},"2":{"name":"entity.name.type.object.kotlin"}},"match":"\\\\b(object)(?:\\\\s+(\\\\b\\\\w+\\\\b|`[^`]+`))?"},"operators":{"patterns":[{"match":"(===?|!==?|<=|>=|<|>)","name":"keyword.operator.comparison.kotlin"},{"match":"([+*/%-]=)","name":"keyword.operator.assignment.arithmetic.kotlin"},{"match":"(=)","name":"keyword.operator.assignment.kotlin"},{"match":"([+*/%-])","name":"keyword.operator.arithmetic.kotlin"},{"match":"(!|&&|\\\\|\\\\|)","name":"keyword.operator.logical.kotlin"},{"match":"(--|\\\\+\\\\+)","name":"keyword.operator.increment-decrement.kotlin"},{"match":"(\\\\.\\\\.)","name":"keyword.operator.range.kotlin"}]},"package":{"begin":"\\\\b(package)\\\\b\\\\s*","beginCaptures":{"1":{"name":"keyword.hard.package.kotlin"}},"contentName":"entity.name.package.kotlin","end":";|$","name":"meta.package.kotlin","patterns":[{"include":"#comments"}]},"postfix-modifiers":{"match":"\\\\b(where|by|get|set)\\\\b","name":"storage.modifier.other.kotlin"},"prefix-modifiers":{"match":"\\\\b(abstract|final|enum|open|annotation|sealed|data|override|final|lateinit|private|protected|public|internal|inner|companion|noinline|crossinline|vararg|reified|tailrec|operator|infix|inline|external|const|suspend|value)\\\\b","name":"storage.modifier.other.kotlin"},"self-reference":{"match":"\\\\b(this|super)(@\\\\w+)?\\\\b","name":"variable.language.this.kotlin"},"soft-keywords":{"match":"\\\\b(init|catch|finally|field)\\\\b","name":"keyword.soft.kotlin"},"string":{"begin":"(?<!\\")\\"(?!\\")","end":"\\"","name":"string.quoted.double.kotlin","patterns":[{"match":"\\\\\\\\.","name":"constant.character.escape.kotlin"},{"include":"#string-escape-simple"},{"include":"#string-escape-bracketed"}]},"string-empty":{"match":"(?<!\\")\\"\\"(?!\\")","name":"string.quoted.double.kotlin"},"string-escape-bracketed":{"begin":"(?<!\\\\\\\\)(\\\\$\\\\{)","beginCaptures":{"1":{"name":"punctuation.definition.template-expression.begin"}},"end":"(\\\\})","endCaptures":{"1":{"name":"punctuation.definition.template-expression.end"}},"name":"meta.template.expression.kotlin","patterns":[{"include":"#code"}]},"string-escape-simple":{"match":"(?<!\\\\\\\\)\\\\$\\\\w+\\\\b","name":"variable.string-escape.kotlin"},"string-multiline":{"begin":"\\"\\"\\"","end":"\\"\\"\\"","name":"string.quoted.double.kotlin","patterns":[{"match":"\\\\\\\\.","name":"constant.character.escape.kotlin"},{"include":"#string-escape-simple"},{"include":"#string-escape-bracketed"}]},"type-alias":{"captures":{"1":{"name":"keyword.hard.typealias.kotlin"},"2":{"name":"entity.name.type.kotlin"},"3":{"patterns":[{"include":"#type-parameter"}]}},"match":"\\\\b(typealias)\\\\s+(\\\\b\\\\w+\\\\b|`[^`]+`)\\\\s*(?<GROUP><([^<>]|\\\\g<GROUP>)+>)?"},"type-annotation":{"captures":{"0":{"patterns":[{"include":"#type-parameter"}]}},"match":"(?<![:?]):\\\\s*(\\\\w|\\\\?|\\\\s|->|(?<GROUP>[<(]([^<>()\\"\']|\\\\g<GROUP>)+[)>]))+"},"type-parameter":{"patterns":[{"match":"\\\\b\\\\w+\\\\b","name":"entity.name.type.kotlin"},{"match":"\\\\b(in|out)\\\\b","name":"storage.modifier.kotlin"}]},"unescaped-annotation":{"match":"\\\\b[\\\\w\\\\.]+\\\\b","name":"entity.name.type.annotation.kotlin"},"variable-declaration":{"captures":{"1":{"name":"keyword.hard.kotlin"},"2":{"patterns":[{"include":"#type-parameter"}]}},"match":"\\\\b(val|var)\\\\b\\\\s*(?<GROUP><([^<>]|\\\\g<GROUP>)+>)?"}},"scopeName":"source.kotlin","aliases":["kt","kts"]}'));
var kotlin = [
  lang
];

export { kotlin as default };
