import { message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { NotFound } from './NotFound';

test('healthcare providers', () => {
    setupWithAppProviders(<NotFound />);

    expect(screen.getByRole('heading')).toHaveTextContent(message('not_found.heading'));
});
