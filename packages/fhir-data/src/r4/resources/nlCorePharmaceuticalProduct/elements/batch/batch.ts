import { type MedicationBatch } from 'fhir/r4';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
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
} satisfies ResourceElementConfig<MedicationBatch, Batch>;
