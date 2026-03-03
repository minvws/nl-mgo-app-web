import { capitalize } from 'lodash-es';
import { type SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { type CardDetailsFunction } from '../../../resourceTypes.js';
import { type ZibMedicationUse } from './zibMedicationUse.js';
/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const card: CardDetailsFunction<ZibMedicationUse, SchemaContext<'R3'>> = (
    resource,
    context
) => {
    const { formatMessage } = context;

    const i18n = `r3.zib_medication_use`;

    return {
        title:
            capitalize(resource.medicationReference?.display) || resource.id || formatMessage(i18n),
        description: context.organization?.name,
        detail: resource.effectivePeriod?.start,
    };
};
