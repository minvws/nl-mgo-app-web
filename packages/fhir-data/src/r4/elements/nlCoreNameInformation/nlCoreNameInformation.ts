import { type HumanName } from 'fhir/r4';
import { parse } from '../../../parse';
import { filterPrimitiveByExtension } from '../../../parse/helpers';
import { type Nullable } from '../../../types/Nullable';
import { map } from '../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';
import { type R4ResourceElementConfig } from '../config';

export type NlCoreNameInformation = {
    use: Extract<HumanName['use'], 'official'>;
    text: parse.MgoString | undefined; // NL-CM:20.4.4, NL-CM:20.4.5, NL-CM:20.4.7, NL-CM:20.4.11, NL-CM:20.4.10, NL-CM:20.4.9, NL-CM:20.4.8
    given: parse.MgoString[] | undefined; // NL-CM:20.4.4 | NL-CM:20.4.5
    givenNames: parse.MgoString[] | undefined; // NL-CM:20.4.4
    givenInitials: parse.MgoString[] | undefined; // NL-CM:20.4.5
    period: parse.MgoPeriod | undefined;
    family: parse.MgoString | undefined; // NL-CM:20.4.7, NL-CM:20.4.11, NL-CM:20.4.10, NL-CM:20.4.9, NL-CM:20.4.8
    prefix: parse.MgoString[] | undefined;
    suffix: parse.MgoString[] | undefined;
    nameUsage: parse.MgoString | undefined; // NL-CM:20.4.7
};
export type NlCoreNameInformationGiven = {
    use: Extract<HumanName['use'], 'usual'>;
    text: parse.MgoString | undefined;
    given: parse.MgoString[] | undefined; // NL-CM:20.4.6
    period: parse.MgoPeriod | undefined;
};

/**
 * @see: https://zibs.nl/wiki/Naamgegevens-v1.1(2020NL)
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628547
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628552 (Roepnaam)
 */
function parseNlCoreNameInformation(
    value: Nullable<HumanName>
): NlCoreNameInformation | NlCoreNameInformationGiven {
    if (value?.use === 'usual') {
        return {
            use: value.use,
            given: map(value?.given, parse.string),
            period: parse.period(value?.period),
            text: parse.string(value?.text),
        };
    }

    const nameValues = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'BR',
    });
    const initialValues = filterPrimitiveByExtension(value, 'given', {
        url: 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier', // NOSONAR
        valueCode: 'IN',
    });

    return {
        nameUsage: parse.extension(
            value,
            'http://hl7.org/fhir/StructureDefinition/humanname-assembly-order', // NOSONAR
            'code'
        ),
        family: parse.string(value?.family),
        given: map(value?.given, parse.string),
        givenNames: map(nameValues, parse.string),
        givenInitials: map(initialValues, parse.string),
        period: parse.period(value?.period),
        prefix: map(value?.prefix, parse.string),
        suffix: map(value?.suffix, parse.string),
        text: parse.string(value?.text),
        use: parse.string(value?.use) as 'official',
    };
}

export const nlCoreNameInformation = {
    parse: parseNlCoreNameInformation,
    uiSchemaGroup,
} satisfies R4ResourceElementConfig<HumanName, NlCoreNameInformation | NlCoreNameInformationGiven>;
