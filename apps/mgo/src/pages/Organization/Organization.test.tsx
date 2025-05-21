import { useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { Organization } from './Organization';

const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock('$/routing/useParams');

test('healthcare organization shows details about the organization', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({ organizationSlug: organization.slug }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        appMessage('organization.heading', { organizationName: organization.name })
    );
});

test('healthcare organization shows a message if the organization could not be found', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.word.sample(),
    }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        appMessage('organization.not_found_heading')
    );
});
