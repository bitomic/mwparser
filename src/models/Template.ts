import { NodeList } from '../utils'
import { TemplateParameter } from './_TemplateParameter'
import { Text } from './Text'
import { Token } from './_Token'

export class Template extends Token {
	#name: Text
	#value: NodeList<TemplateParameter>
	
	constructor( { name, args }: { name: Text, args?: TemplateParameter[] } ) {
		super()
		this.#name = name
		if ( args ) this.#value = new NodeList( args )
		else this.#value = new NodeList( [] )
	}

	get name(): string { return this.#name.value }
	set name( name: string ) { this.#name.value = this.name.replace( this.name.trim(), name ) }

	get value() { return this.#value }
	set value( nodes: NodeList<TemplateParameter> ) { this.#value = nodes }

	toString(): string {
		if ( this.value.length === 0 ) {
			return `{{${this.name}}}`
		} else {
			return `{{${this.name}${this.value}}}`
		}
	}
}