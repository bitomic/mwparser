import { List } from '../utils'

export abstract class Token {
	abstract get value(): List<Token> | string
	abstract toString(): string
}