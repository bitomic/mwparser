import { NodeList } from '../utils'
import { TemplateArgument } from './_TemplateArgument'
import { Token } from './_Token'

export class UnnamedArgument extends TemplateArgument {
	#value: NodeList

	constructor( { value }: { value: Token[] } ) {
		super()
		this.#value = new NodeList( value )
	}

	get value(): NodeList { return this.#value }
	set value( nodes: NodeList ) { this.#value = nodes }

	toString(): string {
		return `|${this.value}`
	}
}