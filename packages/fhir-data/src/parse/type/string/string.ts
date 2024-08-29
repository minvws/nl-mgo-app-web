import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoString = string;

export const string = createTypeParser<string, MgoString>((value) => value);
