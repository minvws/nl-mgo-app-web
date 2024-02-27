import { Container } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {}

export function MobileHeader(props: MobileHeaderProps) {
    return (
        <div className="border-b-solid border-b-grey-50 border-b " {...props}>
            <Container {...props} className="py-4" centeredContent>
                <span className="text-md font-bold">Mijn zorg</span>
            </Container>
        </div>
    );
}
