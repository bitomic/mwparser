import { parse } from '../main'
import { NodeList } from './utils'
import { Token } from './Token'

export class Text extends Token {
	public rawValue: string

	constructor( value: string ) {
		super()
		this.rawValue = value
	}

	public get value(): string {
		return this.rawValue.trim()
	}

	public toString(): string {
		return this.rawValue
	}

	public parse(): NodeList {
		return parse( this.rawValue )
	}
}