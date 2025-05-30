import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Logout } from './Logout';

test('logout page', () => {
    setupWithAppProviders(<Logout />);

    expect(screen.getByRole('heading')).toHaveTextContent(appMessage('logout.heading'));
});
