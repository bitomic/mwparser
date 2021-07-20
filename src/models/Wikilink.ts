import { Text } from './Text'
import { Token } from './_Token'

export class Wikilink extends Token {
	#target: Text
	#display?: Text

	constructor( { display, target }: { display?: Text, target: Text } ) {
		super()
		this.#target = target
		this.#display = display
	}

	set display( display: string ) { this.#display = new Text( { value: display } ) }
	get display(): string { return `${this.#display}` }

	set target( target: string ) { this.#target = new Text( { value: target } ) }
	get target(): string { return `${this.#target}` }

	get value(): string { return `${this.#target}` }

	toString(): string {
		if ( this.#display ) return `[[${this.#target}|${this.#display}]]`
		else return `[[${this.#target}]]`
	}
}