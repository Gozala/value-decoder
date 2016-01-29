/* @flow */

import test from "tape"
import {ok, error, map2, map3} from "value-result"
import * as Decoder from ".."

test("string", test => {
  const name = Decoder.tuple2(Array, Decoder.string, Decoder.string)
  test.isEquivalent
  ( Decoder.decode(name, ["Johnny", "Walker"])
  , ok(["Johnny", "Walker"])
  )

  test.isEquivalent
  ( Decoder.decode(name, ["Hello", 2])
  , error('a string expected but got 2')
  )

  test.end()
})


test("integer", test => {
  const street = Decoder.string
  const number = Decoder.integer
  const address = Decoder.tuple2(Array, street, number)

  test.isEquivalent
  ( Decoder.decode(address, ["Baker Street", 221])
  , ok(["Baker Street", 221])
  )

  test.end()
})

test("float", test => {
  const numbers = Decoder.array(Decoder.float)

  test.isEquivalent
  ( Decoder.decode(numbers, [6.022, 3.1415, 1.618])
  , ok([6.022, 3.1415, 1.618])
  )

  test.end()
})


test("boolean", test => {
  const isEnabled = Decoder.field("isChecked", Decoder.boolean)

  test.isEquivalent
  ( Decoder.decode(isEnabled, { isChecked: true })
  , ok(true)
  )

  test.end()
})


test("nil", test => {
  const number = Decoder.oneOf([Decoder.integer, Decoder.nil(0)])
  const numbers = Decoder.array(number)

  test.isEquivalent
  ( Decoder.decode(numbers, [1, null, 2, void(0), 3, , 4])
  , ok([1, 0, 2, 0, 3, 0, 4])
  )


  test.end()
})


test("array", test => {
  const numbers = Decoder.array(Decoder.integer);

  test.isEquivalent
  ( Decoder.decode(numbers, [1, 2, 3, 4])
  , ok([1, 2, 3, 4])
  )

  test.end()
})

test("tuple1", test => {
  const identity = x => x
  const extractString = Decoder.tuple1(identity, Decoder.string)

  const authorship =
    Decoder.oneOf
    ( [ Decoder.tuple1(author => `Author: ${author}`, Decoder.string)
      , Decoder.map
        ( authors => `Co-authors: ${authors.join(', ')}`
        , Decoder.array(Decoder.string)
        )
      ]
    )

  test.isEquivalent
  ( Decoder.decode(authorship,  ['Gerald Jay Sussman', 'Hal Abelson'])
  , ok('Co-authors: Gerald Jay Sussman, Hal Abelson')
  )

  test.isEquivalent
  ( Decoder.decode(authorship, ['Conrad Barski'])
  , ok('Author: Conrad Barski')
  )

  test.end()
})

test("tuple2", test => {
  const point = Decoder.tuple2
    ( (x, y) => ({x, y})
    , Decoder.float
    , Decoder.float
    )

  test.isEquivalent
  ( Decoder.decode(point, [3, 4])
  , ok({x: 3, y: 4})
  )

  const name = Decoder.tuple2
    ( (first, last) => `${first} ${last}`
    , Decoder.string
    , Decoder.string
    )

  test.isEquivalent
  ( Decoder.decode(name, ["John","Doe"])
  , ok("John Doe")
  )

  test.end()
})

test("tuple3", test => {
  const point3D = Decoder.tuple3
    ( (x, y, z) => ({ x, y, z })
    , Decoder.float
    , Decoder.float
    , Decoder.float
    )

  test.isEquivalent
  ( Decoder.decode(point3D, [3,4,5])
  , ok({x: 3, y: 4, z: 5})
  )

  test.end()
})


test("tuple4", test => {
  const rgba = Decoder.tuple4
    ( (red, green, blue, opacity) =>
      ({ red, green, blue, opacity })
    , Decoder.integer
    , Decoder.integer
    , Decoder.integer
    , Decoder.float
    )

  test.isEquivalent
  ( Decoder.decode(rgba, [0, 0, 0, 0.5])
  , ok
    ( { red: 0
      , green: 0
      , blue: 0
      , opacity: 0.5
      }
    )
  )

  test.end()
})

test("tuple5", test => {
  const point = Decoder.tuple2
  ( (x, y) =>
    ({ x, y })
  , Decoder.float
  , Decoder.float
  )

  const pentagon = Decoder.tuple5
  ( Array
  , point
  , point
  , point
  , point
  , point
  )

  test.isEquivalent
  ( Decoder.decode
    ( pentagon
    , [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      ]
    )
  , ok
    ( [ {x:0, y:0}
      , {x:5, y:0}
      , {x:7, y:2}
      , {x:8, y:5}
      , {x:3, y:3}
      ]
    )
  )

  test.end()
})


