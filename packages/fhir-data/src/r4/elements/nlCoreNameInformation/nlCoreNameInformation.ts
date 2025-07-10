import { type Nullable } from '@minvws/mgo-utils';
import { type HumanName } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterPrimitiveByExtension } from '../../../parse/helpers';
import { type MgoElementMeta } from '../../../resourceTypes';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-NameInformation'; // NOSONAR
const profileGiven = 'http://nictiz.nl/fhir/StructureDefinition/zib-NameInformation.Given'; // NOSONAR

export type R4NlCoreNameInformation = MgoElementMeta<typeof profile> & {
    text: parse.MgoString | undefined;
    family: {
        humannameOwnPrefix: parse.MgoString | undefined;
        humannameOwnName: parse.MgoString | undefined;
        humannamePartnerPrefix: parse.MgoString | undefined;
        humannamePartnerName: parse.MgoString | undefined;
    };
    given: {
        birthName: parse.MgoString[] | undefined;
        initials: parse.MgoString[] | undefined;
    };
    prefix: parse.MgoString[] | undefined;
    suffix: parse.MgoString[] | undefined;
    period: parse.MgoPeriod | undefined;
};

export type R4NlCoreNameInformationGiven = MgoElementMeta<typeof profileGiven> & {
    text: parse.MgoString | undefined;
    given: parse.MgoString[] | undefined;
    period: parse.MgoPeriod | undefined;
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628547
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628552 (Roepnaam)
 */
export function parseNlCoreNameInformation(
    value: Nullable<HumanName>
): R4NlCoreNameInformation | R4NlCoreNameInformationGiven {
    if (value?.use === 'usual') {
        return {
            _profile: profileGiven,
            text: parse.string(value?.text),
            given: map(value.given, parse.string),
            period: parse.period(value?.period),
        };
    }

    const birthNames = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'BR',
    });
    const initials = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'IN',
    });

    return {
        _profile: profile,
        text: parse.string(value?.text),
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
        },
        prefix: map(value?.prefix, parse.string),
        suffix: map(value?.suffix, parse.string),
        period: parse.period(value?.period),
    };
}
