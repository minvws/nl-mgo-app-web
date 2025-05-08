import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoSampledData } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { numberToString } from '../../helpers/numberToString/numberToString';
import { type HealthUiGroup, type UiFunction, type WithUiHelperContext } from '../../types';

export const sampledData: WithUiHelperContext<UiFunction<MgoSampledData, HealthUiGroup>> =
    (context) => (label, value) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, null, 'fhir.sample_data'),
            children: [
                {
                    label: formatLabel(
                        `${label}.origin` as FhirMessagesIds,
                        value?.origin,
                        `fhir.sample_data.origin`
                    ),
                    type: `SINGLE_VALUE`,
                    display: systemValue(context)(value?.origin),
                },
                {
                    label: formatLabel(
                        `${label}.period` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.period'
                    ),
                    type: 'SINGLE_VALUE',
                    display: numberToString(value?.period),
                },
                {
                    label: formatLabel(
                        `${label}.factor` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.factor'
                    ),
                    type: 'SINGLE_VALUE',
                    display: numberToString(value?.factor),
                },
                {
                    label: formatLabel(
                        `${label}.lower_limit` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.lower_limit'
                    ),
                    type: 'SINGLE_VALUE',
                    display: numberToString(value?.lowerLimit),
                },
                {
                    label: formatLabel(
                        `${label}.upper_limit` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.upper_limit'
                    ),
                    type: 'SINGLE_VALUE',
                    display: numberToString(value?.upperLimit),
                },
                {
                    label: formatLabel(
                        `${label}.dimensions` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.dimensions'
                    ),
                    type: 'SINGLE_VALUE',
                    display: numberToString(value?.dimensions),
                },
                {
                    label: formatLabel(
                        `${label}.data` as FhirMessagesIds,
                        value,
                        'fhir.sample_data.data'
                    ),
                    type: 'SINGLE_VALUE',
                    display: value?.data,
                },
            ],
        };
    };
