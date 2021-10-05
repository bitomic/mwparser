import { Text } from './Text'
import { Token } from './Token'

export class NamedParameter extends Token {
	public rawName: Text
	public rawValue: Text

	constructor( name: string, value: string ) {
		super()
		this.rawName = new Text( name )
		this.rawValue = new Text( value )
	}

	public get name(): string {
		return this.rawName.value
	}
	public set name( name: string ) {
		this.rawName.value = name
	}

	public get value(): string {
		return this.rawValue.value
	}
	public set value( value: string ) {
		this.rawValue.value = value
	}

	toString(): string {
		return `|${ this.rawName }=${ this.rawValue }`
	}
}