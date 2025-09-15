import { useResourceRoutePath } from '$/hooks';
import { RouterLink } from '$/routing';
import { useResourcesStore } from '$/store';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-hcim-ui';
import { DescriptionButton } from '@minvws/mgo-ui';
import { useContext } from 'react';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceLinkData;
}

export function ReferenceLink({ value }: ReferenceValueDisplayProps) {
    const { resource } = useContext(HealthUiSchemaContext);
    const getResourceByReferenceId = useResourcesStore((x) => x.getResourceByReferenceId);
    const referencedResource = getResourceByReferenceId(resource, value.reference);
    const resourcePath = useResourceRoutePath(referencedResource);

    return (
        <DescriptionButton details={value.label} icon="chevron-right" asChild>
            <RouterLink relative="path" to={resourcePath} />
        </DescriptionButton>
    );
}
