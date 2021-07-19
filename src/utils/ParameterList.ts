import { List } from './List'
import { NamedParameter, TemplateParameter, UnnamedParameter } from '../models'

export class ParameterList extends List<TemplateParameter> {
	constructor( nodes: TemplateParameter | TemplateParameter[] ) {
		super( nodes )
	}

	// TODO: Handle templates that mixes named and unnamed positional parameters, e.g.:
	// {{Template|Hello|2=Good-bye}}
	// {{Template|Hello|3=Good-bye}}
	get( key: string ): NamedParameter | undefined
	get( key: number ): UnnamedParameter | undefined
	get( key: string | number ): TemplateParameter | undefined {
		if ( typeof key === 'string' ) {
			for ( const node of this.nodes ) {
				if ( node.name?.trim() === key ) return node
			}
		} else if ( typeof key === 'number' ) {
			let counter = 1
			for ( const node of this.nodes ) {
				if ( node instanceof NamedParameter ) continue
				if ( counter === key ) return node
				counter++
			}
		}
		
		return undefined
	}
}