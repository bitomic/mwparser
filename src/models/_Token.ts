import { NodeList } from '../utils'

export abstract class Token {
	abstract get value(): NodeList | string
	abstract toString(): string
}