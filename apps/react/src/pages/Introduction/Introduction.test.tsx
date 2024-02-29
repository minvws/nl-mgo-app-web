import { App } from '$/App';
import { routes } from '$/routes';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { expect, test } from 'vitest';

test('introduction', () => {
    render(<App router={createMemoryRouter(routes)} />);

    expect(screen.getByRole('heading')).toHaveTextContent(
        'Je gezond\u00ADheids\u00ADgegevens in één overzicht'
    );

    fireEvent.click(screen.getByText(/volgende/i));

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});
