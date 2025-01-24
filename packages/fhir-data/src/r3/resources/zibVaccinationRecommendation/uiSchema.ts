import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibVaccinationRecommendation } from './zibVaccinationRecommendation';
import { uiSchemaGroup as RecommendationUiSchema } from './elements/recommendation/uiSchemaGroup';

export const i18n = 'r3.zib_vaccination_recommendation';
export const uiSchema: UiSchemaFunction<ZibVaccinationRecommendation> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const recommendation = map(
        resource.recommendation,
        (x) => RecommendationUiSchema(x, context),
        true
    );

    return {
        label:
            resource.recommendation?.at(0)?.code?.coding?.at(0)?.display ??
            context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.codeableConcept(`${i18n}.order_status`, resource.orderStatus),
                    ...ui.helpers.getChildren(recommendation),
                ],
            },
        ],
    };
};
