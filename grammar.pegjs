{
	const {
		Heading,
		NamedArgument,
		Template,
		Text,
		UnnamedArgument
	} = options
}

Start = Token+
Token = Template / Name / Heading
Name = name:Symbol+ { return new Text( { value: name.join('') } ) }

Template = '{{' name:Name '}}' { return new Template( { name } ) } / '{{' name:Name args:TemplateInterior+ '}}' { return new Template( { name, args } ) }
TemplateInterior = NamedArgument / UnnamedArgument
NamedArgument = '|' name:Name '=' value:Token+ { return new NamedArgument( { name, value } ) }
UnnamedArgument = '|' value:Token+ { return new UnnamedArgument( { value } ) }

Heading = level1:('='+) value:Token+ level2:('='+) { return new Heading( { value, level1, level2 } ) }

Symbol = [^|={}]