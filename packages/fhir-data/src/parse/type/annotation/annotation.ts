import { type Annotation, type DateTimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { type MgoReference, reference } from '../reference/reference';

export interface MgoAnnotation extends ValueType<'annotation'> {
    time: DateTimeString | undefined;
    text: string | undefined;
    author: MgoReference | undefined;
}

export const annotation = createTypeParser<Annotation, MgoAnnotation>((value) => {
    const { time, text, authorReference } = value;
    return {
        _type: 'annotation',
        time: time as DateTimeString,
        text,
        author: reference(authorReference),
    };
});
