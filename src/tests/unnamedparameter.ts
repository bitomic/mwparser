import 'mocha'
import assert from 'assert'
import { parse, Template, UnnamedParameter } from '../main'

describe( 'Unnamed Parameter', () => {
	const parsed = parse( '{{T|foo| bar }}' )
	const template = parsed.templates.find( 'T' )[0]
	const parameter1 = template.parameters.get( 1 )!
	const parameter2 = template.parameters.get( 2 )!
	
	it( 'Value is accessible', () => {
		assert.strictEqual( `${parameter1.value}`, 'foo' )
		assert.strictEqual( `${parameter2.value}`, ' bar ' )
	} )
} )