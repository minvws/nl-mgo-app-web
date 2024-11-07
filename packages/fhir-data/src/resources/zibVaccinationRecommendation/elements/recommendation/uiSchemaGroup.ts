import { ui } from '../../../../ui';
import { type UiSchemaGroup } from '../../../../ui/types';
import { type Recommendation } from './recommendation';

export function uiSchemaGroup(resource: Recommendation): UiSchemaGroup {
    const profile = 'zib_vaccination_recommendation.recommendation';

    return {
        label: profile,
        children: [
            ui.dateTime(`${profile}.date`, resource.date),
            ui.codeableConcept(`${profile}.vaccine_code`, resource.code),
            ui.multipleValues(`${profile}.date_criterion`, resource.dateCriterion, ui.dateTime),
        ],
    };
}
