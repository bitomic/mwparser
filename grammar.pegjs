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
Token = ExternalLink / URL / Template / Wikitable / Math / Heading / Wikilink / File / GalleryItem / Name
Name = name:(!'<math>' Symbol)+ { return new Text( { value: name.flat().join('') } ) }
Symbol = [^|={}\[\]]
URL = 'http' host:[^? ]+ qs:( '?' ( [^= ]+ '=' [^& ]+ )+ )? {
	if ( qs ) return new Text( { value: `http${host.join('')}${qs.flat(3).join('')}` } )
	return new Text( { value: `http${host.join('')}` } )
}

Template = '{{' name:Name '}}' { return new Template( { name } ) } / '{{' name:Name args:TemplateInterior+ '}}' { return new Template( { name, args } ) }
TemplateInterior = NamedParameter / UnnamedParameter
NamedParameter = '|' name:Name '=' value:Token+ { return new NamedParameter( { name, value } ) }
UnnamedParameter = '|' value:Token+ { return new UnnamedParameter( { value } ) }

File = '[[' name:Name extra:('|' Name)+ ']]' { return new Text( { value: `[[${name}${extra.flat().join('')}]]` } ) }

Heading = level1:('='+) value:Token+ level2:('='+) { return new Heading( {
	value,
	level1: level1.length,
	level2: level2.length
} ) }

Wikilink = '[[' target:Name ']]' { return new Wikilink( { target } ) } / '[[' target:Name '|' display:Name ']]' { return new Wikilink( { target, display } ) }
ExternalLink = '[' URL Name ']' / '[' URL ']'

GalleryItem = value:( '\n' [^|{}\[\]]+ '|' [^\n]+ ) { return new Text( { value: value.flat(2).join('') } ) }

Wikitable = '{|' tablecontent:(Token / '|' [^}] )+ '|}' { return new Text( { value: `{|${tablecontent.flat().join('')}|}` } ) }
Math = '<math>' content:( !'</math>' . )* '</math>' { return new Text( { value: `<math>${content.flat().join('')}</math>` } ) }