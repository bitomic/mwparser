import { NamedArgument } from './NamedArgument'
import { NodeList } from '../utils'
import { Text } from './Text'
import { Token } from './_Token'
import { UnnamedArgument } from './UnnamedArgument'

type Argument = NamedArgument | UnnamedArgument

export class Template extends Token {
	#name: Text
	value: NodeList<Argument>
	
	constructor( { name, args }: { name: Text, args?: Argument[] } ) {
		super()
		this.#name = name
		if ( args ) this.value = new NodeList( args )
		else this.value = new NodeList( [] )
	}

	get name(): string {
		return this.#name.value
	}

	set name( name: string ) {
		const trimmedName = this.#name.value.trim()
		this.#name.value = this.name.replace( trimmedName, name )
	}

	toString(): string {
		if ( this.value.length === 0 ) {
			return `{{${this.#name}}}`
		} else {
			return `{{${this.#name}${this.value}}}`
		}
	}
}