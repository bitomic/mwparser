{
	const Model = options
}

Start
	= ( Token / UnusedToken )+
Symbol
	= [^|={}]
Token
	= Template
	/ Text

// Utilities
RawText
	= symbols:Symbol+ { return symbols.join('') }
UnusedToken
	= value:( ( !Token ) . )+ {
		value = value.map( i => i[1] ).flat().join('')
		return new Model.Text( { value: value } )
	}
_S
	= ' '*

Template
	= '{{' name:[^|}]+ args:TemplateParameter* '}}' {
		name = name.join('')
		return new Model.Template( {
			name,
			args
		} )
	}
TemplateParameter
	= TemplateParameterNamed
	/ TemplateParameterUnnamed
TemplateParameterNamed
	= '|' name:[^=|]+ '=' value:Token* {
		return new Model.NamedParameter( {
			name: new Model.Text( { value: name.join('') } ),
			value
		} )
	}
TemplateParameterUnnamed
	= '|' value:Token* {
		return new Model.UnnamedParameter( {
			value
		} )
	}

Text
	= symbols:Symbol+ {
		return new Model.Text( { value: symbols.join('') } )
	}