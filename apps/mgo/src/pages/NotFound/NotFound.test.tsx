import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { NotFound } from './NotFound';

test('healthcare providers', () => {
    setupWithAppProviders(<NotFound />);

    expect(screen.getByRole('heading')).toHaveTextContent(appMessage('not_found.heading'));
});
