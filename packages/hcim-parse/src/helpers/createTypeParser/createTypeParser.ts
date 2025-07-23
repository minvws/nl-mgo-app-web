import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { type ValueType } from '../../types';

type ParserFunc<Input, Output extends ValueType> = (input: Input) => Output;

export function createTypeParser<Input, Output extends ValueType>(
    parser: ParserFunc<Input, Output>
) {
    return (value: Nullable<Input>) => {
        if (isNullish(value)) return;
        return parser(value);
    };
}
