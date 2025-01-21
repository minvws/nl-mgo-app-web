import { HealthCategory } from '$/healthCategory/HealthCategory';
import { getDataService } from '$/services';
import { type HealthcareOrganization } from '$/store';
import { isNonNullish } from '$/utils';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { type CategoryQueriesConfig } from '.';
import { createResourceBundleQuery } from '../createResourceBundleQuery';
import { type ResourceQueryMeta } from '../isResourceQueryMeta';

const category = HealthCategory.LaboratoryResults;

export const laboratoryResults: CategoryQueriesConfig<typeof category> = {
    category,
    getQueries: (organization: HealthcareOrganization) => {
        const commonClinicalDataset = getDataService(
            organization,
            DataServiceId.CommonClinicalDataset
        );
        const generalPracticionerService = getDataService(
            organization,
            DataServiceId.GeneralPractitioner
        );

        return [
            createResourceBundleQuery({
                category,
                organization,
                service: commonClinicalDataset,
                method: 'getLastLaboratoryResultsPerType',
            }),

            // createResourceBundleQuery({
            //     organization,
            //     service: generalPracticionerService,
            //     method: 'getDiagnosticAndLabResults',
            // }),

            /* c8 ignore start - This is a very temporary fix because BE doesn't know how to handle url parameters.. */
            generalPracticionerService
                ? {
                      retry: false,
                      staleTime: Infinity,

                      meta: {
                          organizationId: organization.id,
                          dataServiceId: generalPracticionerService.dataServiceId,
                          method: 'getDiagnosticAndLabResults',
                          fhirVersion: generalPracticionerService.fhirVersion,
                      } satisfies ResourceQueryMeta,

                      queryKey: [
                          organization.id,
                          generalPracticionerService.dataServiceId,
                          'getDiagnosticAndLabResults',
                      ],

                      queryFn: async () => {
                          const response = await generalPracticionerService.instance.get(
                              'Observation?code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen%7C&_include=Observation:related-target&_include=Observation:specimen&date=ge2017-01-01'
                          );
                          return response.json();
                      },
                  }
                : undefined,
            /* c8 ignore end */
        ].filter(isNonNullish);
    },
};
