import { type ConsentData } from 'fhir/r3';
import { type ResourceElementConfig } from '../../../../elements/config';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../../parse';

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
