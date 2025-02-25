import { type HealthUiSchemaFunction } from '../../../ui';
import { type NlCoreEpisodeofcare } from './nlCoreEpisodeofcare';

export const i18n = 'r3.nl_core_episodeofcare';

export const uiSchema: HealthUiSchemaFunction<NlCoreEpisodeofcare> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317023/~mappings
     */
    const hcimBasicElements = {
        Identifier: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Patient: ui.reference(`${i18n}.patient`, resource.patient),
        Period: ui.period(`${i18n}.period`, resource.period),
    };

    const hcimConcernForTransfer = {
        Type: ui.codeableConcept(`${i18n}.type`, resource.type),
    };

    return {
        label: resource.title ?? formatMessage(i18n),
        children: [
            {
                label: formatMessage(i18n),
                children: [
                    hcimBasicElements.Identifier,
                    hcimBasicElements.Patient,
                    ...hcimBasicElements.Period,
                    hcimConcernForTransfer.Type,
                ],
            },
        ],
    };
};
