import { List } from './List'
import { Template, Token } from '../models'
import { TemplateList } from './TemplateList'

export class NodeList<T extends Token = Token> extends List<T> {
	constructor( nodes: T | T[] ) {
		super( nodes )
	}

	filter<U = T>( fn: ( token: T ) => boolean, recursive = false ): U[] {
		const result: U[] = []

		const iterator = recursive ? this.iterateRecursively() : this[Symbol.iterator]()
		
		for ( const node of iterator ) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if ( fn( node ) ) result.push( node )
		}

		return result
	}

	find<U = T>( fn: ( token: T ) => boolean, recursive = false ): U | undefined {
		const iterator = recursive ? this.iterateRecursively() : this[Symbol.iterator]()

		for ( const node of iterator ) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if ( fn( node ) ) return node
		}
	}

	getTemplates(): TemplateList {
		const templates = this.filter<Template>( token => token instanceof Template, true )
		return new TemplateList( templates )
	}
}