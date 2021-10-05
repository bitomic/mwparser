import { Template } from '../Template'
import { Text } from '../Text'
import { Token } from '../Token'

export class NodeList<T extends Token = Token> {
	public nodes: T[] = []

	constructor( ...nodes: T[] ) {
		for ( const node of nodes ) {
			const last = this.nodes[ this.nodes.length - 1 ]
			if ( last && last instanceof Text && node instanceof Text ) {
				last.rawValue += node.rawValue
			} else {
				this.nodes.push( node )
			}
		}
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