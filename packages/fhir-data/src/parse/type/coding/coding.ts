import { type Coding } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers';
import { type ValueType } from '../../types';

export interface MgoCoding extends ValueType<'Coding'> {
    code?: string;
    display?: string;
    system?: string;
}

export const coding = createTypeParser<Coding, MgoCoding>((value) => {
    const { code, display, system } = value;
    return {
        _type: 'Coding',
        code,
        display,
        system,
    };
});
