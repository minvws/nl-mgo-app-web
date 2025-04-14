import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ConsentData } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Data {
    meaning: parse.MgoCode | undefined;
    reference: parse.MgoReference | undefined;
}

function parseData(value: Nullable<ConsentData>): Data {
    return {
        meaning: parse.code(value?.meaning),
        reference: parse.reference(value?.reference),
    };
}

export const data = {
    parse: parseData,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConsentData, Data>;
