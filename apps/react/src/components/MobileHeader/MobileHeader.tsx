import { Container } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {}

export function MobileHeader(props: MobileHeaderProps) {
    return (
        <header
            className="border-b-solid border-b-grey-50 border-b bg-white dark:bg-[#050505] "
            {...props}
        >
            <Container {...props} className="py-4" centeredContent>
                <h2 className="text-md font-bold">Mijn Gezond&shy;heids&shy;overzicht</h2>
            </Container>
        </header>
    );
}
