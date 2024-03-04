import { Button, Container, Heading } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader(props: DesktopHeaderProps) {
    return (
        <header className="border-b-solid border-b-grey-50 border-b " {...props}>
            <Container {...props} className="flex items-center justify-between py-4">
                <Heading asChild size="sm" className="font-normal">
                    <h1>Mijn Gezondheidsoverzicht</h1>
                </Heading>
                <Button
                    className="text-black dark:text-white"
                    leftIcon="Person"
                    rightIcon="ExpandMore"
                    variant="link"
                >
                    Wendy de Bruijn
                </Button>
            </Container>
        </header>
    );
}
