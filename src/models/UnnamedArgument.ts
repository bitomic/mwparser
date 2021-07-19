import { NodeList } from '../utils'
import { TemplateArgument } from './_TemplateArgument'
import { Token } from './_Token'

export class UnnamedArgument extends TemplateArgument {
	value: NodeList

	constructor( { value }: { value: Token[] } ) {
		super()
		this.value = new NodeList( value )
	}

	toString(): string {
		return `|${this.value}`
	}
}