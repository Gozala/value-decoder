# value-decoder [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## API

### Primitives

#### `string`

Extracts a string

```js
const name = Decoder.tuple2(Array, Decoder.string, Decoder.string)
const result = Decoder.decode(name, ["Johnny", "Walker"])
result.isOk // => true
result.value // => ["Johnny", "Walker"]

const broken = Decoder.decode(name, ["Hello", 2]);
broken.isOk // => false
broken.error // => ""
```

#### `integer`

Extract an integer.

```js
const street = Decoder.string
const number = Decoder.integer
const address = Decoder.tuple2(Array, street, number)

const result = Decoder.decode(address, ["Baker Street", 221])
result.isOk // => true
result.value // => ["Baker Street", 221]
```

#### `float`

Extract float

```js
const numbers = Decoder.array(Decoder.float)
const result = Decoder.decode(numbers, [6.022, 3.1415, 1.618])
```

#### `boolean`

Extract a boolean.

```js
const isEnabled = Decoder.field("isChecked", Decoder.boolean)
const result = Decoder.decode(isEnabled, { isChecked: true })
```

#### `nil`

Decode `null` as the value given, and fail otherwise. Primarily useful for creating other decoders.

```js
const numbers = Decoder.array(Decoder.oneOf([Decoder.integer, Decoder.nil(0)]))
```

This decoder treats `null` as `Nothing`, and otherwise tries to produce a `Just`.

```js
const nullOr = decoder =>
  Decoder.oneOf
  ( [ Decoder.null(Result.nothing())
    , Decoder.map(Result.just, decoder)
    ]
  )
```

### Arrays

#### `array`

Extract an Array of elements of specific type.

```js
const numbers = Decoder.array(Decoder.integer);
```

#### `tuple1`

Handle an array with exactly one element.

```js
const identity = x => x
const extractString = Decoder.tuple1(identity, Decoder.string)

const authorship =
  Decoder.oneOf
  ( [ Decoder.tuple1(author => `Author: ${author}`, Decoder.string)
    , Decoder.map
      ( Decoder.array(Decoder.string)
      , authors => `Co-authors: ${authors.join(', ')}`
      )
    ]
  )
```

#### `tuple2`

Handle an array with exactly two elements. Useful for points and simple pairs.

```js
const point = Decoder.tuple2
  ( (x, y) => ({x, y})
  , Decoder.float
  , Decoder.float
  )

const p = Decoder.decode(point, [3, 4])
p.isOk // => true
p.value // => {x: 3, y: 4}

const name = Decoder.tuple2
  ( (first, last) => `${first} ${last}`
  , Decoder.string
  , Decoder.string
  )

const john = Decoder.decode(name, ["John","Doe"])
john.isOk // => true
john.value // => "John Doe"
```

#### `tuple3`

Handle an array with exactly three elements.

```js
const point3D = Decoder.tuple3
  ( (x, y, z) => ({ x, y, z })
  , Decoder.float
  , Decoder.float
  , Decoder.float
  )

const p = Decoder.decode(point3D, [3,4,5])
p.isOK // => true
p.value // => {x: 3, y: 4, z: 5}
```


#### `tuple4` / `tuple5` / `tuple6` / `tuple7` / `tuple8`

Handle an array with exactly four / five / six / seven / eight elements.

### Objects

#### `field`

Applies the decoder to the field with the given name. Fails if the value is not an object or has no such field.

```js
const nameAndAge = Decoder.object2
  ( (name, age) => [name, age]
  , Decoder.field("name", Decoder.string)
  , Decoder.field("age", Decoder.integer)
  )
```

#### `at`

Access a nested field, making it easy to dive into big structures. This is really a helper function so you do not need to write `Decoder.field` many times.

```js
const value = Decoder.at
  ( ["target", "value"]
  , Decoder.string
  )
```

#### `object1`

Apply a function to a decoder. You can use this function as `map` if you must (which can be done with any `objectN` function actually).

```js
Decoder.object1
( Math.sqrt
, Decoder.field("x", Decoder.float)
)
```

#### `object2`

Use two different decoders on a JS value. This is nice for extracting multiple fields from an object.

```js
Decoder.object2
( (x, y) => [x, y]
, Decoder.field("x", Decoder.float)
, Decoder.field("y", Decoder.float)
)
```

#### `object3`

Use three different decoders on a JS value. This is nice for extracting multiple fields from an object.

```js
Decoder.object3
( (id, description, completed) =>
  ({id, description, completed})
, Decoder.field("uuid", Decoder.string)
, Decoder.field("text", Decoder.string)
, Decoder.field("completed", Decoder.boolean)
)
```

#### `object4` / `object5` / `object5` / `object6` / `object7` / `object8`

Use 4 / 5 / 6 / 7 / 8 different decoders on a JS value. This is nice for extracting multiple fields from an object.


#### `dictionary`

Turn any object into a dictionary of key-value pairs.

```js
const planetMasses = Decoder.dictionary(Decoder.float)

Decoder.decode
  ( planetMasses
  , { mercury: 0.33, venus: 4.87, earth: 5.97 }
  )
```

### Oddly Shaped Values

#### `maybe`

