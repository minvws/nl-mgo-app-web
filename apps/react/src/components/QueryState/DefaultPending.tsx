import { Spinner } from '@minvws/mgo-react-ui';

export function DefaultPending() {
    return (
        <div className="my-10 text-[2rem]">
            <Spinner className="mx-auto" />
        </div>
    );
}
