import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoBoolean = boolean;

export const boolean = createTypeParser<boolean, MgoBoolean>((value) => value);
