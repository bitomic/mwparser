import fs from 'fs'
import path from 'path'
import peg from 'peggy'
import * as Models from './structures'

type RuleSet = 'default'
type ParsersCollection = {
	[ key in RuleSet ]?: peg.Parser
}

const readGrammar = ( name: RuleSet ): string => fs.readFileSync( path.resolve( __dirname, `../grammars/${name}.pegjs` ) ).toString()

const _parsers: ParsersCollection = {}

export const getParser = ( name: RuleSet = 'default' ): peg.Parser => {
	if ( !_parsers[ name ] ) {
		const grammar = readGrammar( name )
		_parsers[ name ] = peg.generate( grammar )
	}
	return _parsers[ name ] || getParser()
}

export const parse = ( text: string, ruleset?: RuleSet ): Models.NodeList => {
	const parser = getParser( ruleset )
	return new Models.NodeList( ...parser.parse( text, Models ) )
}