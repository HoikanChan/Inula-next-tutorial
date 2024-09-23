const lang = Object.freeze(JSON.parse('{"displayName":"GDShader","fileTypes":["gdshader"],"name":"gdshader","patterns":[{"include":"#any"}],"repository":{"any":{"patterns":[{"include":"#comment"},{"include":"#enclosed"},{"include":"#classifier"},{"include":"#definition"},{"include":"#keyword"},{"include":"#element"},{"include":"#separator"},{"include":"#operator"}]},"arraySize":{"begin":"\\\\[","captures":{"0":{"name":"punctuation.bracket.gdshader"}},"end":"\\\\]","name":"meta.array-size.gdshader","patterns":[{"include":"#comment"},{"include":"#keyword"},{"include":"#element"},{"include":"#separator"}]},"classifier":{"begin":"(?=\\\\b(?:shader_type|render_mode)\\\\b)","end":"(?<=;)","name":"meta.classifier.gdshader","patterns":[{"include":"#comment"},{"include":"#keyword"},{"include":"#identifierClassification"},{"include":"#separator"}]},"classifierKeyword":{"match":"\\\\b(?:shader_type|render_mode)\\\\b","name":"keyword.language.classifier.gdshader"},"comment":{"patterns":[{"include":"#commentLine"},{"include":"#commentBlock"}]},"commentBlock":{"begin":"/\\\\*","end":"\\\\*/","name":"comment.block.gdshader"},"commentLine":{"begin":"//","end":"$","name":"comment.line.double-slash.gdshader"},"constantFloat":{"match":"\\\\b(?:E|PI|TAU)\\\\b","name":"constant.language.float.gdshader"},"constructor":{"match":"\\\\b[a-zA-Z_]\\\\w*(?=\\\\s*\\\\[\\\\s*\\\\w*\\\\s*\\\\]\\\\s*[(])|\\\\b[A-Z]\\\\w*(?=\\\\s*[(])","name":"entity.name.type.constructor.gdshader"},"controlKeyword":{"match":"\\\\b(?:if|else|do|while|for|continue|break|switch|case|default|return|discard)\\\\b","name":"keyword.control.gdshader"},"definition":{"patterns":[{"include":"#structDefinition"}]},"element":{"patterns":[{"include":"#literalFloat"},{"include":"#literalInt"},{"include":"#literalBool"},{"include":"#identifierType"},{"include":"#constructor"},{"include":"#processorFunction"},{"include":"#identifierFunction"},{"include":"#swizzling"},{"include":"#identifierField"},{"include":"#constantFloat"},{"include":"#languageVariable"},{"include":"#identifierVariable"}]},"enclosed":{"begin":"\\\\(","captures":{"0":{"name":"punctuation.parenthesis.gdshader"}},"end":"\\\\)","name":"meta.parenthesis.gdshader","patterns":[{"include":"#any"}]},"fieldDefinition":{"begin":"\\\\b[a-zA-Z_]\\\\w*\\\\b","beginCaptures":{"0":{"patterns":[{"include":"#typeKeyword"},{"match":".+","name":"entity.name.type.gdshader"}]}},"end":"(?<=;)","name":"meta.definition.field.gdshader","patterns":[{"include":"#comment"},{"include":"#keyword"},{"include":"#arraySize"},{"include":"#fieldName"},{"include":"#any"}]},"fieldName":{"match":"\\\\b[a-zA-Z_]\\\\w*\\\\b","name":"entity.name.variable.field.gdshader"},"hintKeyword":{"match":"\\\\b(?:source_color|hint_(?:color|range|(?:black_)?albedo|normal|(?:default_)?(?:white|black)|aniso|anisotropy|roughness_(?:[rgba]|normal|gray))|filter_(?:nearest|linear)(?:_mipmap(?:_anisotropic)?)?|repeat_(?:en|dis)able)\\\\b","name":"support.type.annotation.gdshader"},"identifierClassification":{"match":"\\\\b[a-z_]+\\\\b","name":"entity.other.inherited-class.gdshader"},"identifierField":{"captures":{"1":{"name":"punctuation.accessor.gdshader"},"2":{"name":"entity.name.variable.field.gdshader"}},"match":"([.])\\\\s*([a-zA-Z_]\\\\w*)\\\\b(?!\\\\s*\\\\()"},"identifierFunction":{"match":"\\\\b[a-zA-Z_]\\\\w*(?=(?:\\\\s|/\\\\*(?:\\\\*(?!/)|[^*])*\\\\*/)*[(])","name":"entity.name.function.gdshader"},"identifierType":{"match":"\\\\b[a-zA-Z_]\\\\w*(?=(?:\\\\s*\\\\[\\\\s*\\\\w*\\\\s*\\\\])?\\\\s+[a-zA-Z_]\\\\w*\\\\b)","name":"entity.name.type.gdshader"},"identifierVariable":{"match":"\\\\b[a-zA-Z_]\\\\w*\\\\b","name":"variable.name.gdshader"},"keyword":{"patterns":[{"include":"#classifierKeyword"},{"include":"#structKeyword"},{"include":"#controlKeyword"},{"include":"#modifierKeyword"},{"include":"#precisionKeyword"},{"include":"#typeKeyword"},{"include":"#hintKeyword"}]},"languageVariable":{"match":"\\\\b(?:[A-Z][A-Z_0-9]*)\\\\b","name":"variable.language.gdshader"},"literalBool":{"match":"\\\\b(?:false|true)\\\\b","name":"constant.language.boolean.gdshader"},"literalFloat":{"match":"\\\\b(?:\\\\d+[eE][-+]?\\\\d+|(?:\\\\d*[.]\\\\d+|\\\\d+[.])(?:[eE][-+]?\\\\d+)?)[fF]?","name":"constant.numeric.float.gdshader"},"literalInt":{"match":"\\\\b(?:0[xX][0-9A-Fa-f]+|\\\\d+[uU]?)\\\\b","name":"constant.numeric.integer.gdshader"},"modifierKeyword":{"match":"\\\\b(?:const|global|instance|uniform|varying|in|out|inout|flat|smooth)\\\\b","name":"storage.modifier.gdshader"},"operator":{"match":"<<=?|>>=?|[-+*/&|<>=!]=|\\\\&\\\\&|[|][|]|[-+~!*/%<>&^|=]","name":"keyword.operator.gdshader"},"precisionKeyword":{"match":"\\\\b(?:low|medium|high)p\\\\b","name":"storage.type.built-in.primitive.precision.gdshader"},"processorFunction":{"match":"\\\\b(?:vertex|fragment|light|start|process|sky|fog)(?=(?:\\\\s|/\\\\*(?:\\\\*(?!/)|[^*])*\\\\*/)*[(])","name":"support.function.gdshader"},"separator":{"patterns":[{"match":"[.]","name":"punctuation.accessor.gdshader"},{"include":"#separatorComma"},{"match":"[;]","name":"punctuation.terminator.statement.gdshader"},{"match":"[:]","name":"keyword.operator.type.annotation.gdshader"}]},"separatorComma":{"match":"[,]","name":"punctuation.separator.comma.gdshader"},"structDefinition":{"begin":"(?=\\\\b(?:struct)\\\\b)","end":"(?<=;)","patterns":[{"include":"#comment"},{"include":"#keyword"},{"include":"#structName"},{"include":"#structDefinitionBlock"},{"include":"#separator"}]},"structDefinitionBlock":{"begin":"\\\\{","captures":{"0":{"name":"punctuation.definition.block.struct.gdshader"}},"end":"\\\\}","name":"meta.definition.block.struct.gdshader","patterns":[{"include":"#comment"},{"include":"#precisionKeyword"},{"include":"#fieldDefinition"},{"include":"#keyword"},{"include":"#any"}]},"structKeyword":{"match":"\\\\b(?:struct)\\\\b","name":"keyword.other.struct.gdshader"},"structName":{"match":"\\\\b[a-zA-Z_]\\\\w*\\\\b","name":"entity.name.type.struct.gdshader"},"swizzling":{"captures":{"1":{"name":"punctuation.accessor.gdshader"},"2":{"name":"variable.other.property.gdshader"}},"match":"([.])\\\\s*([xyzw]{2,4}|[rgba]{2,4}|[stpq]{2,4})\\\\b"},"typeKeyword":{"match":"\\\\b(?:void|bool|[biu]?vec[234]|u?int|float|mat[234]|[iu]?sampler(?:3D|2D(?:Array)?)|samplerCube)\\\\b","name":"support.type.gdshader"}},"scopeName":"source.gdshader"}'));
var gdshader = [
  lang
];

export { gdshader as default };
