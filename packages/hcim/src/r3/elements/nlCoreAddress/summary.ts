import { Nullable } from '@minvws/mgo-utils';
import { SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { SummaryElementFunction } from '../../../resourceTypes.js';
import { NlCoreAddress } from './nlCoreAddress.js';

const i18n = 'r3.nl_core_address';

function formatAddress(resource: Nullable<NlCoreAddress>) {
    if (!resource) return;

    const { line, postalCode, city } = resource;

    const addressLine = line
        ?.flatMap(
            ({ streetName, houseNumber, buildingNumbersuffix, unitID, additionalLocator }) => [
                streetName?.value,
                houseNumber?.value,
                buildingNumbersuffix?.value,
                unitID?.value,
                additionalLocator?.value,
            ]
        )
        .filter(Boolean)
        .join(' ');

    return [addressLine, postalCode?.value, city?.value].filter(Boolean).join(' ');
}

export const nlCoreAddressSummary: SummaryElementFunction<NlCoreAddress, SchemaContext<'R3'>> = (
    resource,
    context
) => {
    const { baseProps } = context;

    return [
        {
            ...baseProps(i18n, resource),
            type: 'SINGLE_VALUE',
            value: { display: formatAddress(resource) },
        },
    ];
};
