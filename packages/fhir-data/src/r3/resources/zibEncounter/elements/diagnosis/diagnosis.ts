import { type EncounterDiagnosis } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Diagnosis {
    condition: parse.MgoReference | undefined;
    role: parse.MgoCodeableConcept | undefined;
    rank: parse.MgoPositiveInt | undefined;
}

function parseDiagnosis(value: Nullable<EncounterDiagnosis>): Diagnosis {
    return {
        condition: parse.reference(value?.condition),
        role: parse.codeableConcept(value?.role),
        rank: parse.positiveInt(value?.rank),
    };
}

export const diagnosis = {
    parse: parseDiagnosis,
    uiSchemaGroup,
} satisfies ResourceElementConfig<EncounterDiagnosis, Diagnosis>;
