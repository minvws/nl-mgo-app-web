import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import {
    HealthcareOrganizationButton,
    type HealthcareOrganizationButtonProps,
} from './HealthcareOrganizationButton';

test.each<HealthcareOrganizationButtonProps['icon']>(['add', 'delete', 'chevron-right'])(
    'renders variant %s with title',
    async (icon) => {
        const props: HealthcareOrganizationButtonProps = {
            title: faker.lorem.sentence(),
            subTitle: faker.lorem.sentence(),
            meta: faker.lorem.sentence(),
            icon,
            iconAriaLabel: faker.lorem.word(),
        };

        render(<HealthcareOrganizationButton {...props} />);
        expect(screen.getByRole('button').textContent).includes(props.title);
    }
);
