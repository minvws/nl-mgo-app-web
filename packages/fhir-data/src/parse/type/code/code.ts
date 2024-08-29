import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoCode = string;

export const code = createTypeParser<string, MgoCode>((value) => value);
