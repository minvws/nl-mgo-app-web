import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import {
    HealthcareOrganizationCard,
    type HealthcareOrganizationCardProps,
} from './HealthcareOrganizationCard';
import { action } from '@storybook/addon-actions';

test.each<HealthcareOrganizationCardProps['icon']>(['add', 'delete', 'chevron-right'])(
    'renders variant %s with title',
    async (icon) => {
        const props: HealthcareOrganizationCardProps = {
            title: faker.lorem.sentence(),
            subTitle: faker.lorem.sentence(),
            meta: faker.lorem.sentence(),
            icon,
            iconAriaLabel: faker.lorem.word(),
            onActionClick: action('on-click'),
        };

        render(
            <HealthcareOrganizationCard {...props} data-testid="healthcare-organization-button" />
        );
        expect(screen.getByTestId('healthcare-organization-button').textContent).includes(
            props.title
        );
    }
);
