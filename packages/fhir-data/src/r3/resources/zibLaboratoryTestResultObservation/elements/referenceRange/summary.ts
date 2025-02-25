import { type MgoCoding } from '../../../../../parse/type';
import { systemCode } from '../../../../../ui/format/systemCode/systemCode';
import { type HealthUiGroup, type HealthUiGroupFunction } from '../../../../../ui/types';
import { type ReferenceRange } from './referenceRange';

import { i18n } from './uiSchemaGroup';

export const summary: HealthUiGroupFunction<ReferenceRange, HealthUiGroup> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    const formatSystemCode = systemCode(context);

    let typeCoding: MgoCoding = {
        system: 'http://hl7.org/fhir/referencerange-meaning', // NOSONAR,
        code: 'normal',
    };

    if (resource.type) {
        typeCoding =
            resource.type?.coding.find(
                (x) => x.system === 'http://hl7.org/fhir/referencerange-meaning' // NOSONAR,
            ) ?? resource.type?.coding[0];
    }

    return {
        label:
            formatSystemCode(typeCoding) ??
            formatMessage('summary.r3.zib_laboratory_test_result_observation.reference_range'),
        children: [...ui.range(`summary.${i18n}`, resource)],
    };
};
