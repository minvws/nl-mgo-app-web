import { faker } from '@faker-js/faker';
import { flushCallStack } from '@minvws/mgo-mgo-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Accordion } from './Accordion';

test('Accordion can be open and closed', async () => {
    const buttonLabel = faker.lorem.sentence();
    const content = faker.lorem.sentence();

    const getParentClassname = () =>
        (screen.getByRole('region').parentNode! as HTMLElement).className;

    render(
        <Accordion>
            <Accordion.Button>{buttonLabel}</Accordion.Button>
            <Accordion.Panel>{content}</Accordion.Panel>
        </Accordion>
    );

    expect(getParentClassname()).includes(' hidden');

    fireEvent.click(screen.getByRole('button', { name: buttonLabel }));

    expect(getParentClassname()).not.includes(' hidden');
    expect(screen.getByRole('region').textContent).includes(content);

    fireEvent.click(screen.getByRole('button', { name: buttonLabel }));
    await flushCallStack();
    expect(getParentClassname()).includes(' hidden');
});

test('Accordion can start in expanded state', async () => {
    const buttonLabel = faker.lorem.sentence();
    const content = faker.lorem.sentence();

    render(
        <Accordion defaultExpanded>
            <Accordion.Button>{buttonLabel}</Accordion.Button>
            <Accordion.Panel>{content}</Accordion.Panel>
        </Accordion>
    );

    expect(screen.getByRole('region').className).not.includes(' hidden');
});
