import { Template } from '../Template'
import { Token } from '../Token'

export class NodeList<T extends Token = Token> {
	public nodes: T[]

	constructor( ...nodes: T[] ) {
		this.nodes = nodes
	}

	public get templates(): NodeList<Template> {
		const nodes: Template[] = []
		for ( const node of this.nodes ) {
			if ( node instanceof Template ) nodes.push( node )
		}
		return new NodeList( ...nodes )
	}

	public toString(): string {
		return this.nodes.map( i => i.toString() ).join( '' )
	}
}