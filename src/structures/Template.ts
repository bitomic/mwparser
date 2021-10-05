import { NamedParameter } from './NamedParameter'
import { Text } from './Text'
import { Token } from './Token'
import { UnnamedParameter } from './UnnamedParameter'

type Parameter = NamedParameter | UnnamedParameter

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

	public toString(): string {
		return `{{${ this.rawName }${ this.parameters.join( '' ) }}}`
	}
}