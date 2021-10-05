{
	const Model = options
}

Start
	= ( Token / UnusedToken )+
Token
	= Template
	/ Text
Symbol
	= [^[\]{}]
UnusedToken
	= value:( ( !Token ) . )+ {
		value = value.map( i => i[1] ).flat().join('')
		return new Model.Text( { value: value } )
	}

Text
	= text:Symbol+ {
		return new Model.Text( text.join( '' ) )
	}

Template
	= '{{' name:[^|}]+ args:TemplateParameter* '}}' {
		name = name.join('')
		return new Model.Template( name, ...args )
	}
TemplateParameter
	= TemplateParameterNamed
	/ TemplateParameterUnnamed
TemplateParameterNamed
	= '|' name:[^=|]* '=' value:( Template / [^|}] )* {
		return new Model.NamedParameter( name.join( '' ), value.join( '' ) )
	}
TemplateParameterUnnamed
	= '|' value:[^|}]* {
		return new Model.UnnamedParameter( value.join( '' ) )
	}