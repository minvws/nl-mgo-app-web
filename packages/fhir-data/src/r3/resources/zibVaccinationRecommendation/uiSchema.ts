import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { type ZibVaccinationRecommendation } from './zibVaccinationRecommendation';
import { uiSchemaGroup as RecommendationUiSchema } from './elements/recommendation/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317390
 */
export const uiSchema: UiSchemaFunction<ZibVaccinationRecommendation> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'r3.zib_vaccination_recommendation';

    const recommendation = map(
        resource.recommendation,
        (x) => RecommendationUiSchema(x, context),
        true
    );

    return {
        label: resource.recommendation?.at(0)?.code?.coding?.at(0)?.display,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.codeableConcept(`${profile}.order_status`, resource.orderStatus),
                    ...ui.helpers.getChildren(recommendation),
                ],
            },
        ],
    };
};
