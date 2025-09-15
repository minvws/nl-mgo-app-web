import { FhirVersion } from '@minvws/mgo-fhir';
import { type Coverage } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Payer'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
function parseZibPayer(resource: Coverage) {
    const payor = resource.payor?.map((payor) => {
        return {
            ...parse.reference(payor),
            bankInformation: parse.customExtensionMultiple(
                payor,
                'http://nictiz.nl/fhir/StructureDefinition/zib-Payer-BankInformation', // NOSONAR
                (bankInformation) => {
                    return {
                        bankName: parse.extension(bankInformation, 'BankName', 'string'),
                        accountNumber: parse.extension(bankInformation, 'AccountNumber', 'string'),
                        bankcode: parse.extension(bankInformation, 'Bankcode', 'string'),
                    };
                }
            ),
        };
    });

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        beneficiary: parse.reference(resource.beneficiary),
        period: parse.period(resource.period),

        // HCIM Payer-v3.1(2017EN)
        type: parse.codeableConcept(resource.type),
        subscriberId: parse.string(resource.subscriberId),
        payor,
    };
}

export type ZibPayer = ReturnType<typeof parseZibPayer>;

export const zibPayer = {
    profile,
    parse: parseZibPayer,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Coverage, ZibPayer>;
