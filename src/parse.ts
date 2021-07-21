import { NodeList } from './utils'
import fs from 'fs'
import path from 'path'
import peg from 'pegjs'
import * as Models from './models'

const grammar = fs.readFileSync( path.resolve( __dirname, '../grammar.pegjs' ) ).toString()
const parser = peg.generate( grammar )

export const parse = ( text: string ): NodeList<Models.Token> => new NodeList( parser.parse( text, Models ) )