test("tuple6", test => {
  const point = Decoder.tuple2
  ( (x, y) =>
    ({ x, y })
  , Decoder.float
  , Decoder.float
  )

  const hexagon = Decoder.tuple6
  ( Array
  , point
  , point
  , point
  , point
  , point
  , point
  )

  test.isEquivalent
  ( Decoder.decode
    ( hexagon
    , [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [2, 1]
      ]
    )
  , ok
    ( [ {x:0, y:0}
      , {x:5, y:0}
      , {x:7, y:2}
      , {x:8, y:5}
      , {x:3, y:3}
      , {x:2, y:1}
      ]
    )
  )

  test.end()
})

test("tuple7", test => {
  const point = Decoder.tuple2
  ( (x, y) =>
    ({ x, y })
  , Decoder.float
  , Decoder.float
  )

  const heptagon = Decoder.tuple7
  ( Array
  , point
  , point
  , point
  , point
  , point
  , point
  , point
  )

  test.isEquivalent
  ( Decoder.decode
    ( heptagon
    , [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [2, 1]
      , [1, 1]
      ]
    )
  , ok
    ( [ {x:0, y:0}
      , {x:5, y:0}
      , {x:7, y:2}
      , {x:8, y:5}
      , {x:3, y:3}
      , {x:2, y:1}
      , {x:1, y:1}
      ]
    )
  )

  test.end()
})

test("tuple8", test => {
  const point = Decoder.tuple2
  ( (x, y) =>
    ({ x, y })
  , Decoder.float
  , Decoder.float
  )

  const octagon = Decoder.tuple8
  ( Array
  , point
  , point
  , point
  , point
  , point
  , point
  , point
  , point
  )

  test.isEquivalent
  ( Decoder.decode
    ( octagon
    , [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [3, 2]
      , [1, 2]
      , [0, 1]
      ]
    )
  , ok
    ( [ {x:0, y:0}
      , {x:5, y:0}
      , {x:7, y:2}
      , {x:8, y:5}
      , {x:3, y:3}
      , {x:3, y:2}
      , {x:1, y:2}
      , {x:0, y:1}
      ]
    )
  )

  test.end()
})

test("field", test => {
  const nameAndAge = Decoder.object2
    ( (name, age) => [name, age]
    , Decoder.field("name", Decoder.string)
    , Decoder.field("age", Decoder.integer)
    )

  test.isEquivalent
  ( Decoder.decode(nameAndAge, {name: "Zaach", age: 29})
  , ok(["Zaach", 29])
  )

  test.end()
})


test("at", test => {
  const value = Decoder.at
    ( ["target", "value"]
    , Decoder.string
    )

  test.isEquivalent
  ( Decoder.decode
    ( value
    , { type: 'change'
      , target:
        { tagName: 'input'
        , value: 'hello'
        }
      }
    )
  , ok('hello')
  )

  test.end()
})

test("object1", test => {
  const decoder = Decoder.object1
  ( Math.sqrt
  , Decoder.field("x", Decoder.float)
  )

  test.isEquivalent
  ( Decoder.decode
    ( decoder
    , { x: 16, y: 23 }
    )
  , ok(4)
  )

  test.end()
})

test("object2", test => {
  const point = Decoder.object2
  ( (x, y) => [x, y]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  )

  test.isEquivalent
  ( Decoder.decode(point, {x: 17, y: 2})
  , ok([17, 2])
  )

  test.end()
})

test("object3", test => {
  const task = Decoder.object3
  ( (id, description, completed) =>
    ({id, description, completed})
  , Decoder.field("uuid", Decoder.string)
  , Decoder.field("text", Decoder.string)
  , Decoder.field("completed", Decoder.boolean)
  )

  test.isEquivalent
  ( Decoder.decode
    ( task
    , { uuid: '1302f61f-71c5-429e-a33e-0a2f2f2f6b72'
      , text: 'Write tests'
      , completed: false
      }
    )
  , ok
    ( { id: '1302f61f-71c5-429e-a33e-0a2f2f2f6b72'
      , description: 'Write tests'
      , completed: false
      }
    )
  )

  test.end()
})


test("object4", test => {
  const rgba = Decoder.object4
    ( (red, green, blue, opacity) =>
      [red, green, blue, opacity]
    , Decoder.field("red", Decoder.integer)
    , Decoder.field("green", Decoder.integer)
    , Decoder.field("blue", Decoder.integer)
    , Decoder.field("opacity", Decoder.float)
    )

  test.isEquivalent
  ( Decoder.decode
    ( rgba
    , { red: 0
      , green: 0
      , blue: 0
      , opacity: 0.5
      }
    )

  , ok([0, 0, 0, 0.5])
  )

  test.end()
})

