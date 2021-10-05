{
	const Model = options
}

Start
	= ( Token / UnusedToken )+
Token
	= Template
	/ Wikilink
	/ Text
Symbol
	= [^[\]{}]
UnusedToken
	= value:( ( !Token ) . )+ {
		value = value.map( i => i[1] ).flat().join('')
		return new Model.Text( value )
	}

Text
	= text:Symbol+ {
		return new Model.Text( text.join( '' ) )
	}

Wikilink
	= ( '[[' target:[^|\]]* '|' display:[^\]]* ']]' { return new Model.Wikilink( target.join( '' ), display.join( '' ) ) }
		/ '[[' target:[^\]]* ']]' { return new Model.Wikilink( target.join( '' ) ) } )

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
	= '|' value:( Template / [^|}] )* {
		return new Model.UnnamedParameter( value.join( '' ) )
	}