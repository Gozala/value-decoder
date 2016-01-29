/* @flow */

/*::
import type {Result} from "value-result"
import type {Decoded, Decoder} from "./decoder"
*/

import {ok, error} from "value-result"
import {DecodingError, decodingError, isArray, read} from "./core"
export {tuple5, tuple6, tuple7, tuple8} from "./decoder.flowless"
export {object5, object6, object7, object8} from "./decoder.flowless"


const StringConstructor = ''.constructor;
const NumberConstructor = (0).constructor;



export const succeed = /*::<value>*/
  (value/*:value*/)/*:Decoder<value>*/ =>
  _ =>
  value;

export const fail = /*::<value>*/
  (message/*:string*/)/*:Decoder<value>*/ =>
  _ =>
  new DecodingError(message);


export const nil = /*::<value>*/
  (fallback/*:value*/)/*:Decoder<value>*/ =>
  input =>
  ( input == null
  ? fallback
  : decodingError('a null', input)
  );

export const boolean/*:Decoder<boolean>*/ =
  input =>
  ( input === true
  ? true
  : input === false
  ? false
  : decodingError('a boolean', input)
  );


export const string/*:Decoder<string>*/ =
  value =>
  ( typeof(value) === 'string'
  ? value
  : value instanceof StringConstructor
  ? `${value}`
  : decodingError('a string', value)
  );

export const integer/*:Decoder<number>*/ =
  value =>
  ( typeof(value) === 'number'
  ? ( (isFinite(value) && (value|0) === value)
    ? value
    : decodingError('an integer', value)
    )
  : value instanceof NumberConstructor
  ? read(integer, value + 0)
  : decodingError('an integer', value)
  );

export const float/*:Decoder<number>*/ =
  value =>
  ( typeof(value) === 'number'
  ? ( isFinite(value)
    ? value
    : decodingError('a float', value)
    )
  : value instanceof NumberConstructor
  ? read(float, value + 0)
  : decodingError('an float', value)
  );


export const nan =  /*::<value>*/
  (result/*:value*/)/*:Decoder<value>*/ =>
  value =>
  ( isNaN(value)
  ? result
  : decodingError('a NaN', value)
  );


export const array = /*::<value>*/
  (decoder/*:Decoder<value>*/)/*:Decoder<Array<value>>*/ =>
  (input) => {
    if (isArray(input)) {
      const count = input.length
      const array = new Array(count)
      let index = 0

      while (index < count) {
        const decoded = read(decoder, input[index]);
        if (decoded instanceof DecodingError) {
          return decoded
        }
        else {
          array[index] = decoded
        }
        index = index + 1
      }

      return array
    }
    else {
      return decodingError('an array', input);
    }
  }

