import { Token } from './_Token'

export class ExternalLink extends Token {
	#target: string
	#display?: string

	constructor( { display, target }: { display?: string, target: string } ) {
		super()
		this.#target = target
		this.#display = display
	}

	set display( display: string ) { this.#display = display }
	get display(): string { return this.#display || this.#target }

	set target( target: string ) { this.#target = target }
	get target(): string { return this.#target }

	get value(): string { return this.#target }

	toString(): string {
		if ( this.#display ) return `[${this.#target} ${this.#display}]`
		else return `[${this.#target}]`
	}
}