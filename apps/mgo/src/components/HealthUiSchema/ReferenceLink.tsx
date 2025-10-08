import { useResourceDetailsRoutePath } from '$/hooks';
import { RouterLink } from '$/routing';
import { useStore } from '$/store';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-hcim-ui';
import { DescriptionButton } from '@minvws/mgo-ui';
import { useContext } from 'react';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceLinkData;
}

export function ReferenceLink({ value }: ReferenceValueDisplayProps) {
    const { resource } = useContext(HealthUiSchemaContext);
    const getResourceByReferenceId = useStore.use.getResourceByReferenceId();
    const referencedResource = getResourceByReferenceId(resource, value.reference);
    const resourceDetailsPath = useResourceDetailsRoutePath(referencedResource);

    return (
        <DescriptionButton details={value.label} icon="chevron_right" asChild>
            <RouterLink relative="path" to={resourceDetailsPath} />
        </DescriptionButton>
    );
}
