import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { isUiSchemaGroup } from '../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { type HealthUiGroup, type HealthUiSchemaFunction } from '../types';
import { processValue } from './processValue';
import { getProfileKey } from './profileKey';
import { getUiHelpers } from './uiHelpers';

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

    const i18nLabel = getProfileKey(fhirVersion, profile);
    const uiHelpers = getUiHelpers(context);

    const defaultGroup: HealthUiGroup = {
        children: [],
    };
    const groups: HealthUiGroup[] = [defaultGroup];

    const elements = processValue(context, uiHelpers, fhirVersion, i18nLabel, rest);
    for (const element of elements) {
        if (isUiSchemaGroup(element)) {
            groups.push({
                ...element,
                label: context.formatMessage(element.label as FhirMessagesIds),
            });
        } else {
            defaultGroup.children.push(element);
        }
    }

    for (const group of groups) {
        group.children.sort((a, b) => a.label.localeCompare(b.label));
    }

    return {
        label: formatMessage(i18nLabel as FhirMessagesIds),
        children: groups,
    };
};
