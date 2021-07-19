import { Template, Token } from '../models'

export class NodeList<T extends Token = Token> {
	nodes: T[]

	constructor( nodes: T | T[] ) {
		if ( Array.isArray( nodes ) ) this.nodes = nodes
		else this.nodes = [ nodes ]
	}

	get length(): number { return this.nodes.length }

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

	getTemplates(): Template[] {
		return this.filter<Template>( token => token instanceof Template, true )
	}

	toString(): string {
		return `${this.nodes.join('')}`
	}

	*[Symbol.iterator](): Generator<T, void, unknown> {
		for ( const node of this.nodes ) yield node
	}

	*iterateRecursively(): Generator<T, void, unknown> {
		const nodes = this.nodes

		while ( nodes.length !== 0 ) {
			const node = nodes.shift()
			if ( !node ) break

			yield node
			
			const subnodes = node.value
			if ( !( subnodes instanceof NodeList ) ) continue
			for ( const subnode of subnodes ) {
				nodes.push( subnode as T )
			}
		}
	}
}