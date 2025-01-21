import { type HealthCategory } from '$/healthCategory/HealthCategory';
import { type HealthcareOrganization } from '$/store';
import { type UseQueryOptions } from '@tanstack/react-query';
import { allergies } from './allergy';
import { documents } from './documents';
import { encounters } from './encounter';
import { functionalOrMentalStatus } from './functionalOrMentalStatus';
import { laboratoryResults } from './laboratoryResults';
import { lifeStyle } from './lifestyle';
import { medicalDevices } from './medicalDevices';
import { medication } from './medication';
import { payers } from './payer';
import { personalInformation } from './personalInformation';
import { problems } from './problem';
import { procedures } from './procedure';
import { treatmentPlans } from './treatmentPlan';
import { vaccinations } from './vaccination';
import { vitals } from './vitals';
import { warnings } from './warning';

type OrganisationQueryFunction = (organization: HealthcareOrganization) => UseQueryOptions[];
export type CategoryQueriesConfig<T extends HealthCategory> = {
    category: T;
    getQueries: OrganisationQueryFunction;
};

const healthcareCategoryConfigs = [
    allergies,
    documents,
    encounters,
    functionalOrMentalStatus,
    laboratoryResults,
    lifeStyle,
    medicalDevices,
    medication,
    payers,
    personalInformation,
    problems,
    procedures,
    treatmentPlans,
    vaccinations,
    vitals,
    warnings,
];

type HealthcareCategoryQueryMap = {
    [K in (typeof healthcareCategoryConfigs)[number]['category']]: OrganisationQueryFunction;
};

const healthcareCategoryQueryMap: Partial<HealthcareCategoryQueryMap> = {};
healthcareCategoryConfigs.forEach(({ category, getQueries }) => {
    healthcareCategoryQueryMap[category] = getQueries;
});

export function getHealthcareCategoryQuery(category: HealthCategory) {
    return (healthcareCategoryQueryMap as HealthcareCategoryQueryMap)[category];
}