test("object5", test => {
  const point = Decoder.object2
  ( (x, y) =>
    [x, y]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  )

  const pentagon = Decoder.object5
  ( (a, b, c, d, e) =>
    [a, b, c, d, e]
  , Decoder.field("a", point)
  , Decoder.field("b", point)
  , Decoder.field("c", point)
  , Decoder.field("d", point)
  , Decoder.field("e", point)
  )

  test.isEquivalent
  ( Decoder.decode
    ( pentagon
    , { a: {x:0, y:0}
      , b: {x:5, y:0}
      , c: {x:7, y:2}
      , d: {x:8, y:5}
      , e: {x:3, y:3}
      }
    )
  , ok
    ( [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      ]
    )
  )

  test.end()
})


test("object6", test => {
  const point = Decoder.object2
  ( (x, y) =>
    [x, y]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  )

  const hexagon = Decoder.object6
  ( (a, b, c, d, e, f) =>
    [a, b, c, d, e, f]
  , Decoder.field("a", point)
  , Decoder.field("b", point)
  , Decoder.field("c", point)
  , Decoder.field("d", point)
  , Decoder.field("e", point)
  , Decoder.field("f", point)
  )

  test.isEquivalent
  ( Decoder.decode
    ( hexagon
    , { a: {x:0, y:0}
      , b: {x:5, y:0}
      , c: {x:7, y:2}
      , d: {x:8, y:5}
      , e: {x:3, y:3}
      , f: {x:2, y:1}
      }
    )
  , ok
    ( [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [2, 1]
      ]
    )
  )

  test.end()
})

test("object7", test => {
  const point = Decoder.object2
  ( (x, y) =>
    [x, y]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  )

  const heptagon = Decoder.object7
  ( (a, b, c, d, e, f, g) =>
    [a, b, c, d, e, f, g]
  , Decoder.field("a", point)
  , Decoder.field("b", point)
  , Decoder.field("c", point)
  , Decoder.field("d", point)
  , Decoder.field("e", point)
  , Decoder.field("f", point)
  , Decoder.field("g", point)
  )


  test.isEquivalent
  ( Decoder.decode
    ( heptagon
    , { a: {x:0, y:0}
      , b: {x:5, y:0}
      , c: {x:7, y:2}
      , d: {x:8, y:5}
      , e: {x:3, y:3}
      , f: {x:2, y:1}
      , g: {x:1, y:1}
      }
    )
  , ok
    ( [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [2, 1]
      , [1, 1]
      ]
    )
  )

  test.end()
})

test("object8", test => {
  const point = Decoder.object2
  ( (x, y) =>
    [x, y]
  , Decoder.field("x", Decoder.float)
  , Decoder.field("y", Decoder.float)
  )

  const octagon = Decoder.object8
  ( (a, b, c, d, e, f, g, h) =>
    [a, b, c, d, e, f, g, h]
  , Decoder.field("a", point)
  , Decoder.field("b", point)
  , Decoder.field("c", point)
  , Decoder.field("d", point)
  , Decoder.field("e", point)
  , Decoder.field("f", point)
  , Decoder.field("g", point)
  , Decoder.field("h", point)
  )

  test.isEquivalent
  ( Decoder.decode
    ( octagon
    , { a: {x:0, y:0}
      , b: {x:5, y:0}
      , c: {x:7, y:2}
      , d: {x:8, y:5}
      , e: {x:3, y:3}
      , f: {x:3, y:2}
      , g: {x:1, y:2}
      , h: {x:0, y:1}
      }
    )
  , ok
    ( [ [0, 0]
      , [5, 0]
      , [7, 2]
      , [8, 5]
      , [3, 3]
      , [3, 2]
      , [1, 2]
      , [0, 1]
      ]
    )
  )

  test.end()
})

test("dictionary", test => {
  const planetMasses = Decoder.dictionary(Decoder.float)

  test.isEquivalent
  ( Decoder.decode
    ( planetMasses
    , { mercury: 0.33
      , venus: 4.87
      , earth: 5.97
      }
    )
  , ok
    ( { mercury: 0.33
      , venus: 4.87
      , earth: 5.97
      }
    )
  )

  test.end()
})

