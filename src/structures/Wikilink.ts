import { Text } from './Text'
import { Token } from './Token'

export class Wikilink extends Token {
	public display?: string
	public target: string

	constructor( target: string, display?: string ) {
		super()
		this.target = target
		this.display = display
	}

	public toString(): string {
		if ( this.display ) return `[[${ this.target }|${ this.display }]]`
		return `[[${ this.target }]]`
	}
}
