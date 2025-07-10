import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { screen } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, expect, test, vi } from 'vitest';
import { BackButton } from './BackButton';

const mockNavigate = vi.fn();

vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

const oldWindowHistory = window.history;

beforeAll(() => {
    window.history = {
        state: {
            idx: 0,
        },
    } as History;
});

beforeEach(() => {
    window.history.state.idx = 0;
});

afterAll(() => {
    window.history = oldWindowHistory;
});

test('BackButton is invisible when there is no history', async () => {
    setupWithAppProviders(<BackButton />);
    const backButton = screen.getByRole('button', { name: appMessage('common.previous') });
    expect(backButton.className).includes('invisible');
});

test('BackButton navigates back when clicked', async () => {
    window.history.state.idx = 1;

    const { user } = setupWithAppProviders(<BackButton />);
    const backButton = screen.getByRole('button', { name: appMessage('common.previous') });
    expect(backButton.className).not.includes('invisible');

    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
});

test('BackButton is invisible when state is null', async () => {
    window.history = {
        state: null,
    } as History;
    setupWithAppProviders(<BackButton />);
    const backButton = screen.getByRole('button', { name: appMessage('common.previous') });
    expect(backButton.className).includes('invisible');
});
