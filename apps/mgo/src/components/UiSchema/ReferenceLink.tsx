import { RouterLink } from '$/routing';
import { useResourcesStore } from '$/store';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-fhir-data';
import { DescriptionButton } from '@minvws/mgo-mgo-ui';
import { useContext } from 'react';
import { UiSchemaContext } from './UiSchemaContext';

export interface ReferenceValueDisplayProps {
    readonly value: ReferenceLinkData;
}

export function ReferenceLink({ value }: ReferenceValueDisplayProps) {
    const { resource } = useContext(UiSchemaContext);
    const getResourceByReferenceId = useResourcesStore((x) => x.getResourceByReferenceId);
    const referencedResource = getResourceByReferenceId(resource, value.reference);

    return (
        <DescriptionButton
            details={value.label}
            icon="chevron-right"
            asChild
            isDisabled={!referencedResource}
        >
            <RouterLink relative="path" to={`../${referencedResource?.slug}/detail`} />
        </DescriptionButton>
    );
}
