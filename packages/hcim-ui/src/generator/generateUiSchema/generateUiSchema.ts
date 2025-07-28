import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { UiContext } from '../../context/index.js';
import { isUiSchemaGroup } from '../../helpers/isUiSchemaGroup/isUiSchemaGroup.js';
import { HealthUiSchemaFunction, type HealthUiGroup } from '../../types/index.js';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext.js';
import { getProfileKey } from '../getProfileKey/getProfileKey.js';
import { processValue } from '../processValue/processValue.js';

const untranslatedLabelRegexp = /^(r3|r4|fhir)\./;

export const generateUiSchema: HealthUiSchemaFunction<MgoResourceMeta, UiContext> = (
    resource,
    context
) => {
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
