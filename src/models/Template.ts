import { ParameterList } from '../utils'
import { TemplateParameter } from './_TemplateParameter'
import { Text } from './Text'
import { Token } from './_Token'

export class Template extends Token {
	#name: Text
	#value: ParameterList
	
	constructor( { name, args }: { name: Text, args?: TemplateParameter[] } ) {
		super()
		this.#name = name
		if ( args ) this.#value = new ParameterList( args )
		else this.#value = new ParameterList( [] )
	}

	get name(): string { return this.#name.value }
	set name( name: string ) { this.#name.value = this.name.replace( this.name.trim(), name ) }

	get parameters(): ParameterList { return this.#value }

	get value(): ParameterList { return this.#value }
	set value( nodes: ParameterList ) { this.#value = nodes }

	toString(): string {
		if ( this.value.length === 0 ) {
			return `{{${this.name}}}`
		} else {
			return `{{${this.name}${this.value}}}`
		}
	}
}