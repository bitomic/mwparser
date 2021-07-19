import { NodeList } from '../utils'
import { TemplateParameter } from './_TemplateParameter'
import { Text } from './Text'
import { Token } from './_Token'

export class NamedParameter extends TemplateParameter {
	#name: Text
	#value: NodeList
	
	constructor( { name, value }: { name: Text, value: Token[] } ) {
		super()
		this.#name = name
		this.#value = new NodeList( value )
	}

	get name(): string { return this.#name.value }
	set name( name: string ) { this.#name.value = name }

	get value(): NodeList { return this.#value }
	set value( nodes: NodeList ) { this.#value = nodes }

	toString(): string {
		return `|${this.name}=${this.value}`
	}
}