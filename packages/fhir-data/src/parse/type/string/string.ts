import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoString = string & { readonly '': unique symbol };

export const string = createTypeParser<string, MgoString>((value) => value as MgoString);
