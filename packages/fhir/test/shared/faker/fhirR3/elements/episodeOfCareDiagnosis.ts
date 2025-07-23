import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type EpisodeOfCareDiagnosis } from 'fhir/r3';
import { codeableConcept, coding, positiveInt, reference } from '../type/index.js';

export const episodeOfCareDiagnosis = createMockFactory<EpisodeOfCareDiagnosis>(() => {
    return {
        condition: reference(),
        role: codeableConcept({ coding: mockArray({ min: 1, max: 5, factory: coding }) }),
        rank: positiveInt(),
    };
});
