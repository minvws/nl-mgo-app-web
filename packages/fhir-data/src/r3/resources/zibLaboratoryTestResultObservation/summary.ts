import { type UiSchemaFunction } from '../../../ui';
import { summaryOptions } from '../../../ui/common/summaryOptions/summaryOptions';
import { map } from '../../../utils';
import { InterpretatieVlaggenCodelijst, type Snomed, SNOMED_SYSTEM } from '../../valueSets/snomed';
import { type GpLaboratoryResult } from '../gpLaboratoryResult/gpLaboratoryResult';
import { referenceRange } from './elements/referenceRange/referenceRange';
import { getLabel, i18n } from './uiSchema';
import { type ZibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

export const summary: UiSchemaFunction<ZibLaboratoryTestResultObservation | GpLaboratoryResult> = (
    resource,
    context
) => {
    const { ui, formatMessage } = context;

    const referenceRangeSummary = map(
        resource.referenceRange,
        (x) => referenceRange.summary(x, context),
        true
    );

    const resultFlags = resource.interpretation?.coding.filter(
        (x) =>
            x.system === SNOMED_SYSTEM && InterpretatieVlaggenCodelijst.includes(x.code as Snomed)
    );

    return {
        label: getLabel(resource, context),
        children: [
            {
                children: [
                    ...ui.oneOfValueX(`summary.${i18n}.effective`, resource, 'effective'),
                    ...ui.oneOfValueX(`summary.${i18n}.value`, resource),
                    ui.coding(`summary.${i18n}.interpretation`, resultFlags),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_test_details`),
                children: [
                    ui.code(`summary.${i18n}.status`, resource.status, {
                        i18nCode: 'r3.observation.status',
                    }),
                    ui.reference(`summary.${i18n}.specimen`, resource.specimen),
                ],
            },
            ...referenceRangeSummary,
            {
                label: formatMessage(`summary.${i18n}.group_performer`),
                children: [ui.reference(`summary.${i18n}.performer`, resource.performer)],
            },
            summaryOptions(context, i18n, resource),
        ],
    };
};
