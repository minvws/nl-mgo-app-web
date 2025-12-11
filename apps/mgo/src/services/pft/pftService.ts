import { appConfig } from '$/config';
import ky from 'ky';

export type PatientFriendlyTerm = {
    description: string;
    synonym: string;
    name: string;
};

export type PatientFriendlyTermsList = {
    [code: string]: PatientFriendlyTerm;
};

export async function getPatientFriendlyTerms() {
    return ky
        .get('v1/mgo/pft.json', {
            prefixUrl: appConfig.pft_url,
        })
        .json<PatientFriendlyTermsList>();
}
