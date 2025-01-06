import { type SpecimenContainer } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Container {
    identifier: parse.MgoIdentifier[] | undefined; // NL-CM:13.1.20
    type: parse.MgoCodeableConcept | undefined; // NL-CM:13.1.21
}

function parseContainer(value: Nullable<SpecimenContainer>): Container {
    return {
        identifier: map(value?.identifier, parse.identifier),
        type: parse.codeableConcept(value?.type),
    };
}

export const container = {
    parse: parseContainer,
    uiSchemaGroup,
} satisfies ResourceElementConfig<SpecimenContainer, Container>;
