import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoSampledData } from '../../../parse/type';
import { type HealthUiGroup, type UiFunction, type WithUiHelperContext } from '../../types';
import { decimal } from '../decimal/decimal';
import { positiveInt } from '../positiveInt/positiveInt';
import { simpleQuantity } from '../simpleQuantity/simpleQuantity';
import { string } from '../string/string';

export const sampledData: WithUiHelperContext<UiFunction<MgoSampledData, HealthUiGroup>> =
    (context) => (label, value) => {
        const { formatLabel } = context;
        const formatSimpleQuantity = simpleQuantity(context);
        const formatDecimal = decimal(context);
        const formatPositiveInt = positiveInt(context);
        const formatString = string(context);

        return {
            label: formatLabel(label, null, 'fhir.sample_data'),
            children: [
                formatSimpleQuantity(`${label}.origin` as FhirMessagesIds, value?.origin, {
                    defaultLabel: 'fhir.sample_data.origin',
                }),
                formatDecimal(`${label}.period` as FhirMessagesIds, value?.period, {
                    defaultLabel: 'fhir.sample_data.period',
                }),
                formatDecimal(`${label}.factor` as FhirMessagesIds, value?.factor, {
                    defaultLabel: 'fhir.sample_data.factor',
                }),
                formatDecimal(`${label}.lower_limit` as FhirMessagesIds, value?.lowerLimit, {
                    defaultLabel: 'fhir.sample_data.lower_limit',
                }),
                formatDecimal(`${label}.upper_limit` as FhirMessagesIds, value?.upperLimit, {
                    defaultLabel: 'fhir.sample_data.upper_limit',
                }),
                formatPositiveInt(`${label}.dimensions` as FhirMessagesIds, value?.dimensions, {
                    defaultLabel: 'fhir.sample_data.dimensions',
                }),
                formatString(`${label}.data` as FhirMessagesIds, value?.data, {
                    defaultLabel: 'fhir.sample_data.data',
                }),
            ],
        };
    };
