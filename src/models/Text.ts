import { Token } from './_Token'

export class Text extends Token {
	#value: string

	constructor( { value }: { value: string } ) {
		super()
		this.#value = value
	}

	get value(): string { return this.#value }
	set value( text: string ) { this.#value = text }

	get innerValue(): string { return this.#value.trim() }
	set innerValue( text: string ) {
		const leftTrim = this.#value.substring(
			0,
			this.#value.length - this.#value.trimLeft().length
		)
		const rightTrim = this.#value.substring(
			this.#value.trimRight().length,
			this.#value.length
		)

		this.#value = `${leftTrim}${text}${rightTrim}`
	}

	toString(): string {
		return this.value
	}
}