import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getEpisodes } = createGeneralPractitionerService({ prefixUrl: MOCK_SERVER_URL });

test('getEpisodes', () => testRequestHandler(getEpisodes, 'EpisodeOfCare'));
