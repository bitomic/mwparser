import { NodeList } from '../utils'
import { Token } from './_Token'

export class Heading extends Token {
	#value: NodeList
	#level: number

	constructor( { value, level1, level2 }: { value: Token[], level1: string[], level2: string[] } ) {
		super()
		const len1 = level1.length
		const len2 = level2.length
		if ( len1 !== len2 ) throw new Error( 'Unbalanced heading' )

		this.#value = new NodeList( value )
		this.#level = len1
	}

	get level(): number { return this.#level }
	set level( level: number ) { this.#level = level }

	get value(): NodeList { return this.#value }
	set value( nodes: NodeList ) { this.#value = nodes }

	toString(): string {
		const equals = '='.repeat( this.level )
		return `${equals}${this.value}${equals}`
	}
}