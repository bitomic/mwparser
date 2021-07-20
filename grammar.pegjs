{
	const {
		Heading,
		NamedParameter,
		Template,
		Text,
		UnnamedParameter,
		Wikilink
	} = options
}

Start = Token+
Token = Template / Name / Heading / Wikilink
Name = name:Symbol+ { return new Text( { value: name.join('') } ) }

Template = '{{' name:Name '}}' { return new Template( { name } ) } / '{{' name:Name args:TemplateInterior+ '}}' { return new Template( { name, args } ) }
TemplateInterior = NamedParameter / UnnamedParameter
NamedParameter = '|' name:Name '=' value:Token+ { return new NamedParameter( { name, value } ) }
UnnamedParameter = '|' value:Token+ { return new UnnamedParameter( { value } ) }

Heading = level1:('='+) value:Token+ level2:('='+) { return new Heading( {
	value,
	level1: level1.length,
	level2: level2.length
} ) }

Wikilink = '[[' target:Name ']]' { return new Wikilink( { target } ) } / '[[' target:Name '|' display:Name ']]' { return new Wikilink( { target, display } ) }

Symbol = [^|={}\[\]]