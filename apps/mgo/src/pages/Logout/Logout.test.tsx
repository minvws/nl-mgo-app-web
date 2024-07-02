import { message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Logout } from './Logout';

test('logout page', () => {
    setupWithAppProviders(<Logout />);

    expect(screen.getByRole('heading')).toHaveTextContent(message('logout.heading'));
});
