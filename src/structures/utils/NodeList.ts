import { Template } from '../Template'
import { Token } from '../Token'

export class NodeList<T extends Token = Token> {
	public nodes: T[]

	constructor( ...nodes: T[] ) {
		this.nodes = nodes
	}

	public findTemplate( name: string ): NodeList<Template> {
		const underscored = name.trim().replace( / /g, '_' )
		const nodes: Template[] = []

		for ( const node of this.nodes ) {
			if ( node instanceof Template && ( node.name === name || node.name === underscored ) ) {
				nodes.push( node )
			}
		}

		return new NodeList( ...nodes )
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