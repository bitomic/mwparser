# mwparser

![Node.js CI](https://github.com/bitomic/mwparser/actions/workflows/node.js.yml/badge.svg)
![Lint](https://github.com/bitomic/mwparser/actions/workflows/lint.yml/badge.svg)

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

The return value will be a `NodeList` with all the parsed nodes. For the previous example, it will be:

```js
NodeList {
  nodes: [
    Template {
      rawName: Text { rawValue: 'Template' },
      parameters: [
        UnnamedParameter { rawValue: Text { rawValue: 'Foo' } },
        UnnamedParameter { rawValue: Text { rawValue: 'bar' } },
        UnnamedParameter { rawValue: Text { rawValue: '1 {{D}} 2' } }
      ]
    },
    Text { rawValue: '\nSome introduction.' }
  ]
}
```

You can access all the templates used in the given text with:

```ts
const templates = parsed.templates
```

It returns a collection of templates, which offers some useful methods like finding by name. It is **not** recursive, and will return only templates on the top level of a `NodeList`.

To rename `{{Template}}` with other name, e.g. `{{Templaten't}}`, you can use:

```ts
const template = templates.findTemplate( 'Template' ).nodes[ 0 ]
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

### templates (getter)
```ts
get NodeList.templates(): NodeList<Template>
```
Returns a collection of all the templates used in the given text.
