import 'mocha'
import assert from 'assert'
import { parse } from '../main'
import { NamedParameter, Template } from '../models'

describe( 'Named Parameter', () => {
	const parsed = parse( '{{T| a = 1 }}' )
	const template = parsed.nodes[0] as Template
	const parameter = template.parameters.get( 'a' ) as NamedParameter

	it( 'Name is accessible', () => {
		assert.strictEqual( parameter.name, 'a' )
	} )
	
	it( 'Can set name', () => {
		parameter.name = 'b'
		assert.strictEqual( parameter.name, 'b' )
	} )

	it( 'Representation is updated', () => {
		assert.strictEqual( `${parameter}`, '| b = 1 ' )
	} )

	it( 'Can access value', () => {
		assert.strictEqual( `${parameter.value}`, ' 1 ' )
	} )

	it( 'Can set value', () => {
		parameter.value = parse( '1,000.00 {{Coin}}' )
		assert.strictEqual( `${parameter}`, '| b = 1,000.00 {{Coin}} ' )
	} )
} )