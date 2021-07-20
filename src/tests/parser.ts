import 'mocha'
import assert from 'assert'
import { parse } from '../main'

describe( 'Parser', () => {
	it( 'Doesn\'t trim', () => {
		const strings = [ '{{D}}', '{{ D }}', '{{	D  }}', '{{\nD\n}}', '{{\n\tD\n}}',
			'{{D| 1 }}', '{{D| {{D | 1 }} }}' ]

		for ( const str of strings ) {
			const parsed = parse( str )
			assert.strictEqual( `${parsed}`, str )
		}
	} )

	it( 'Lists all templates, recursively', () => {
		const parsed = parse( '{{D|{{D|  {{D| 1 {{D}}}}}}}} {{D}} {{D}}' )
		const templates = parsed.templates
		assert.strictEqual( templates.length, 6 )
	} )
} )