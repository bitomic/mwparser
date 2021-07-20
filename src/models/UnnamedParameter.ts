import { NodeList } from '../utils'
import { TemplateParameter } from './_TemplateParameter'
import { Token } from './_Token'

export class UnnamedParameter extends TemplateParameter {
	#value: NodeList

	constructor( { value }: { value: Token[] } ) {
		super()
		this.#value = new NodeList( value )
	}

	get name(): undefined { return undefined }

	get value(): NodeList { return this.#value }
	set value( nodes: NodeList ) { this.#value.innerValue = nodes }

	toString(): string {
		return `|${this.value}`
	}
}