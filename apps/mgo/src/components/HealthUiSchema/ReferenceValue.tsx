import { useResourceRoutePath } from '$/hooks';
import { RouterLink } from '$/routing';
import { useResourcesStore } from '$/store';
import { type ReferenceValue as ReferenceValueData } from '@minvws/mgo-fhir-data';
import { DescriptionButton, DescriptionCard } from '@minvws/mgo-ui';
import { useContext } from 'react';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceValueData;
}

export function ReferenceValue({ value }: ReferenceValueDisplayProps) {
    const { resource } = useContext(HealthUiSchemaContext);
    const getResourceByReferenceId = useResourcesStore((x) => x.getResourceByReferenceId);
    const referencedResource = getResourceByReferenceId(resource, value.reference);
    const resourcePath = useResourceRoutePath(referencedResource);

    if (
        !referencedResource ||
        resource?.dataServiceMethod !== referencedResource.dataServiceMethod
    ) {
        return <DescriptionCard term={value.label} details={value.display} />;
    }

    return (
        <DescriptionButton term={value.label} details={value.display} icon="chevron-right" asChild>
            <RouterLink to={resourcePath} />
        </DescriptionButton>
    );
}
