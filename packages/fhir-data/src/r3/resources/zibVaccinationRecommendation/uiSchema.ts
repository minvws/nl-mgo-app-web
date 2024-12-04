import { ui, type UiSchema } from '../../../ui';
import { map } from '../../../utils';
import { type ZibVaccinationRecommendation } from './zibVaccinationRecommendation';
import { uiSchemaGroup as RecommendationUiSchema } from './elements/recommendation/uiSchemaGroup';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317390
 */
export function uiSchema(resource: ZibVaccinationRecommendation): UiSchema {
    const profile = 'zib_vaccination_recommendation';

    const recommendation = map(resource.recommendation, RecommendationUiSchema, true);

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
}
