import 'mocha'
import assert from 'assert'
import { parse } from '../main'
import { Text } from '../models'

describe( 'Text', () => {
	const parsed = parse( ` Lorem ipsum dolor amet ` )
	const text = parsed.nodes[0] as Text

	it( 'Value is accessible', () => {
		assert.strictEqual( `${text}`, ' Lorem ipsum dolor amet ' )
	} )

	it( 'Can set inner value', () => {
		text.innerValue = 'Corn'
		assert.strictEqual( `${text}`, ' Corn ' )
	} )

	it( 'Can set value', () => {
		text.value = 'Potato'
		assert.strictEqual( `${text}`, 'Potato' )
	} )
} )