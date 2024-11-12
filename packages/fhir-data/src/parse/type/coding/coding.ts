import { type Coding } from '../../../types/FhirRX';
import { createTypeParser } from '../../helpers';

export interface MgoCoding {
    code?: string;
    display?: string;
    system?: string;
}

export const coding = createTypeParser<Coding, MgoCoding>((value) => {
    const { code, display, system } = value;
    return {
        code,
        display,
        system,
    } as MgoCoding;
});
