import { type Address } from 'fhir/r4';
import { parse } from '../../../parse';
import { type Nullable } from '../../../types/Nullable';
import { type R4ResourceElementConfig } from '../config';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface NlCoreAddress {
    line: parse.MgoString | undefined;
    streetName: parse.MgoString | undefined; // NL-CM:20.5.2
    houseNumber: parse.MgoString | undefined; // NL-CM:20.5.12
    houseNumberAddition: parse.MgoString | undefined; // NL-CM:20.5.10, NL-CM:20.5.11
    houseNumberIndication: parse.MgoString | undefined; // NL-CM:20.5.9
    additionalInformation: parse.MgoString | undefined; // NL-CM:20.5.7
    city: parse.MgoString | undefined; // NL-CM:20.5.3
    district: parse.MgoString | undefined; // NL-CM:20.5.4
    postalCode: parse.MgoString | undefined; // NL-CM:20.5.6
    country: parse.MgoString | undefined;
    countryCode: parse.MgoCodeableConcept | undefined; // NL-CM:20.5.5
    // Note that in the structure definition `NL-CM:20.5.8` is mapped to `.type` and `.use`
    // However this is probably not correct as there is a dedicated extension for this
    addressType: parse.MgoCodeableConcept | undefined; // NL-CM:20.5.8
    period: parse.MgoPeriod | undefined;
}

/**
 * @name HCIM NlCoreAddress
 * @usage Patient.address
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
function parseNlCoreAddressInformation(value: Nullable<Address>): NlCoreAddress {
    // We assume the full address is available in the first line
    // If it would be split into multiple lines, concatenating them might be an issue
    const lineMeta = value?._line?.[0];

    const streetName = parse.extension(
        lineMeta,
        'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName', // NOSONAR
        'string'
    );

    const houseNumber = parse.extension(
        lineMeta,
        'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber', // NOSONAR
        'string'
    );

    const houseNumberAddition = parse.extension(
        lineMeta,
        'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-buildingNumberSuffix', // NOSONAR
        'string'
    );

    const houseNumberIndication = parse.extension(
        lineMeta,
        'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-additionalLocator', // NOSONAR
        'string'
    );

    const additionalInformation = parse.extension(
        lineMeta,
        'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-unitID', // NOSONAR
        'string'
    );

    const countryCode = parse.extension(
        value?._country,
        'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
        'codeableConcept'
    );

    const addressType = parse.extension(
        value,
        'http://nictiz.nl/fhir/StructureDefinition/ext-AddressInformation.AddressType', // NOSONAR
        'codeableConcept'
    );

    return {
        line: parse.string(value?.line?.[0]),
        streetName,
        houseNumber,
        houseNumberAddition,
        houseNumberIndication,
        additionalInformation,
        city: parse.string(value?.city),
        district: parse.string(value?.district),
        postalCode: parse.string(value?.postalCode),
        country: parse.string(value?.country),
        countryCode,
        addressType,
        period: parse.period(value?.period),
    };
}

export const nlCoreAddressInformation = {
    parse: parseNlCoreAddressInformation,
    uiSchemaGroup,
} satisfies R4ResourceElementConfig<Address, NlCoreAddress>;
