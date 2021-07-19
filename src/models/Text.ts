import { Token } from './_Token'

export class Text extends Token {
	value: string

	constructor( { value }: { value: string } ) {
		super()
		this.value = value
	}

	toString(): string {
		return this.value
	}
}