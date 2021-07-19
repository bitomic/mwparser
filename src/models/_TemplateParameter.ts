import { NodeList } from '../utils'
import { Token } from './_Token'

export abstract class TemplateParameter extends Token {
	abstract get name(): string | undefined
	abstract get value(): NodeList
}