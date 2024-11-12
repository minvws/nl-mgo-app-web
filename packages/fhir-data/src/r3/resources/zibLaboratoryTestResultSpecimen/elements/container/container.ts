import { type SpecimenContainer } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { map } from '../../../../../utils';

export interface Container {
    identifier: parse.MgoIdentifier[] | undefined;
    type: parse.MgoCodeableConcept | undefined;
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
} satisfies ResourceElementConfigR3<SpecimenContainer, Container>;
