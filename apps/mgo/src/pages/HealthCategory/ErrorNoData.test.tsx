import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { ErrorNoData } from './ErrorNoData';
import { onlineManager } from '@tanstack/react-query';

const mockOnClick = vi.fn();
const isOnlineSpy = vi.spyOn(onlineManager, 'isOnline');

const hoisted = vi.hoisted(() => ({
    useRetryQuery: vi.fn(),
}));

test('renders no data error component', () => {
    isOnlineSpy.mockReturnValue(true);
    setupWithAppProviders(<ErrorNoData onClick={mockOnClick} />);

    expect(
        screen.getByRole('heading', {
            name: appMessage('health_category.errornodata.heading'),
            level: 2,
        })
    ).toBeInTheDocument();

    expect(
        screen.getByText(appMessage('health_category.errornodata.subheading'))
    ).toBeInTheDocument();
});

test('renders offline message', () => {
    isOnlineSpy.mockReturnValueOnce(false);

    setupWithAppProviders(<ErrorNoData onClick={mockOnClick} />);

    expect(screen.getByText(appMessage('errorstate.clientside.heading'))).toBeInTheDocument();
});

test('retry queries when clicking retry button', async () => {
    const retry = vi.fn();

    hoisted.useRetryQuery.mockImplementation(() => ({
        retry,
        isRetrying: false,
    }));

    const { user } = setupWithAppProviders(<ErrorNoData onClick={retry} />);

    const retryButton = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    expect(
        screen.getByRole('heading', {
            name: appMessage('health_category.errornodata.heading'),
            level: 2,
        })
    ).toBeInTheDocument();

    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);

    expect(retry).toHaveBeenCalledTimes(1);
});
