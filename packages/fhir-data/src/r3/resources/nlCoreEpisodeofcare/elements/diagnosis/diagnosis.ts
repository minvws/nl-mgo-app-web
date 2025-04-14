import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type EpisodeOfCareDiagnosis } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Diagnosis {
    condition: parse.MgoReference | undefined;
    role: parse.MgoCodeableConcept | undefined;
    rank: parse.MgoPositiveInt | undefined;
}

function parseDiagnosis(value: Nullable<EpisodeOfCareDiagnosis>): Diagnosis {
    return {
        condition: parse.reference(value?.condition),
        role: parse.codeableConcept(value?.role),
        rank: parse.positiveInt(value?.rank),
    };
}

export const diagnosis = {
    parse: parseDiagnosis,
    uiSchemaGroup,
} satisfies ResourceElementConfig<EpisodeOfCareDiagnosis, Diagnosis>;
