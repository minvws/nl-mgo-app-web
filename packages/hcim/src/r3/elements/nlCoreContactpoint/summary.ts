import { isNonNullish } from '@minvws/mgo-utils';
import { SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { SummaryElementFunction } from '../../../resourceTypes.js';
import { NlCoreContactpoint } from './nlCoreContactpoint.js';

export const nlCoreContactpointSummaryPhone: SummaryElementFunction<
    NlCoreContactpoint[],
    SchemaContext<'R3'>
> = (resource, context) => {
    const { ui } = context;

    const phoneNumbers = resource
        ?.filter(({ system }) => system?.value === 'phone')
        .map((x) => x.value)
        .filter(isNonNullish);

    return [ui.string(`fhir.x.telephone_numbers`, phoneNumbers)];
};

export const nlCoreContactpointSummaryEmail: SummaryElementFunction<
    NlCoreContactpoint[],
    SchemaContext<'R3'>
> = (resource, context) => {
    const { ui } = context;

    const emailAddresses = resource
        ?.filter(({ system }) => system?.value === 'email')
        .map((x) => x.value)
        .filter(isNonNullish);

    return [ui.string(`fhir.x.email_addresses`, emailAddresses)];
};
