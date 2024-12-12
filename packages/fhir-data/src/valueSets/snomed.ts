export const SNOMED_SYSTEM = 'http://snomed.info/sct'; // NOSONAR;

export enum Snomed {
    LABORATORY_TEST_FINDING = '49581000146104',
    HEMATOLOGY = '252275004',
    CHEMISTRY = '275711006',
    SEROLOGY = '68793005',
    VIROLOGY = '395124008',
    TOXICOLOGY = '314076009',
    MICROBIOLOGY = '19851009',
    MOLECULAR_GENETICS = '405825005',
}

export const SnomedResultTypes = [
    Snomed.HEMATOLOGY,
    Snomed.CHEMISTRY,
    Snomed.SEROLOGY,
    Snomed.VIROLOGY,
    Snomed.TOXICOLOGY,
    Snomed.MICROBIOLOGY,
    Snomed.MOLECULAR_GENETICS,
];
