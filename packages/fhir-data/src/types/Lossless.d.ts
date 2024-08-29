import { type LosslessNumber } from 'lossless-json';
import { type DeepReplaceType } from './DeepReplaceType';

export type LosslessJson<T = unknown> = DeepReplaceType<T, number, LosslessNumber>;

export type Lossless<T> = T extends number
    ? T | LosslessNumber
    : T extends object
      ? T | LosslessJson<T>
      : T;

export type LosslessOutput<Source, ReturnType> =
    Source extends LosslessJson<Source> ? LosslessJson<ReturnType> : ReturnType;
