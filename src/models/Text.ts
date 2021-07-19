import { Token } from './_Token'

export class Text extends Token {
	#value: string

	constructor( { value }: { value: string } ) {
		super()
		this.#value = value
	}

	get value(): string { return this.#value }
	set value( text: string ) { this.#value = text }

	toString(): string {
		return this.value
	}
}