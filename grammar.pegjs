{
	const Model = options
}

Start
	= ( Token / UnusedToken )+
Symbol
	= [^|={}\[\]<>]
Token
	= Template
	/ Wikilink
	/ ExternalLink
	/ Gallery
	/ Math
	/ Wikitable
	/ Tag
	/ Heading
	/ Text

// Utilities
RawText
	= symbols:Symbol+ { return symbols.join('') }
UnusedToken
	= value:( ( !Token ) . )+ {
		return new Model.Text( { value: value.join('') } )
	}
_S
	= ' '*

// Tokens
ExternalLink
	= '[' target:([^ \]])+ ' ' display:([^\]]) ']' {
		return new Model.ExternalLink( { target, display } )
	}
	/ '[' target:([^ \]]) ']' {
		return new Model.ExternalLink( { target } )
	}

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

Heading
	= left:('=' '='+) value:Token+ right:('=' '='+) {
		return new Model.Heading( {
			level1: left.length,
			level2: right.length,
			value
		} )
	}

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

Tag
	= open:TagOpen content:Token* close:TagClose {
		open.value = content
		open.assert( close )
		return open
	}
TagOpen
	= '<' _S name:( [^ >]+ ) attributes:( TagAttribute* ) _S '>' {
		name = name.join('')
		return new Model.Tag( { attributes, name } )
	}
TagAttribute
	= _S name:( [^= ]+ ) _S '=' _S value:('"' [^"]+ '"') {
		name = name.flat().join('')
		value = value.flat().join('')
		return new Model.TagAttribute( { name, value } )
	}
TagClose
	= '</' _S name:( [^ >]+ ) _S '>' { return name.join('') }

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

Wikilink
	= '[[' target:([^|\]])+ '|' display:([^|\]])+ ']]' {
		target = target.join('')
		display = display.join('')
		return new Model.Wikilink( { target, display } )
	}
	/ '[[' target:([^\]])+ ']]' {
		target = target.join('')
		return new Model.Wikilink( { target } )
	}

Wikitable
	= '{|' details:_WikitableUntilTerminator '|}' {
		details = details.map( i => i[1] ).join('')
		return new Model.Text( {
			value: `{|${details}|}`
		} )
	}
_WikitableUntilTerminator
	= ( &_WikitableTerminatorAhead . )*
_WikitableTerminatorAhead
	= . (!'|}' .)* '|}'