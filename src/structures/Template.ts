import { NamedParameter } from './NamedParameter'
import { Text } from './Text'
import { Token } from './Token'
import { UnnamedParameter } from './UnnamedParameter'

export type Parameter = NamedParameter | UnnamedParameter

export class Template extends Token {
	public rawName: Text
	public parameters: Parameter[]

	public constructor( name: string, ...parameters: Parameter[] ) {
		super()
		this.rawName = new Text( name )
		this.parameters = parameters
	}

	public get name(): string {
		return this.rawName.value
	}

	public set name( name: string ) {
		this.rawName.value = name
	}

	private getNamedPositionals(): Set<number> {
		const namedParameters = this.parameters
			.filter( parameter => {
				if ( !( parameter instanceof NamedParameter ) ) return false
				const index = Number( parameter.name )
				return !isNaN( index )
			} ) as NamedParameter[]
		const indexes = namedParameters.map( parameter => Number( parameter.name ) )

		return new Set( indexes )
	}

	public getParameter( name: string | number ): Parameter | null {
		const named = this.parameters.find( parameter => {
			return parameter instanceof NamedParameter && parameter.name === `${ name }`
		} )
		if ( named ) return named as NamedParameter

		const namedPositionals = this.getNamedPositionals()
		const position = Number( name )
		if ( isNaN( position ) ) return null
		let counter = 1
		for ( const parameter of this.parameters ) {
			if ( !(parameter instanceof UnnamedParameter) ) continue
			while ( namedPositionals.has( counter ) ) counter++
			if ( counter > position ) break
			if ( counter === position ) return parameter
		}

		return null
	}

	public prettify(): void {
		this.rawName.rawValue = `${ this.name }\n`
		let maxLength = 0
		for ( const parameter of this.parameters ) {
			if ( parameter instanceof NamedParameter && parameter.name.length > maxLength ) {
				maxLength = parameter.name.length
			}
		}

		for ( const parameter of this.parameters ) {
			if ( parameter instanceof NamedParameter ) {
				const spaces = ' '.repeat( maxLength - parameter.name.length + 1 )
				parameter.rawName.rawValue = ` ${ parameter.name }${ spaces }`
				parameter.rawValue.rawValue = ` ${ parameter.value }\n`
			} else {
				parameter.rawValue.rawValue = ` ${ parameter.value }\n`
			}
		}
	}

	public toString(): string {
		return `{{${ this.rawName }${ this.parameters.join( '' ) }}}`
	}
}