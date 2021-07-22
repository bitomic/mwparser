{
	const Model = options
}

Start
	= ( Token / UnusedToken )+
Symbol
	= [^|={}\[\]<>]
Token
	= Template
	/ Gallery
	/ Math
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

// Tokens
Gallery
	= '<gallery' details:_GalleryUntilTerminator '</gallery>' {
		details = details.map( i => i[1] ).join('')
		return new Model.Text( {
			value: `<gallery${details}</gallery>`
		} )
	}
_GalleryUntilTerminator
	= ( &_GalleryTerminatorAhead [^<] )*
_GalleryTerminatorAhead
	= . (!'<' .)* '<'

Math
	= '<math' details:_MathUntilTerminator '</math>' {
		details = details.map( i => i[1] ).join('')
		return new Model.Text( {
			value: `<math${details}</math>`
		} )
	}
_MathUntilTerminator
	= ( &_MathTerminatorAhead . )*
_MathTerminatorAhead
	= . (!'</math>' .)* '</math>'

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
	= '|' name:[^=]+ '=' value:Token+ {
		return new Model.NamedParameter( {
			name: new Model.Text( { value: name.join('') } ),
			value
		} )
	}
TemplateParameterUnnamed
	= '|' value:Token+ {
		return new Model.UnnamedParameter( {
			value
		} )
	}

Text
	= symbols:Symbol+ {
		return new Model.Text( { value: symbols.join('') } )
	}