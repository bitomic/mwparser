import 'mocha'
import assert from 'assert'
import { parse } from '../main'

describe( 'Template', () => {
	const parsed = parse( '{{ Template | name = Cheese | value = $250.00 }}' )
	const template = parsed.templates.find( 'Template' )[0]

	console.log( template )
	console.log( `${parsed.templates}` )

	it( 'Name is accessible', () => {
		assert.strictEqual( `${template.name}`, 'Template' )
	} )

	it( 'Can set name', () => {
		template.name = 'Plantilla'
		assert.strictEqual( `${template.name}`, 'Plantilla' )
	} )

	it( 'Representation is updated', () => {
		assert.strictEqual( `${template}`, '{{ Plantilla | name = Cheese | value = $250.00 }}' )
	} )
} )