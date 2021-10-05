import { Token } from '../Token'

export class NodeList<T extends Token = Token> {
	public nodes: T[]

	constructor( ...nodes: T[] ) {
		this.nodes = nodes
	}

	public toString(): string {
		return this.nodes.map( i => i.toString() ).join( '' )
	}
}