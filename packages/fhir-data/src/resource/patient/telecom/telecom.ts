import type { ContactPoint, Patient } from '../../../fhir';
import { safeGet } from '../../../utils';

export function getPhoneNumbers(fhir?: Patient) {
    return safeGet(fhir, (x) => x.telecom!.filter((y) => y.system === 'phone'), []);
}

export function getPhoneNumber(fhir?: Patient, use: ContactPoint['use'] = 'home') {
    return getPhoneNumbers(fhir).find((x) => x.use === use)?.value;
}

export function getEmail(fhir?: Patient) {
    return safeGet(fhir, (x) => x.telecom!.find((contact) => contact.system === 'email')!.value);
}
