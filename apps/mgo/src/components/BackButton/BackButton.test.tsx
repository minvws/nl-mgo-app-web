import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, expect, test, vi } from 'vitest';
import { BackButton } from './BackButton';

const mockNavigate = vi.fn();

vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

const oldWindowHistory = window.history;

beforeAll(() => {
    window.history = { length: 1 } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
});

beforeEach(() => {
    (window.history as any).length = 1; // eslint-disable-line @typescript-eslint/no-explicit-any
});

afterAll(() => {
    window.history = oldWindowHistory;
});

test('BackButton is hidden when there is no history', async () => {
    setupWithAppProviders(<BackButton />);
    const backButton = screen.getByRole('button', { name: 'Vorige' });
    expect(backButton.className).includes('hidden');
});

test('BackButton navigates back when clicked', async () => {
    (window.history as any).length = 2; // eslint-disable-line @typescript-eslint/no-explicit-any

    const { user } = setupWithAppProviders(<BackButton />);
    const backButton = screen.getByRole('button', { name: 'Vorige' });
    expect(backButton.className).not.includes('hidden');

    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
});
