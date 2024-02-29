import { App } from '$/App';
import { getIntroSeen } from '$/lib/introSeen';
import { routes } from '$/routes';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { expect, test } from 'vitest';

test('terms', () => {
    render(<App router={createMemoryRouter(routes, { initialEntries: ['/voorwaarden'] })} />);

    expect(getIntroSeen()).toBe(false);
    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');

    fireEvent.click(screen.getByText(/volgende/i));

    expect(getIntroSeen()).toBe(true);
    expect(screen.getByRole('heading')).toHaveTextContent('Bewijs wie je bent');
});