test("maybe", test => {
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

  test.isEquivalent
  ( Decoder.decode
    ( person
    , { name: "David Bowie"
      , born: 1947
      , died: 2016
      }
    )
  , ok
    ( { name: "David Bowie"
      , age: 69
      }
    )
  )

  test.isEquivalent
  ( Decoder.decode
    ( person
    , { name: "Irakli Gozalishvili"
      , born: 1985
      }
    )
  , ok
    ( { name: "Irakli Gozalishvili"
      , age: new Date().getFullYear() - 1985
      }
    )
  )

  test.end()
})

test("oneOf", test => {
  const point = Decoder.oneOf
    ( [ Decoder.tuple2
        ( (x, y) => `${x}:${y}`
        , Decoder.float
        , Decoder.float
        )
      , Decoder.object2
        ( (x, y) => `${x}:${y}`
        , Decoder.field("x", Decoder.float)
        , Decoder.field("y", Decoder.float)
        )
      ]
    )

  const points = Decoder.array(point)

  test.isEquivalent
  ( Decoder.decode
    ( points
    , [ [3, 4]
      , { x:0
        , y:0
        }
      , [5, 12]
      ]
    )
  , ok
    ( [ `3:4`
      , `0:0`
      , `5:12`
      ]
    )
  )

  test.end()
})

test("map", test => {
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

  test.isEquivalent
  ( Decoder.decode
    ( userID
    , 145
    )
  , ok({uuid: "145"})
  )

  test.isEquivalent
  ( Decoder.decode
    ( userID
    , "0f902f7f-bd24-45ce-b057-b29b99148462"
    )
  , ok({uuid: "0f902f7f-bd24-45ce-b057-b29b99148462"})
  )

  test.end()
})

test("fail", test => {
  const makePoint =
    (x, y) =>
    [x, y]

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

  test.isEquivalent
  ( Decoder.decode(point, [8, 3])
  , ok([8, 3])
  )

  test.isEquivalent
  ( Decoder.decode(point, {x:3, y:9})
  , ok([3, 9])
  )

  const failure = Decoder.decode(point, {x: 6})
  test.isEquivalent
  ( failure.type
  , "Error"
  )

  if (failure.type === "Error") {
    test.isEquivalent
    ( failure.error.indexOf('expecting some kind of point') > 0
    , true
    )
  }

  test.end()
})

test("succeed", test => {
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

  test.isEquivalent
  ( Decoder.decode(point3D, { x:3, y:4 })
  , ok([3, 4, 0])
  )

  test.isEquivalent
  ( Decoder.decode(point3D, { x:3, y:4, z:5 })
  , ok([3, 4, 5])
  )

  test.end()
})


test("chain", test => {
  const makeRectangle =
    (width, height) =>
    `[${width}:${height}]`

  const makeCircle =
    (radius) =>
    `(${radius})`

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

  test.isEquivalent
  ( Decoder.decode(shape, { tag: "circle", radius: 43 })
  , ok('(43)')
  )

  test.isEquivalent
  ( Decoder.decode(shape, { tag: "rectangle", width: 43, height: 20 })
  , ok('[43:20]')
  )

  test.isEquivalent
  ( Decoder.decode(shape, { tag: "hexagon" })
  , error('hexagon is not a recognized tag for shapes')
  )

  test.end()
})


test('custom', test => {
  const variadic2 =
    (f, first, second, rest) =>
    Decoder.custom
    ( Decoder.array(Decoder.arbitrary)
    , items =>
      ( items.length < 2
      ? error("expecting at least two elements in the array")
      : map3
        ( f
          , Decoder.decode(first, items[0])
          , Decoder.decode(second, items[1])
          , combine
          ( items
            .slice(2)
            .map(item => Decoder.decode(rest, item))
          )
        )
      )
    )

  const combine =
    results =>
    results
    .reduce
    ( (combined, result) =>
        map2
        ( (tail, head) => [...tail, head]
        , combined
        , result
        )
    , ok([])
    );

    const account =
      variadic2
      ( (id, type, transactions) =>
        ( { id
          , type
          , transactions
          }
        )
      , Decoder.integer
      , Decoder.string
      , Decoder.float
      )

    test.isEquivalent
    ( Decoder.decode
      ( account
      , [123]
      )
    , error('custom decoder failed: expecting at least two elements in the array')
    )

    test.isEquivalent
    ( Decoder.decode
      ( account
      , [982323, 'debit']
      )
    , ok
      ( { id: 982323
        , type: 'debit'
        , transactions: []
        }
      )
    )

    test.isEquivalent
    ( Decoder.decode
      ( account
      , [982323, 'debit', -4.5, -80, 40]
      )
    , ok
      ( { id: 982323
        , type: 'debit'
        , transactions: [-4.5, -80, 40]
        }
      )
    )

    test.end()
})
