import { number, type, TypeOf } from "io-ts";
import { NonEmptyString, optionFromNullable, withFallback } from 'io-ts-types';

export type Example = TypeOf<typeof Example>;
export const Example = type({
  id: number,
  title: NonEmptyString,
  description: NonEmptyString,
  comment: withFallback(NonEmptyString, 'N/A' as NonEmptyString)
})

