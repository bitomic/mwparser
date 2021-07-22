import { Token } from './_Token'

export class TagAttribute extends Token {
	#name: string
	#value: string

	constructor( { name, value }: { name: string, value: string } ) {
		super()
		this.#name = name
		this.#value = value
	}

	get value(): string { return this.#value.trim() }

	toString() {
		return `${this.#name}=${this.#value}`
	}
}