import { parse } from '../main'
import type { NodeList } from './utils'
import { Token } from './Token'

export class Text extends Token {
	public rawValue: string

	public constructor( value: string ) {
		super()
		this.rawValue = value
	}

	public get value(): string {
		return this.rawValue.trim()
	}

	public set value( value: string ) {
		if ( this.rawValue.trim().length === 0 && this.rawValue.endsWith( '\n' ) ) {
			const leftTrail = this.rawValue.slice( 0, this.rawValue.length - 1 )
			this.rawValue = `${ leftTrail }${ value }\n`
			return
		}

		const leftTrail = this.rawValue.substr(
			0,
			this.rawValue.length - this.rawValue.trimLeft().length
		)
		const rightTrail = this.rawValue.substr(
			this.rawValue.trimRight().length,
			this.rawValue.length
		)
		this.rawValue = `${ leftTrail }${ value }${ rightTrail }`
	}

	public toString(): string {
		return this.rawValue
	}

	public parse(): NodeList {
		return parse( this.rawValue )
	}
}
