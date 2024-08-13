import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

type ProcessingFunction = (arg: any) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

export function addNullishReturn<Func extends ProcessingFunction, T = Parameters<Func>[0]>(
    func: Func
) {
    return (value: Nullable<T>) => {
        if (isNullish(value)) return null;
        return func(value) as ReturnType<Func>;
    };
}
