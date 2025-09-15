import { Schema } from 'ts-json-schema-generator';
import { SetRequired } from 'type-fest';

export type SchemaWithDefinitions = SetRequired<Schema, 'definitions'>;
export type Definitions = NonNullable<Schema['definitions']>;
export type JSONSchema7Definition = Definitions[keyof Definitions];
export type JSONSchema7 = Exclude<JSONSchema7Definition, boolean>;
