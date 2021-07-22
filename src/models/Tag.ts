import { NodeList } from '../utils'
import { TagAttribute } from './TagAttribute'
import { Text } from './Text'
import { Token } from './_Token'

export class Tag extends Token {
	#name: string
	#attributes: TagAttribute[]
	#value: NodeList

	constructor( { attributes, name, value }: { attributes?: TagAttribute[], name: string, value?: NodeList } ) {
		super()
		this.#attributes = attributes ?? []
		this.#name = name
		if ( value ) this.#value = value
		else this.#value = new NodeList( new Text( { value: '' } ) )
	}

	get value(): NodeList { return this.#value }
	set value( value: NodeList ) { this.#value = value }

	assert( name: string ) {
		if ( this.#name.trim() !== name.trim() ) {
			throw new Error( `Attempted to close "${this.#name.trim()}" tag with "${name.trim()}" closing tag.` )
		}
	}

	toString() {
		if ( this.#attributes.length > 0 ) {
			return `<${this.#name} ${this.#attributes.join(' ')}>${this.#value}</${this.#name}>`
		}
		return `<${this.#name}>${this.#value}</${this.#name}>`
	}
}