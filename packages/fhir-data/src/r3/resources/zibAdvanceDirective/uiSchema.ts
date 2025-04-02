import { type HealthUiSchemaFunction } from '../../../ui';
import { type UiHelperContext } from '../../../ui/context';
import { isNonNullish } from '../../../utils';
import { type ZibAdvanceDirective } from './zibAdvanceDirective';

export const i18n = 'r3.zib_advance_directive';

export function getLabel(resource: ZibAdvanceDirective, { formatMessage }: UiHelperContext) {
    return resource.dateTime?.value ?? formatMessage(i18n);
}

export const uiSchema: HealthUiSchemaFunction<ZibAdvanceDirective> = (resource, context) => {
    const { ui, formatMessage } = context;

    const hcimAdvanceDirective = {
        Disorder: ui.reference(`${i18n}.disorder`, resource.disorder),
        Comment: ui.string(`${i18n}.comment`, resource.comment),
        LivingWillType: ui.codeableConcept(
            `${i18n}.type_of_living_will`,
            resource.typeOfLivingWill
        ),
        LivingWillDate: ui.dateTime(`${i18n}.date_time`, resource.dateTime),
        ConsentingParty: ui.reference(`${i18n}.consenting_party`, resource.consentingParty),
    };

    return {
        label: getLabel(resource, context),
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    hcimAdvanceDirective.Disorder,
                    hcimAdvanceDirective.Comment,
                    hcimAdvanceDirective.LivingWillType,
                    hcimAdvanceDirective.LivingWillDate,
                    hcimAdvanceDirective.ConsentingParty,
                    resource.source.attachment ? ui.attachment(resource.source.attachment) : null,
                ].filter(isNonNullish),
            },
        ],
    };
};
