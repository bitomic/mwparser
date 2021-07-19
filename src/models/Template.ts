import { NamedArgument } from './NamedArgument'
import { NodeList } from '../utils'
import { Token } from './_Token'
import { UnnamedArgument } from './UnnamedArgument'

type Argument = NamedArgument | UnnamedArgument

export class Template extends Token {
	name: string
	value: NodeList<Argument>
	
	constructor( { name, args }: { name: string, args?: Argument[] } ) {
		super()
		this.name = name
		if ( args ) this.value = new NodeList( args )
		else this.value = new NodeList( [] )
	}

	toString(): string {
		if ( this.value.length === 0 ) {
			return `{{${this.name}}}`
		} else {
			return `{{${this.name}${this.value}}}`
		}
	}
}