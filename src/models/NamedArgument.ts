import { NodeList } from '../utils'
import { TemplateArgument } from './_TemplateArgument'
import { Token } from './_Token'

export class NamedArgument extends TemplateArgument {
	name: string
	value: NodeList
	
	constructor( { name, value }: { name: string, value: Token[] } ) {
		super()
		this.name = name
		this.value = new NodeList( value )
	}

	toString(): string {
		return `|${this.name}=${this.value}`
	}
}