import { NodeList } from './utils'
import fs from 'fs'
import path from 'path'
import peg from 'pegjs'
import * as Models from './models'

type RuleSet = 'general' | 'templates'
type ParsersCollection = {
	[ key in RuleSet ]?: peg.Parser
}

const readGrammar = ( name: RuleSet ): string => fs.readFileSync( path.resolve( __dirname, `../grammars/${name}.pegjs` ) ).toString()

const _parsers: ParsersCollection = {}

export const getParser = ( name: RuleSet = 'general' ): peg.Parser => {
	if ( !_parsers[ name ] ) {
		const grammar = readGrammar( name )
		_parsers[ name ] = peg.generate( grammar )
	}
	return _parsers[ name ] || getParser()
}

export const parse = ( text: string, ruleset?: RuleSet ): NodeList<Models.Token> => {
	const parser = getParser( ruleset )
	return new NodeList( parser.parse( text, Models ) )
}