import { NamedParameter, Template } from '../../models'
import { List } from './List'

export class TemplateList extends List<Template> {
	constructor( nodes: Template | Template[] ) {
		super( nodes )
	}

	find( name: string ): Template[] {
		const result: Template[] = []

		for ( const node of this.nodes ) {
			if ( node.name === name ) result.push( node )
		}

		return result
	}

	findParameter( name: string ): NamedParameter[] {
		const result: NamedParameter[] = []

		for ( const node of this.nodes ) {
			const parameter = node.parameters.get( name )
			if ( parameter ) result.push( parameter )
		}

		return result
	}

	rename( from: string, to: string ): void {
		for ( const node of this.nodes ) {
			if ( node.name === from ) node.name = to
		}
	}
}