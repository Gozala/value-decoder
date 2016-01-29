/* @noflow */

// Note we opt out of flow type checking here because it chockes
// on these functions. For details see flow issue #1319

/*::
import type {Decoded, Decoder} from "./decoder"
*/

import {read, isArray, decodingError, DecodingError} from "./core"

export const tuple5 = /*::<a, b, c, d, e, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 5) {
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

      const e$ = read(e, input[4])
      if (e$ instanceof DecodingError) {
        return e$
      }

      return make(a$, b$, c$, d$, e$)
    } else {
      return decodingError('a Tuple of length 5', input)
    }
  }


export const tuple6 = /*::<a, b, c, d, e, f, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 6) {
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

      const e$ = read(e, input[4])
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input[5])
      if (f$ instanceof DecodingError) {
        return f$
      }

      return make(a$, b$, c$, d$, e$, f$)
    } else {
      return decodingError('a Tuple of length 6', input)
    }
  }

export const tuple7 = /*::<a, b, c, d, e, f, g, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f, g:g) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
  , g/*:Decoder<g>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 7) {
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

      const e$ = read(e, input[4])
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input[5])
      if (f$ instanceof DecodingError) {
        return f$
      }

      const g$ = read(f, input[6])
      if (g$ instanceof DecodingError) {
        return g$
      }

      return make(a$, b$, c$, d$, e$, f$, g$)
    } else {
      return decodingError('a Tuple of length 7', input)
    }
  }

export const tuple8 = /*::<a, b, c, d, e, f, g, h, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
  , g/*:Decoder<g>*/
  , h/*:Decoder<g>*/
  )/*:Decoder<value>*/ =>
  input => {
    if (isArray(input) && input.length === 8) {
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

      const e$ = read(e, input[4])
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input[5])
      if (f$ instanceof DecodingError) {
        return f$
      }

      const g$ = read(f, input[6])
      if (g$ instanceof DecodingError) {
        return g$
      }

      const h$ = read(f, input[7])
      if (h$ instanceof DecodingError) {
        return h$
      }

      return make(a$, b$, c$, d$, e$, f$, g$, h$)
    } else {
      return decodingError('a Tuple of length 8', input)
    }
  }

export const object5 = /*::<a, b, c, d, e, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
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

      const e$ = read(e, input)
      if (e$ instanceof DecodingError) {
        return e$
      }


      return make(a$, b$, c$, d$, e$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object6 = /*::<a, b, c, d, e, f, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
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

      const e$ = read(e, input)
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input)
      if (f$ instanceof DecodingError) {
        return f$
      }


      return make(a$, b$, c$, d$, e$, f$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object7 = /*::<a, b, c, d, e, f, g, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f, g:g) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
  , g/*:Decoder<g>*/
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

      const e$ = read(e, input)
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input)
      if (f$ instanceof DecodingError) {
        return f$
      }

      const g$ = read(g, input)
      if (g$ instanceof DecodingError) {
        return g$
      }

      return make(a$, b$, c$, d$, e$, f$, g$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }

export const object8 = /*::<a, b, c, d, e, f, g, h, value>*/
  ( make/*:(a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h) => value*/
  , a/*:Decoder<a>*/
  , b/*:Decoder<b>*/
  , c/*:Decoder<c>*/
  , d/*:Decoder<d>*/
  , e/*:Decoder<e>*/
  , f/*:Decoder<f>*/
  , g/*:Decoder<g>*/
  , h/*:Decoder<g>*/
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

      const e$ = read(e, input)
      if (e$ instanceof DecodingError) {
        return e$
      }

      const f$ = read(f, input)
      if (f$ instanceof DecodingError) {
        return f$
      }

      const g$ = read(g, input)
      if (g$ instanceof DecodingError) {
        return g$
      }

      const h$ = read(h, input)
      if (h$ instanceof DecodingError) {
        return h$
      }

      return make(a$, b$, c$, d$, e$, f$, g$, h$)
    }
    else {
      return decodingError(`an object`, input)
    }
  }
