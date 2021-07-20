import { List } from './List'
import { Template, Text, Token } from '../../models'
import { TemplateList } from './TemplateList'

export class NodeList<T extends Token = Token> extends List<T> {
	constructor( nodes: T | T[] ) {
		super( nodes )
	}

	get templates(): TemplateList {
		const templates = this.filter<Template>( token => token instanceof Template, true )
		return new TemplateList( templates )
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

	set innerValue( _nodeList: List<T> | string ) {
		const nodeList = typeof _nodeList === 'string'
			?  new NodeList<T>( new Text( { value: _nodeList } ) as unknown as T )
			: _nodeList

		if ( this.nodes.length === 0 ) {
			this.nodes = nodeList.nodes
		}

		const firstNode = this.nodes[0]
		const lastNode = this.nodes[ this.nodes.length - 1 ]

		const leftText = firstNode instanceof Text ? firstNode : undefined
		const rightText = lastNode instanceof Text ? lastNode : undefined

		const leftTrim = leftText
			? leftText.value.substring(
				0,
				leftText.value.length - leftText.value.trimLeft().length
			)
			: ''
		const rightTrim = rightText
			? rightText.value.substring(
				rightText.value.trimRight().length,
				rightText.value.length
			)
			: ''
		
		this.nodes = nodeList.nodes

		if ( leftTrim.length > 0 ) {
			this.nodes.unshift( new Text( { value: leftTrim } ) as unknown as T )
		}
		if ( rightTrim.length > 0 ) {
			this.nodes.push( new Text( { value: rightTrim } ) as unknown as T )
		}
	}

	set fullValue( _nodeList: List<T> | string ) {
		const nodeList = typeof _nodeList === 'string'
			? new NodeList<T>( new Text( { value: _nodeList } ) as unknown as T )
			: _nodeList
		this.nodes = nodeList.nodes
	}
}