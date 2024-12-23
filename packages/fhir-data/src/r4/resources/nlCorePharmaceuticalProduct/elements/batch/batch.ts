import { type MedicationBatch } from 'fhir/r4';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type R4ResourceElementConfig } from '../../../../elements/config';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Batch {
    lotNumber: parse.MgoString | undefined;
    expirationDate: parse.MgoDateTime | undefined;
}

function parseBatch(value: Nullable<MedicationBatch>): Batch {
    return {
        lotNumber: parse.string(value?.lotNumber),
        expirationDate: parse.dateTime(value?.expirationDate),
    };
}

export const batch = {
    parse: parseBatch,
    uiSchemaGroup,
} satisfies R4ResourceElementConfig<MedicationBatch, Batch>;
