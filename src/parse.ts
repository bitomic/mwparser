import { NodeList } from './utils'
import fs from 'fs'
import peg from 'pegjs'
import * as Models from './models'

const grammar = fs.readFileSync( './grammar.pegjs' ).toString()
const parser = peg.generate( grammar )

export const parse = ( text: string ): NodeList<Models.Token> => new NodeList( parser.parse( text, Models ) )