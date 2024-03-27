import { renderWithAppProviders } from '$test/renderApp';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { NotFound } from './NotFound';

test('healthcare providers', () => {
    renderWithAppProviders(<NotFound />);

    expect(screen.getByRole('heading')).toHaveTextContent('Pagina niet gevonden');
});