export const tuple1 = /*::<a, value>*/
  ( make/*:(a:a) => value*/
  , a/*:Decoder<a>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 1) {
      const a$ = read(a, input[0])
      if (a$ instanceof DecodingError) {
        return a$
      }

      return make(a$)
    } else {
      return decodingError('a Tuple of length 1', input)
    }
  }

export const tuple2 = /*::<a, b, value>*/
  ( make/*:(a:a, b:b) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 2) {
      const a$ = read(a, input[0])
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input[1])
      if (b$ instanceof DecodingError) {
        return b$
      }

      return make(a$, b$)
    } else {
      return decodingError('a Tuple of length 2', input)
    }
  }

export const tuple3 = /*::<a, b, c, value>*/
  ( make/*:(a:a, b:b, c:c) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 3) {
      const a$ = read(a, input[0])
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input[1])
      if (b$ instanceof DecodingError) {
        return b$
      }

      const c$ = read(c, input[2])
      if (c$ instanceof DecodingError) {
        return c$
      }

      return make(a$, b$, c$)
    } else {
      return decodingError('a Tuple of length 3', input)
    }
  }

export const tuple4 = /*::<a, b, c, d, value>*/
  ( make/*:(a:a, b:b, c:c, d:d) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 4) {
      const a$ = read(a, input[0])
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input[1])
      if (b$ instanceof DecodingError) {
        return b$
      }

      const c$ = read(c, input[2])
      if (c$ instanceof DecodingError) {
        return c$
      }

      const d$ = read(d, input[3])
      if (d$ instanceof DecodingError) {
        return d$
      }

      return make(a$, b$, c$, d$)
    } else {
      return decodingError('a Tuple of length 4', input)
    }
  }


export const maybe = /*::<value>*/
  (decoder/*:Decoder<value>*/)/*:Decoder<?value>*/ =>
  (value) => {
    const decoded = read(decoder, value);
    if (decoded instanceof DecodingError) {
      return null // Nothing
    }
    else {
      return decoded // Just<value>
    }
  }

export const field = /*::<value>*/
  (name/*:string*/, decoder/*:Decoder<value>*/)/*:Decoder<value>*/ =>
  input =>
  ( ( input != null &&
      name in input
    )
  ? read(decoder, input[name])
  : decodingError(`an object with field "${name}"`, input)
  )

export const at = /*::<value>*/
  (path/*:Array<string>*/, decoder/*:Decoder<value>*/)/*:Decoder<value>*/ =>
  path.reduceRight((decoder, name) => field(name, decoder), decoder)

export const object1 = /*::<a, value>*/
  (make/*:(input:a) => value*/, a/*:Decoder<a>*/)/*:Decoder<value>*/ =>
  input => {
    if (input !== null && typeof(input) === "object") {
      const decoded = read(a, input)
      const result =
        ( decoded instanceof DecodingError
        ? decoded
        : make(decoded)
        )
      return result
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object2 = /*::<a, b, value>*/
  ( make/*:(a:a, b:b) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (input !== null && typeof(input) === "object") {
      const a$ = read(a, input)
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input)
      if (b$ instanceof DecodingError) {
        return b$
      }

      return make(a$, b$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object3 = /*::<a, b, c, value>*/
  ( make/*:(a:a, b:b, c:c) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (input !== null && typeof(input) === "object") {
      const a$ = read(a, input)
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input)
      if (b$ instanceof DecodingError) {
        return b$
      }

      const c$ = read(c, input)
      if (c$ instanceof DecodingError) {
        return c$
      }


      return make(a$, b$, c$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object4 = /*::<a, b, c, d, value>*/
  ( make/*:(a:a, b:b, c:c, d:d) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (input !== null && typeof(input) === "object") {
      const a$ = read(a, input)
      if (a$ instanceof DecodingError) {
        return a$
      }

      const b$ = read(b, input)
      if (b$ instanceof DecodingError) {
        return b$
      }

      const c$ = read(c, input)
      if (c$ instanceof DecodingError) {
        return c$
      }

      const d$ = read(d, input)
      if (d$ instanceof DecodingError) {
        return d$
      }


      return make(a$, b$, c$, d$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

const unboundHasOwnProperty = ({}).hasOwnProperty

export const dictionary = /*::<value>*/
  (decoder/*:Decoder<value>*/)/*:Decoder<{[key:string]: value}>*/ =>
  input => {
    if (input !== null && typeof(input) === "object") {
      const output = {}
      for (let key in input) {
        if (unboundHasOwnProperty.call(input, key)) {
          output[key] = read(decoder, input[key])
        }
      }
      return output
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const arbitrary/*:Decoder<any>*/ =
  input =>
  input;

export const custom = /*::<a, b>*/
  ( decoder/*:Decoder<a>*/
  , parse/*:(input:a) => Result<string, b>*/
  )/*:Decoder<b>*/ =>
  input => {
    const value = read(decoder, input);
    if (value instanceof DecodingError) {
      return value
    }
    else {
      const result = parse(value);
      if (result.type === "Ok") {
        return result.value
      }
      else {
        return new DecodingError(`custom decoder failed: ${result.error}`);
      }
    }
  }

export const map = /*::<a, b>*/
  ( f/*:(input:a) => b*/
  , decoder/*:Decoder<a>*/
  )/*:Decoder<b>*/ =>
  input => {
    const decoded = read(decoder, input)
    const result =
      ( decoded instanceof DecodingError
      ? decoded
      : f(decoded)
      )
    return result
  }

export const chain = /*::<a, b>*/
  ( decoder/*:Decoder<a>*/
  , then/*:(input:a) => Decoder<b>*/
  )/*:Decoder<b>*/ =>
  input => {
    const decoded = read(decoder, input)
    const result =
      ( decoded instanceof DecodingError
      ? decoded
      : then(decoded)(input)
      )
    return result
  }

export const oneOf = /*::<a>*/
  (decoders/*:Array<Decoder<a>>*/)/*:Decoder<a>*/ =>
  input => {
    const errors = []
    const count = decoders.length
    let index = 0
    while (index < count) {
      const decoded = read(decoders[index], input)
      if (decoded instanceof DecodingError) {
        errors.push(decoded.message)
      }
      else {
        return decoded
      }
      index = index + 1
    }

    return decodingError
    ( `expecting one of the following:\n ${errors.join('\n')}`
    , input
    )
  }

export const decode = /*::<value>*/
  (decoder/*:Decoder<value>*/, input/*:any*/)/*:Result<string, value>*/ => {
    const decoded = read(decoder, input)
    const result =
      ( decoded instanceof DecodingError
      ? error(decoded.message.toString())
      : ok(decoded)
      )

    return result
  }

export const parse = /*::<value>*/
  (decoder/*:Decoder<value>*/, input/*:string*/)/*:Result<string, value>*/ => {
    try {
      return decode(decoder, JSON.parse(input))
    } catch (reason) {
      return error(reason.message)
    }
  }
