import { type Annotation } from '../../../types/FhirRX';
import { type DateTimeString } from '../../../types/Fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { dateTime } from '../dateTime/dateTime';
import { reference, type MgoReference } from '../reference/reference';

export interface MgoAnnotation {
    time: DateTimeString | undefined;
    text: string | undefined;
    author: MgoReference | undefined;
}

export const annotation = createTypeParser<Annotation, MgoAnnotation>((value) => {
    const { time, text, authorReference } = value;
    return {
        time: dateTime(time),
        text,
        author: reference(authorReference),
    };
});
