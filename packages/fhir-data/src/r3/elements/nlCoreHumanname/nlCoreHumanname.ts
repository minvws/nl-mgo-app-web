import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type HumanName } from 'fhir/r3';
import { parse } from '../../../parse';
import { filterPrimitiveByExtension } from '../../../parse/helpers';
import { type MgoElementMeta, type ResourceElementConfig } from '../../../types';
import { map } from '../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-humanname'; // NOSONAR

export type NlCoreHumanname = MgoElementMeta<typeof profile> & {
    humannameAssemblyOrder: parse.MgoCode | undefined;
    family: {
        humannameOwnPrefix: parse.MgoString | undefined;
        humannameOwnName: parse.MgoString | undefined;
        humannamePartnerPrefix: parse.MgoString | undefined;
        humannamePartnerName: parse.MgoString | undefined;
    };
    given: {
        birthName: parse.MgoString[] | undefined;
        initials: parse.MgoString[] | undefined;
        callName: parse.MgoString[] | undefined;
    };
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317028
 */
export function parseNlCoreHumanname(value: Nullable<HumanName>): NlCoreHumanname {
    const birthNames = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'BR',
    });
    const initials = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'IN',
    });
    const callNames = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'CL',
    });

    return {
        _profile: profile,

        // HCIM NameInformation-v1.0.1(2017EN)
        humannameAssemblyOrder: parse.extension(
            value,
            'http://hl7.org/fhir/StructureDefinition/humanname-assembly-order', // NOSONAR
            'code'
        ),
        family: {
            humannameOwnPrefix: parse.extension(
                value?._family,
                'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix', // NOSONAR
                'string'
            ),
            humannameOwnName: parse.extension(
                value?._family,
                'http://hl7.org/fhir/StructureDefinition/humanname-own-name', // NOSONAR
                'string'
            ),
            humannamePartnerPrefix: parse.extension(
                value?._family,
                'http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix', // NOSONAR
                'string'
            ),
            humannamePartnerName: parse.extension(
                value?._family,
                'http://hl7.org/fhir/StructureDefinition/humanname-partner-name', // NOSONAR
                'string'
            ),
        },
        given: {
            birthName: map(birthNames, parse.string),
            initials: map(initials, parse.string),
            callName: map(callNames, parse.string),
        },
    };
}

/**
 * @deprecated This object should not be used - use the parseNlCoreHumanname method instead.
 */
export const nlCoreHumanname = {
    parse: parseNlCoreHumanname,
    uiSchemaGroup,
} satisfies ResourceElementConfig<HumanName, NlCoreHumanname>;
