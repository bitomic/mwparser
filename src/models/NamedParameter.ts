import { List, NodeList } from '../utils'
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

	get name(): string { return this.#name.value.trim() }
	set name( name: string ) { this.#name.innerValue = name }

	get value(): NodeList { return this.#value }
	set value( nodes: NodeList ) { this.#value.innerValue = nodes }

	get innerValue(): List<Token> | string { return this.#value.innerValue }
	set innerValue( value: List<Token> | string ) { this.#value.innerValue = value }

	toString(): string {
		return `|${this.#name}=${this.#value}`
	}
}