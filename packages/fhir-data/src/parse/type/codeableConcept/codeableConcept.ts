import { type CodeableConcept } from '../../../fhir';
import { map } from '../../../utils';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { coding, type MgoCoding } from '../coding/coding';

export type MgoCodeableConcept = MgoCoding[];

export const codeableConcept = createTypeParser<CodeableConcept, MgoCodeableConcept>((value) => {
    if (!value.coding?.length) return [];
    return map(value.coding, coding) as MgoCodeableConcept;
});
