import { useResourceDetailsRoutePath } from '$/hooks';
import { RouterLink } from '$/routing';
import { useStore } from '$/store';
import { type ReferenceValue as ReferenceValueData } from '@minvws/mgo-hcim-ui';
import { DescriptionButton, DescriptionCard } from '@minvws/mgo-ui';
import { useContext } from 'react';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceValueData;
}

export function ReferenceValue({ value }: ReferenceValueDisplayProps) {
    const { resource } = useContext(HealthUiSchemaContext);
    const getResourceByReferenceId = useStore.use.getResourceByReferenceId();
    const referencedResource = getResourceByReferenceId(resource, value.reference);
    const resourcePath = useResourceDetailsRoutePath(referencedResource);

    if (
        !referencedResource ||
        resource?.source.endpointId !== referencedResource.source.endpointId
    ) {
        return <DescriptionCard term={value.label} details={value.display} />;
    }

    return (
        <DescriptionButton term={value.label} details={value.display} icon="chevron_right" asChild>
            <RouterLink to={resourcePath} />
        </DescriptionButton>
    );
}
