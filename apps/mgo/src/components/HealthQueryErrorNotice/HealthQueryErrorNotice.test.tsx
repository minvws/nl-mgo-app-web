import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthQueryErrorNotice } from './HealthQueryErrorNotice';
import { onlineManager } from '@tanstack/react-query';

vi.mock('$/auth');

vi.mock('$/hooks/useFailedHealthQueries/useFailedHealthQueries', () => ({
    useFailedHealthQueries: () => ['query-1', 'query-2'],
}));

const hoisted = vi.hoisted(() => ({
    useRetryQuery: vi.fn(),
}));

vi.mock('$/hooks/useRetryQuery/useRetryQuery', () => ({
    useRetryQuery: hoisted.useRetryQuery,
}));

const isOnlineSpy = vi.spyOn(onlineManager, 'isOnline');

test('clicking retry calls retry with failed queries', async () => {
    const retry = vi.fn();

    hoisted.useRetryQuery.mockImplementation(() => ({
        retry,
        isRetrying: false,
    }));

    const { user } = setupWithAppProviders(<HealthQueryErrorNotice />);

    const button = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    await user.click(button);

    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledWith(['query-1', 'query-2']);
});

test('renders offline message', () => {
    isOnlineSpy.mockReturnValueOnce(false);

    setupWithAppProviders(<HealthQueryErrorNotice />);

    expect(screen.getByText(appMessage('errorstate.clientside.heading'))).toBeInTheDocument();
});
