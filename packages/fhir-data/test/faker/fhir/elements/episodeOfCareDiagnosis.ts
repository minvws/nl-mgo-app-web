import { type EpisodeOfCareDiagnosis } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '$test/faker/helpers';
import { codeableConcept, coding, positiveInt, reference } from '../type';

export const episodeOfCareDiagnosis = createMockDataFactory<EpisodeOfCareDiagnosis>(() => {
    return {
        condition: reference(),
        role: codeableConcept({ coding: collection({ min: 1, max: 5, factory: coding }) }),
        rank: positiveInt(),
    };
});
