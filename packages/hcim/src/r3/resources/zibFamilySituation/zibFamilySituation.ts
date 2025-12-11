import { FhirVersion, ObservationComponent } from '@minvws/mgo-fhir';
import { type Observation } from '@minvws/mgo-fhir/r3';
import {
    getObservationComponents,
    parse,
    parseObservationComponents,
} from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map, Nullable } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';
import { omitUndefined } from '../../../utils/index.js';
import { parseNlCoreObservationBase } from '../nlCoreObservation/nlCoreObservation.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-FamilySituation'; // NOSONAR

function parseChildren(children: Nullable<ObservationComponent[]>) {
    return {
        children: map(children, (child) => ({
            dateTime: parse.dateTime(child.valueDateTime),
            livingAtHome: parse.extension(
                child,
                'http://nictiz.nl/fhir/StructureDefinition/zib-FamilySituation-LivingAtHomeIndicator', // NOSONAR
                'boolean'
            ),
        })),
    };
}

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.20/files/2741820
 */
function parseZibFamilySituation(resource: Observation) {
    const { comment, effectiveDateTime, effectivePeriod, identifier, performer, subject } =
        parseNlCoreObservationBase(resource);

    const children = getObservationComponents(resource.component ?? [], {
        system: 'http://snomed.info/sct', // NOSONAR
        code: '67822003',
    });

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier,
        subject,
        ...omitUndefined({
            effectiveDateTime,
            effectivePeriod,
        }),
        performer,

        // HCIM FamilySituation-v3.0(2017EN)
        comment,
        component: {
            ...parseObservationComponents(resource.component, {
                familyComposition: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '224130005',
                    },
                    type: 'codeableConcept',
                },
                numberOfChildren: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '224118004',
                    },
                    type: 'quantity',
                },
                numberOfChildrenLivingAtHome: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '55811000146107',
                    },
                    type: 'quantity',
                },
                careResponsibility: {
                    coding: {
                        system: 'http://snomed.info/sct', // NOSONAR
                        code: '406192005',
                    },
                    type: 'string',
                },
            }),
        },
        ...parseChildren(children),
    };
}

export type ZibFamilySituation = ReturnType<typeof parseZibFamilySituation>;

export const zibFamilySituation = {
    profile,
    parse: parseZibFamilySituation,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Observation, ZibFamilySituation>;
