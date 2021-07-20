import 'mocha'
import assert from 'assert'
import { parse } from '../main'
import { NodeList } from '../utils'
import { Heading, Text } from '../models'

describe( 'Heading', () => {
	describe( 'Update value', () => {
		const nodeList = parse( '== Heading ==' ) as NodeList<Heading>
		const heading = nodeList.nodes[0]
		
		it( 'Value is accessible', () => {
			assert.strictEqual( `${heading.value}`, ' Heading ' )
		} )

		it( 'Level is accessible', () => {
			assert.strictEqual( heading.level, 2 )
		} )

		it( 'Can set different level', () => {
			heading.level = 4
			assert.strictEqual( `${heading}`, '==== Heading ====' )
		} )

		describe( 'Can set inner value', () => {
			it( 'Using a string', () => {
				heading.value.innerValue = 'Hello'
				assert.strictEqual( `${heading.value}`, ' Hello ' )
			} )

			it( 'Using a NodeList', () => {
				heading.value.innerValue = parse( '{{Wave}} Hello' )
				assert.strictEqual( `${heading.value}`, ' {{Wave}} Hello ' )
			} )
		} )

		describe( 'Can set full value', () => {
			it( 'Using a string', () => {
				heading.value.fullValue = 'HeAdInG'
				assert.strictEqual( `${heading.value}`, 'HeAdInG' )
			} )

			it( 'Using a NodeList', () => {
				heading.value.fullValue = parse( '{{D}} Heading' )
				assert.strictEqual( `${heading.value}`, '{{D}} Heading' )
			} )
		} )
	} )
} )