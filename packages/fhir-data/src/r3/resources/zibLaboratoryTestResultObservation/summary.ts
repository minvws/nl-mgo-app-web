import { capitalize } from 'lodash';
import { type MgoCode } from '../../../parse/type';
import { type HealthUiSchemaFunction } from '../../../ui';
import { organization } from '../../../ui/common/organization/organization';
import { summaryOptions } from '../../../ui/common/summaryOptions/summaryOptions';
import { systemCode } from '../../../ui/format/systemCode/systemCode';
import { map } from '../../../utils';
import { type GpLaboratoryResult } from '../gpLaboratoryResult/gpLaboratoryResult';
import { type ZibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

export const i18n = 'r3.zib_laboratory_test_result_observation';

export const summary: HealthUiSchemaFunction<
    ZibLaboratoryTestResultObservation | GpLaboratoryResult
> = (resource, context) => {
    const { ui, formatMessage } = context;
    const formatSystemCode = systemCode(context);

    const referenceRangeSummary = map(
        resource.referenceRange,
        (referenceRange) => {
            return {
                label:
                    formatSystemCode(referenceRange.type?.coding[0]) ??
                    formatMessage(
                        'summary.r3.zib_laboratory_test_result_observation.reference_range'
                    ),
                children: [
                    ...ui.range(
                        `summary.r3.zib_laboratory_test_result_observation.reference_range`,
                        {
                            _type: 'range',
                            ...referenceRange,
                        }
                    ),
                ],
            };
        },
        true
    );

    return {
        label: capitalize(resource.code?.coding.at(0)?.display) || formatMessage(i18n),
        children: [
            {
                children: [
                    ...ui.oneOfValueX(`summary.${i18n}.effective`, resource, 'effective'),
                    ...ui.oneOfValueX(`summary.${i18n}.value`, resource),
                    ui.coding(
                        `summary.${i18n}.interpretation`,
                        resource.interpretation?.interpretatieVlaggenCodelijst
                    ),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_test_details`),
                children: [
                    ui.code(
                        `summary.${i18n}.status`,
                        resource.status as MgoCode<NonNullable<typeof resource.status.value>>,
                        {
                            i18nCode: 'r3.observation.status',
                        }
                    ),
                    ui.reference(`summary.${i18n}.specimen`, resource.specimen),
                ],
            },
            ...referenceRangeSummary,
            {
                label: formatMessage(`summary.${i18n}.group_performer`),
                children: [
                    ui.reference(`summary.${i18n}.performer`, resource.performer),
                    organization(context),
                ],
            },
            summaryOptions(context, i18n, resource),
        ],
    };
};
