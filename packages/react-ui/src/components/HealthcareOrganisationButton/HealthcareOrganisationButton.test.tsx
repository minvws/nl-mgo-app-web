import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import {
    HealthcareOrganisationButton,
    type HealthcareOrganisationButtonProps,
} from './HealthcareOrganisationButton';

test.each<HealthcareOrganisationButtonProps['iconName']>(['Add', 'Delete'])(
    'renders variant %s with title',
    async (iconName) => {
        const props: HealthcareOrganisationButtonProps = {
            title: faker.lorem.sentence(),
            subTitle: faker.lorem.sentence(),
            meta: faker.lorem.sentence(),
            iconName,
            iconLabel: faker.lorem.word(),
        };

        render(<HealthcareOrganisationButton {...props} />);
        expect(screen.getByRole('button').textContent).includes(props.title);
    }
);
