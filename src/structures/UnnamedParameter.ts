import { Text } from './Text'
import { Token } from './Token'

export class UnnamedParameter extends Token {
	public rawValue: Text

	constructor( value: string ) {
		super()
		this.rawValue = new Text( value )
	}

	public get value(): string {
		return this.rawValue.value
	}

	public toString(): string {
		return `|${ this.rawValue }`
	}
}