Extract a [Maybe][] value, wrapping successes with [Just][] and turning any failure in [Nothing][]. If you are expecting that a field can sometimes be `null` (or `undefined`), it's better to check for it explicitly, as this function will swallow errors from ill-formed values.

The following code decodes JSON objects that may not have a profession field.

```js
const person = Decoder.object3
  ( (name, born, died) =>
    ( { name
      , age:
        ( died == null
        ? new Date().getFullYear() - born
        : died - born
        )
      }
    )
  , Decoder.field("name", Decoder.string)
  , Decoder.field("born", Decoder.integer)
  , Decoder.maybe(Decoder.field("died", Decoder.integer))
  )
```

#### `oneOf`

Try out multiple different decoders. This is helpful when you are dealing with something with a very strange shape and when `chain` does not help narrow things down so you can be more targeted.

```js
const point = Decoder.oneOf
  ( [ Decoder.tuple2
      ( (x, y) => [x, y]
      , Decoder.float
      , Decoder.float
      )
    , Decoder.object2
      ( (x, y) => [x, y]
      , Decoder.field("x", Decoder.float)
      , Decoder.field("y", Decoder.float)
      )
    ]
  )

const points = Decoder.array(point)

Decoder.decode(points, [[3,4], { x:0, y:0 }, [5,12]])
```

#### `map`

Transform the value returned by a decoder. Most useful when paired with the `oneOf`.

```js
const NewID =
  uuid =>
  ({uuid})

const oldID2q =
  id =>
  NewID(String(id))

const userID = Decoder.oneOf
  ( [ Decoder.map(oldID2q, Decoder.integer)
    , Decoder.map(NewID, Decoder.string)
    ]
  )
```

#### `fail`

A decoder that always fails. Useful when paired with `chain` or `oneOf` to improve error messages when things go wrong. For example, the following decoder is able to provide a much more specific error message when fail is the last option.

```js
const point = Decoder.oneOf
  ( [ Decoder.tuple2
      ( makePoint
      , Decoder.float
      , Decoder.float
      )
    , Decoder.object2
      ( makePoint
      , Decoder.field("x", Decoder.float)
      , Decoder.field("y", Decoder.float)
      )
    , Decoder.fail("expecting some kind of point")
    ]
  )
```

#### `succeed`

A decoder that always succeeds. Useful when paired with `chain` or `oneOf` but everything is supposed to work out at the end. For example, maybe you have an optional field that can have a default value when it is missing.

```js
const point3D = Decoder.object3
  ( (x, y, z) => [x, y, z]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  , Decoder.oneOf
    ( [ Decoder.field("z", Decoder.float)
      , Decoder.succeed(0)
      ]
    )
  )

Decoder.decode(point3D, { x:3, y:4 })
Decoder.decode(point3D, { x:3, y:4, z:5 })
```

#### `chain`

Helpful when one field will determine the shape of a bunch of other fields.

```js
const shapeInfo =
  tag =>
  ( tag === "rectangle"
  ? Decoder.object2
    ( makeRectangle
    , Decoder.field("width", Decoder.float)
    , Decoder.field("height", Decoder.float)
    )
  : tag === "circle"
  ? Decoder.object1
    ( makeCircle
    , Decoder.field("radius", Decoder.float)
    )
  : Decoder.fail(`${tag} is not a recognized tag for shapes`)
  )

const shape = Decoder.chain
  ( Decoder.field("tag", Decoder.string)
  , shapeInfo
  )
```


### "Creative" Values

#### `arbitrary`

Bring in an arbitrary JSON value. Useful if you need to work with crazily formatted data. For example, this lets you create a parser for "variadic" lists where the first few types are different, followed by 0 or more of the same type.

```js
const variadic2 =
  (f, a, b, c) =>
  Decoder.custom
  ( Decoder.array(Decoder.arbitrary)
  , items =>
    ( items.length < 3
    ? Decoder.fail("expecting at least two elements in the array")
    : Result.map3
      ( f
      , Decoder.decode(a, items[0])
      , Decoder.decode(b, items[1])
      , combineResults
        ( items
          .slice(2)
          .map(item => Decoder.decode(c, item))
        )
      )
    )
  )

const combineResults =
  items =>
  items
  .reduce
  ( (acc, item) =>
      Result.map2
      ( (tail, head) => [head, ...tail]
      , acc
      , item
      )
  , Result.ok([])
  );
```

#### `custom`

Create a custom decoder that may do some fancy computation. See the value documentation for an example usage.

## Install

npm install value-decoder

## Prior Art


- [JSON.Decode library from Elm][JSON.Decode]
- [Readers module from Addon-sdk][Addon-sdk readers]

[npm-url]: https://npmjs.org/package/value-maybe
[npm-image]: https://img.shields.io/npm/v/value-maybe.svg?style=flat

[travis-url]: https://travis-ci.org/Gozala/value-maybe
[travis-image]: https://img.shields.io/travis/Gozala/value-maybe.svg?style=flat

[gitter-url]: https://gitter.im/Gozala/value-maybe?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg

[flow]:http://flowtype.org
[JSON.Decode]:http://package.elm-lang.org/packages/elm-lang/core/3.0.0/Json-Decode
[Addon-sdk readers]:https://github.com/mozilla/addon-sdk/blob/master/lib/sdk/context-menu/readers.js
