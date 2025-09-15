import { type Coding } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/index.js';
import { type ValueType } from '../../types.js';

export interface MgoCodingProps {
    code?: string;
    display?: string;
    system?: string;
}

export interface MgoCoding extends MgoCodingProps, ValueType<'coding'> {}

export function codingProps<T extends Coding>(value: T): MgoCodingProps {
    const { code, display, system } = value;
    return {
        code,
        display,
        system,
    };
}

export const coding = createTypeParser<Coding, MgoCoding>((value) => {
    return {
        _type: 'coding',
        ...codingProps(value),
    };
});
