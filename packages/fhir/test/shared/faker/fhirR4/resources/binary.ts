import { Binary } from '@minvws/mgo-fhir/r4';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { binary as binaryR3 } from '../../fhirR3/resources/binary.js';
import { reference } from '../type/index.js';

export const binary = createMockFactory<Binary>(() => {
    const { content, contentType } = binaryR3();
    return {
        resourceType: 'Binary' as const,
        data: content,
        contentType,
        securityContext: reference(),
    };
});
