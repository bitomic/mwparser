import { type Parameter, Template } from '../Template'
import { LanguageCodes } from './LanguageCodes'
import { Text } from '../Text'
import type { Token } from '../Token'
import { Wikilink } from '../Wikilink'

export class NodeList<T extends Token = Token> {
	public nodes: T[] = []

	public constructor( ...nodes: T[] ) {
		for ( const node of nodes ) {
			const last = this.nodes[ this.nodes.length - 1 ]
			if ( last instanceof Text && node instanceof Text ) {
				last.rawValue += node.rawValue
			} else {
				this.nodes.push( node )
			}
		}
	}

	public getInterwikis( ...langs: string[] ): NodeList<Wikilink> {
		const codes = langs.length > 0 ? new Set( langs ) : LanguageCodes
		const nodes = this.links.nodes.filter( node => {
			if ( !node.target.value.search( ':' ) ) return false
			const [ code ] = node.target.value.split( ':' )
			return codes.has( code ?? '' )
		} )
		return new NodeList( ...nodes )
	}

	public findParameter( name: string ): Parameter[] {
		const parameters: Parameter[] = []
		for ( const template of this.templates ) {
			const parameter = template.getParameter( name )
			if ( parameter ) parameters.push( parameter )
		}
		return parameters
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

	public get links(): NodeList<Wikilink> {
		const nodes: Wikilink[] = []
		for ( const node of this.nodes ) {
			if ( node instanceof Wikilink ) nodes.push( node )
		}
		return new NodeList( ...nodes )
	}

	public get templates(): Template[] {
		const nodes: Template[] = []
		for ( const node of this.nodes ) {
			if ( node instanceof Template ) nodes.push( node )
		}
		return nodes
	}

	public toString(): string {
		return this.nodes.map( i => i.toString() ).join( '' )
	}
}
