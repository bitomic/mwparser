import { NodeList } from '../utils'

export abstract class Token {
	abstract value: NodeList | string

	abstract toString(): string
}