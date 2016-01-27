/* @flow */

import test from "tape"
import {ok, error} from "value-result"
import * as Decoder from "../../value-decoder"

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
