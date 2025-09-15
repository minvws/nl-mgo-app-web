import { type Annotation, type DateTimeString } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { type MgoReference, reference } from '../reference/reference.js';

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
