import { capitalize } from 'lodash-es';
import { type CardDetailsFunction } from '../../../resourceTypes.js';
import { type ZibMedicationUse } from './zibMedicationUse.js';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const card: CardDetailsFunction<ZibMedicationUse> = (resource, context) => {
    const { formatMessage, format } = context;

    const i18n = `r3.zib_medication_use`;

    return {
        title:
            capitalize(resource.medicationReference?.display) || resource.id || formatMessage(i18n),
        description: context.organization?.name,
        detail: format.date(resource.effectivePeriod?.start),
    };
};
