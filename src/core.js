/* @flow */

/*::
import * as Decoder from "./decoder"
*/

export const DecodingError = TypeError

export const decodingError =
  (expected/*:string*/, actual/*:any*/)/*:Decoder.DecodingError*/ =>
  new DecodingError
  ( `${expected} expected but got ${JSON.stringify(actual)}` );

export const isArray = Array.isArray;

export const read = /*::<value>*/
  (decoder/*:Decoder.Decoder<value>*/, input/*:any*/)/*:Decoder.Decoded<value>*/ =>
  decoder(input)
