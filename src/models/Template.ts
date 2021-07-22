import { ParameterList } from '../utils'
import { TemplateParameter } from './_TemplateParameter'
import { Token } from './_Token'
import { untrimmedReplace } from '../utils'

export class Template extends Token {
	#name: string
	#value: ParameterList
	
	constructor( { name, args }: { name: string, args?: TemplateParameter[] } ) {
		super()
		this.#name = name
		if ( args ) this.#value = new ParameterList( args )
		else this.#value = new ParameterList( [] )
	}

	get name(): string { return this.#name.trim() }
	set name( name: string ) { this.#name = untrimmedReplace( this.#name, name ) }

	get parameters(): ParameterList { return this.#value }

	get value(): ParameterList { return this.#value }
	set value( nodes: ParameterList ) { this.#value = nodes }

	toString(): string {
		if ( this.value.length === 0 ) {
			return `{{${this.#name}}}`
		} else {
			return `{{${this.#name}${this.#value}}}`
		}
	}
}