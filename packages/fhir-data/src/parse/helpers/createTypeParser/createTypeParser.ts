import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

type ParserFunc<Input, Output> = (input: Input) => Output;

export function createTypeParser<Input, Output>(parser: ParserFunc<Input, Output>) {
    return (value: Nullable<Input>) => {
        if (isNullish(value)) return;
        return parser(value);
    };
}
