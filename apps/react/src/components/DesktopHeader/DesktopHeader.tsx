import { Container } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader(props: DesktopHeaderProps) {
    return (
        <div className="border-b-solid border-b-grey-50 border-b " {...props}>
            <Container {...props} className="py-4">
                <span className="text-2xl">Mijn Gezondheidsoverzicht</span>
            </Container>
        </div>
    );
}
