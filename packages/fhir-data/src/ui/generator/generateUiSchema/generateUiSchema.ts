import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoResourceMeta } from '../../../parse/helpers/resourceMeta/resourceMeta';
import { isUiSchemaGroup } from '../../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { type HealthUiGroup, type HealthUiSchemaFunction } from '../../types';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { getProfileKey } from '../getProfileKey/getProfileKey';
import { processValue } from '../processValue/processValue';

const untranslatedLabelRegexp = /^(r3|r4|fhir)\./;

export const generateUiSchema: HealthUiSchemaFunction<MgoResourceMeta> = (resource, context) => {
    const { formatMessage } = context;
    const {
        id: _id,
        referenceId: _referenceId,
        resourceType: _resourceType,
        profile,
        fhirVersion,
        ...rest
    } = resource;

    const rootPath = getProfileKey(fhirVersion, profile);
    const generatorContext = createGeneratorContext(context, rootPath, fhirVersion);

    const defaultGroup: HealthUiGroup = {
        children: [],
    };
    const groups: HealthUiGroup[] = [defaultGroup];
    const elements = processValue(generatorContext, rootPath, rest);

    for (const element of elements) {
        if (isUiSchemaGroup(element)) {
            groups.push({
                ...element,
                // We only translate the group labels at the last moment.
                // Otherwise groups within other groups might be missing translations for their label
                // even though that label is never actually used as their contents will be merged
                // into their parent group.
                label: untranslatedLabelRegexp.test(element.label as string)
                    ? context.formatLabel(element.label as FhirMessagesIds, null)
                    : element.label,
            });
        } else {
            defaultGroup.children.push(element);
        }
    }

    for (const group of groups) {
        group.children.sort((a, b) => a.label.localeCompare(b.label));
    }

    return {
        label: formatMessage(rootPath as FhirMessagesIds),
        children: groups,
    };
};
