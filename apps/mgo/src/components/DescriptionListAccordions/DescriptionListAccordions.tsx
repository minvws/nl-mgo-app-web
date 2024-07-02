import { Accordion, DescriptionList, type DescriptionListItem, Stack } from '@minvws/mgo-mgo-ui';
import { type ReactNode } from 'react';

export interface AccordionProps {
    readonly id: string;
    readonly title: ReactNode;
    readonly descriptions: DescriptionListItem[];
}

export interface DescriptionListAccordionsProps {
    readonly items: AccordionProps[];
}

export function DescriptionListAccordions({ items }: DescriptionListAccordionsProps) {
    return (
        <Stack asChild>
            <ul>
                {items.map(({ id, title, descriptions }) => (
                    <li key={id}>
                        <Accordion>
                            <h2>
                                <Accordion.Button>{title}</Accordion.Button>
                            </h2>

                            <Accordion.Panel>
                                <DescriptionList list={descriptions} />
                            </Accordion.Panel>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
