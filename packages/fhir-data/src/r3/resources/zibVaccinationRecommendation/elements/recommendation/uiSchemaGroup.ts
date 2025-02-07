import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Recommendation } from './recommendation';

export const uiSchemaGroup: HealthUiGroupFunction<Recommendation> = (resource, context) => {
    const profile = 'zib_vaccination_recommendation.recommendation';
    const ui = context.ui as NonStrictUi;

    return {
        label: profile,
        children: [
            ui.dateTime(`${profile}.date`, resource.date),
            ui.codeableConcept(`${profile}.vaccine_code`, resource.code),
            ui.dateTime(`${profile}.date_criterion`, resource.dateCriterion),
        ],
    };
};
