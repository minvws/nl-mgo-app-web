import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthQueryErrorNotice } from './HealthQueryErrorNotice';
import { onlineManager } from '@tanstack/react-query';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { faker } from '$test/faker';

vi.mock('$/auth');

const hoisted = vi.hoisted(() => ({
    useRetryQuery: vi.fn(),
    useFailedAndPausedHealthQueries: vi.fn(() => ({
        retry: vi.fn(),
        failedQueryHashes: ['query-1', 'query-2'],
    })),
}));

vi.mock('$/hooks/useRetryQuery/useRetryQuery', () => ({
    useRetryQuery: hoisted.useRetryQuery,
}));

vi.mock('$/hooks/useFailedHealthQueries/useFailedAndPausedHealthQueries', () => ({
    useFailedAndPausedHealthQueries: hoisted.useFailedAndPausedHealthQueries,
}));

const isOnlineSpy = vi.spyOn(onlineManager, 'isOnline');

test('clicking retry calls retry with failed queries', async () => {
    const mockRetry = vi.fn();
    const failedQueryHashes = mockArray({
        factory: faker.lorem.word,
        min: 1,
        max: 10,
    });

    hoisted.useFailedAndPausedHealthQueries.mockImplementation(() => ({
        retry: mockRetry,
        failedQueryHashes,
    }));

    const { user } = setupWithAppProviders(<HealthQueryErrorNotice />);

    const button = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    await user.click(button);

    expect(mockRetry).toHaveBeenCalledTimes(1);
});

test('renders offline message', () => {
    isOnlineSpy.mockReturnValueOnce(false);

    setupWithAppProviders(<HealthQueryErrorNotice />);

    expect(screen.getByText(appMessage('errorstate.clientside.heading'))).toBeInTheDocument();
});
