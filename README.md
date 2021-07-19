# mwparser

- [mwparser](#mwparser)
	- [Installation](#installation)
	- [Usage](#usage)
	- [API](#api)
		- [parse](#parse)
		- [NodeList](#nodelist)
			- [filter](#filter)
			- [find](#find)
		- [templates (getter)](#templates-getter)
		- [ParameterList](#parameterlist)
			- [get](#get)
		- [TemplateList](#templatelist)
			- [find](#find-1)
	- [Models](#models)
		- [Heading](#heading)
		- [NamedParameter](#namedparameter)
		- [Template](#template)
		- [Text](#text)
		- [UnnamedParameter](#unnamedparameter)

**mwparser** is a Node package that intends to provide an easy-to-use parser for MediaWiki wikicode. Allows to manipulate its elements in a simpler way.

**It is currently in a beta stage.** It doesn't offer methods to manipulate all the posible elements **yet** nor simpler ways to update an element's content.

## Installation
Install mwparser using npm:

```
npm install mwparser
```

Install mwparser using yarn:
```
yarn add mwparser
```

## Usage
The package exports all the available classes, but the main parser can be imported as:

```ts
import { parse } from 'mwparser'
```

`parse` is a single-argument function that takes your wikitext input and returns a collection of nodes:

```ts
const text = '{{Template|Foo|bar|1 {{D}} 2}}\nSome introduction.'
const parsed = parse( text )
```

You can access all the templates used in the given text with:

```ts
const templates = parsed.templates
```

It returns a collection of templates, which offers some useful methods like finding by name. It is always recursive, meaning that it will return a collection with `{{Template}}` and `{{D}}`.

To rename `{{Template}}` with other name, e.g. `{{Templaten't}}`, you can use:

```ts
const template = templates.find( 'Template' )[0]
template.name = 'Templaten\'t'
console.log( `${parsed}` )
```
Will output:
```
{{Templaten't|Foo|bar|1 {{D}} 2}}
Some introduction.
```
As you may notice, modifying a node will affect the original node.

## API
### parse
```ts
parse( text: string ): NodeList<Token>
```
Takes a wikitext string and returns a collection of manipulable objects.

### NodeList
#### filter
```ts
NodeList.filter<U>( fn: ( token: Token ) => boolean, recursive = false ): U[]
```
Iterates through all items and returns only those for which `fn` returns `true`.

#### find
```ts
NodeList.find<U>( fn: ( token: Token ) => boolean, recursive = false ): U | undefined
```
Iterates through all items and returns the first one for which `fn` returns `true`.

### templates (getter)
```ts
get NodeList.templates(): TemplateList
```
Returns a collection of all the templates used in the given text. Is always recursive.

### ParameterList
#### get
```ts
get( key: string ): NamedParameter | undefined
get( key: number ): UnnamedParameter | undefined
get( key: string | number ): TemplateParameter | undefined
```
Finds a parameter by its name. Given `{{Template|foo=bar}}`, `ParameterList.get( 'foo' )` will return a `NamedParameter` instance that represents `|foo=bar`.

TODO: Handle template calls like `{{Template|foo|2=asd}}` or `{{Template|foo|3=bar}}` to be accessible using numbers.

### TemplateList
#### find
```ts
TemplateList.find( name: string ): Template[]
```
Returns all templates whose name matches `name`. If you have `{{Foo}}` and `{{Template:Foo}}`, `TemplateList.find( 'Foo' )` will only match the first one.

However, if you have `{{Foo}}` and `{{ Foo }}`, `TemplateList.find( 'Foo' )` will match both.

## Models
Some models don't have **yet** a way to update their value, e.g. setting a heading's content.

### Heading
> Represents a wikitext heading in the form of `== Heading ==` with a variable amount of `=`.

```ts
get level(): number
set level( level: number )
```
Gets/sets how many `=` are used in a wikitext heading. 

```ts
get value(): NodeList
```
Returns the nodes that conform the heading's content.

### NamedParameter
> Represents a template's parameter in the form of `|name=value`.

```ts
get name(): string
set name( name: string )
```
Gets/sets the parameter's name.

```ts
get value(): NodeList
```
Returns the nodes that conform the parameter's content.

```ts
setValue( content: string ): void
```
Allows to set a string as a parameter's value. It will be treated as raw text, so using `parameter.setValue( '{{D}}' )` won't make `{{D}}` accessible through `parsed.templates`.

It overwrites all existing content but respects spacing, so the following:

```ts
const text = '{{D|foo= bar }}'
const parsed = parse( text )
const template = parsed.templates.find( 'D' )[0]
template
	.parameters
	.get( 'foo' )
	.setValue( 'cheese' )
console.log( `${parsed}` )
```

Will output:

```
{{D|foo= cheese }}
```

It will only work correctly if the original content was only text. TODO: handle more complex parameter's contents.

### Template
> Represents a template in the form of `{{Template}}`. It may include named parameters (`{{Template|foo=bar|lorem=ipsum}}`), unnamed parameters (`{{Template|foo|bar|lorem|ipsum}}`) or both.

```ts
get name(): string
set name( name: string )
```
Changes the template's name, keeping the original spacings, so for `{{ D }}`, `template.name = 'Q'` will produce `{{ Q }}`.

```ts
get parameters(): ParameterList
```
Returns a collection of the template's parameters, both named and unnamed.

### Text
> Represents normal text, and is used to represent it in the rest of models, e.g. a template's name is a `Text` instance.

```ts
get value(): string
set value( value: string )
```
Gets/sets the text's content. It won't parse anything and will be treated as raw text.

### UnnamedParameter
> Represents a template's parameter in the form of `|value`. Its name is always `undefined` and there's no way to get its index (TODO?).

```ts
get value(): NodeList
```
Returns the nodes that conform the parameter's content.
