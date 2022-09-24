import { Text } from './Text'
import { Token } from './Token'

export class Wikilink extends Token {
	public display?: Text
	public target: Text

	public constructor( target: string, display?: string ) {
		super()
		this.target = new Text( target )
		if ( display ) this.display = new Text( display )
	}

	public toString(): string {
		if ( this.display ) return `[[${ this.target }|${ this.display }]]`
		return `[[${ this.target }]]`
	}
}
