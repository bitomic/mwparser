import { Token } from '../../models'

export abstract class List<T extends Token> {
	nodes: T[]

	constructor( nodes: T | T[] ) {
		if ( Array.isArray( nodes ) ) this.nodes = nodes
		else this.nodes = [ nodes ]
	}

	get length(): number { return this.nodes.length }

	toString(): string {
		return `${this.nodes.join('')}`
	}

	*[Symbol.iterator](): Generator<T, void, unknown> {
		for ( const node of this.nodes ) yield node
	}

	*iterateRecursively(): Generator<T, void, unknown> {
		const nodes = [ ...this.nodes ]

		while ( nodes.length !== 0 ) {
			const node = nodes.shift()
			if ( !node ) break

			yield node
			
			const subnodes = node.value
			if ( !( subnodes instanceof List ) ) continue
			for ( const subnode of subnodes ) {
				nodes.push( subnode as unknown as T )
			}
		}
	}
}