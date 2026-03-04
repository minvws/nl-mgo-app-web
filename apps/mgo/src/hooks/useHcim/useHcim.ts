import { Resource, useStore } from '$/store';
import { getCard, getDetails, getSummary } from '@minvws/mgo-hcim';

type HcimFunc = typeof getSummary | typeof getDetails | typeof getCard;

export function useHcim() {
    const getOrganizationById = useStore.use.getOrganizationById();

    /**
     * A wrapper function that ensures the correct organization and locale are used.
     */
    function wrapHcimFunc<T extends HcimFunc>(hcimFunc: T) {
        function getData(resource: Resource): ReturnType<T>;
        function getData(resource: Resource | undefined): ReturnType<T> | undefined;
        function getData(resource: Resource | undefined): ReturnType<T> | undefined {
            if (!resource) return undefined;
            const organization = getOrganizationById(resource.source.organizationId);

            return hcimFunc(resource.mgoResource, {
                organization,
                locale: 'nl-NL',
            }) as ReturnType<T>;
        }
        return getData;
    }

    return {
        getSummary: wrapHcimFunc(getSummary),
        getDetails: wrapHcimFunc(getDetails),
        getCard: wrapHcimFunc(getCard),
    };
}
