import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import {
    HealthcareOrganizationCard,
    type HealthcareOrganizationCardProps,
} from './HealthcareOrganizationCard';

test.each(['add', 'delete', 'chevron-right'] as const)(
    'renders variant %s with title',
    async (icon) => {
        const props: HealthcareOrganizationCardProps = {
            title: faker.lorem.sentence(),
            titleTag: faker.helpers.arrayElement(['h2', 'h3', 'h4']),
            subTitle: faker.lorem.sentence(),
            meta: faker.lorem.sentence(),
            icon,
            iconAriaLabel: faker.lorem.word(),
            onActionClick: action('on-click'),
        };

        render(<HealthcareOrganizationCard {...props} data-testid="organization" />);
        expect(screen.getByTestId('organization').textContent).includes(props.title);
    }
);

test('renders infoMessage', async () => {
    const props: HealthcareOrganizationCardProps = {
        title: faker.lorem.sentence(),
        titleTag: faker.helpers.arrayElement(['h2', 'h3', 'h4']),
        subTitle: faker.lorem.sentence(),
        meta: faker.lorem.sentence(),
        infoMessage: faker.lorem.sentence(),
    };

    render(<HealthcareOrganizationCard {...props} data-testid="organization" />);
    expect(screen.getByTestId('organization').textContent).includes(props.infoMessage);
});

test('renders checkMessage', async () => {
    const props: HealthcareOrganizationCardProps = {
        title: faker.lorem.sentence(),
        titleTag: faker.helpers.arrayElement(['h2', 'h3', 'h4']),
        subTitle: faker.lorem.sentence(),
        meta: faker.lorem.sentence(),
        checkMessage: faker.lorem.sentence(),
    };

    render(<HealthcareOrganizationCard {...props} data-testid="organization" />);
    expect(screen.getByTestId('organization').textContent).includes(props.checkMessage);
});
