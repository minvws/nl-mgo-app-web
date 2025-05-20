# [MGO] - HCIM / ZIBs

This is an overview of the HCIM implementation progress. We can parse all the FHIR HCIM information, but not all of them have been thoroughly checked to ensure they contain all the relevant fields of [the original ZIB/HCIM][zib].
We list both the summary and detail of a HCIM. This is related to the `fhir-data` package.

**Summaries**
Not all profiles require a summary, but the ones that do, require a specification on what relevent information should be shown. This is still very much a work in progress.

**Detail**
We aim to support all HCIM profiles that can be returned from a data service. The detail checkmark indicates that the [Health UI Schema][HUIS] contains all relevant fields related to the original HCIM.

## [Common clinical dataset](bgz) (R3)

| profile                                | summary              | detail             |
| -------------------------------------- | -------------------- | ------------------ |
| [zib-AdministrationAgreement]          | :white_large_square: | :white_check_mark: |
| [zib-AdvanceDirective]                 | :white_large_square: | :white_check_mark: |
| [zib-AlcoholUse]                       | :white_large_square: | :white_check_mark: |
| [zib-Alert]                            | :white_large_square: | :white_check_mark: |
| [zib-AllergyIntolerance]               | :white_large_square: | :white_check_mark: |
| [zib-BloodPressure]                    | :white_large_square: | :white_check_mark: |
| [zib-BodyHeight]                       | :white_large_square: | :white_check_mark: |
| [zib-BodyWeight]                       | :white_large_square: | :white_check_mark: |
| [zib-DrugUse]                          | :white_large_square: | :white_check_mark: |
| [zib-Encounter]                        | :white_large_square: | :white_check_mark: |
| [zib-FunctionalOrMentalStatus]         | :white_large_square: | :white_check_mark: |
| [zib-LaboratoryTestResult-Observation] | :white_check_mark:   | :white_check_mark: |
| [zib-LaboratoryTestResult-Specimen]    | :white_large_square: | :white_check_mark: |
| [zib-LivingSituation]                  | :white_large_square: | :white_check_mark: |
| [zib-MedicalDevice]                    | :white_large_square: | :white_check_mark: |
| [zib-MedicalDeviceProduct]             | :white_large_square: | :white_check_mark: |
| [zib-MedicalDeviceRequest]             | :white_large_square: | :white_check_mark: |
| [zib-MedicationUse]                    | :white_check_mark:   | :white_check_mark: |
| [zib-MedicationAgreement]              | :white_large_square: | :white_check_mark: |
| [zib-NutritionAdvice]                  | :white_large_square: | :white_check_mark: |
| [zib-Payer]                            | :white_large_square: | :white_check_mark: |
| [zib-Problem]                          | :white_large_square: | :white_check_mark: |
| [zib-Procedure]                        | :white_large_square: | :white_check_mark: |
| [zib-ProcedureRequest]                 | :white_large_square: | :white_check_mark: |
| [zib-TobaccoUse]                       | :white_large_square: | :white_check_mark: |
| [zib-TreatmentDirective]               | :white_large_square: | :white_check_mark: |
| [zib-Vaccination]                      | :white_large_square: | :white_check_mark: |
| [zib-VaccinationRecommendation]        | :white_large_square: | :white_check_mark: |
| [eAfspraak-Appointment]                | :white_large_square: | :white_check_mark: |
| [nl-core-patient]                      | :white_large_square: | :white_check_mark: |
| [nl-core-practitioner]                 |                      | :white_check_mark: |
| [nl-core-practitionerrole]             |                      | :white_check_mark: |
| [nl-core-organization]                 |                      | :white_check_mark: |

## [General practicioner](gp) (R3)

| profile                    | summary              | detail             |
| -------------------------- | -------------------- | ------------------ |
| ~~nl-core-practitioner~~   |                      |                    |
| ~~nl-core-organization~~   |                      |                    |
| ~~nl-core-patient~~        |                      |                    |
| ~~zib-Alert~~              |                      |                    |
| ~~zib-MedicationAgreemen~~ |                      |                    |
| ~~zib-AllergyIntoleranc~~  |                      |                    |
| [nl-core-episodeofCare]    | :white_large_square: | :white_check_mark: |
| [gp-DiagnosticResult]      | :white_large_square: | :white_check_mark: |
| [gp-Encounter]             | :white_large_square: | :white_check_mark: |
| [gp-EncounterReport]       | :white_large_square: | :white_check_mark: |
| [gp-LaboratoryResult]      | :white_check_mark:   | :white_check_mark: |
| [gp-JournalEntry]          |                      | :white_check_mark: |

## [PDF/A Documents](doc) (R3)

| profile                             | summary            | detail             |
| ----------------------------------- | ------------------ | ------------------ |
| ~~nl-core-patient~~                 |                    |                    |
| ~~nl-core-practitioner~~            |                    |                    |
| ~~nl-core-practitionerrole~~        |                    |                    |
| ~~nl-core-organization~~            |                    |                    |
| [IHE.MHD.DocumentManifest]          |                    | :white_check_mark: |
| [IHE.MHD.Minimal.DocumentReference] | :white_check_mark: | :white_check_mark: |

## [Vaccination](vac) (R4)

| profile                                          | summary              | detail               |
| ------------------------------------------------ | -------------------- | -------------------- |
| [R4/nl-core-Patient]                             | :white_large_square: | :white_large_square: |
| [R4/nl-core-Vaccination-event]                   | :white_check_mark:   | :white_check_mark:   |
| [R4/nl-core-HealthProfessional-Practitioner]     |                      | :white_check_mark:   |
| [R4/nl-core-HealthProfessional-PractitionerRole] |                      | :white_check_mark:   |
| [R4/nl-core-HealthcareProvider-Organization]     |                      | :white_check_mark:   |
| [R4/nl-core-HealthcareProvider]                  |                      | :white_check_mark:   |
| [R4/nl-core-PharmaceuticalProduct]               |                      | :white_check_mark:   |

<hr/>

[MGO]: ../README.md
[HUIS]: ./glossary.md#health-ui-schema

<!-- Data services -->

[gp]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data
[bgz]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017
[doc]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_PDFA
[vac]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V6/FHIR_Vaccination-Immunization

<!-- Bgz -->

[zib-Payer]: ../packages/fhir-data/src/r3/resources/zibPayer/zibPayer.ts
[zib-TreatmentDirective]: ../packages/fhir-data/src/r3/resources/zibTreatmentDirective/zibTreatmentDirective.ts
[zib-AdvanceDirective ]: ../packages/fhir-data/src/r3/resources/zibAdvanceDirective/zibAdvanceDirective.ts
[zib-FunctionalOrMentalStatus]: ../packages/fhir-data/src/r3/resources/zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus.ts
[zib-Problem]: ../packages/fhir-data/src/r3/resources/zibProblem/zibProblem.ts
[zib-LivingSituation]: ../packages/fhir-data/src/r3/resources/zibLivingSituation/zibLivingSituation.ts
[zib-DrugUse]: ../packages/fhir-data/src/r3/resources/zibDrugUse/zibDrugUse.ts
[zib-AlcoholUse]: ../packages/fhir-data/src/r3/resources/zibAlcoholUse/zibAlcoholUse.ts
[zib-TobaccoUse]: ../packages/fhir-data/src/r3/resources/zibTobaccoUse/zibTobaccoUse.ts
[zib-NutritionAdvice]: ../packages/fhir-data/src/r3/resources/zibNutritionAdvice/zibNutritionAdvice.ts
[zib-Alert]: ../packages/fhir-data/src/r3/resources/zibAlert/zibAlert.ts
[zib-AllergyIntolerance]: ../packages/fhir-data/src/r3/resources/zibAllergyIntolerance/zibAllergyIntolerance.ts
[zib-MedicationUse]: ../packages/fhir-data/src/r3/resources/zibMedicationUse/zibMedicationUse.ts
[zib-MedicationAgreement]: ../packages/fhir-data/src/r3/resources/zibMedicationAgreement/zibMedicationAgreement.ts
[zib-AdministrationAgreement]: ../packages/fhir-data/src/r3/resources/zibAdministrationAgreement/zibAdministrationAgreement.ts
[zib-MedicalDeviceProduct]: ../packages/fhir-data/src/r3/resources/zibMedicalDeviceProduct/zibMedicalDeviceProduct.ts
[zib-MedicalDevice]: ../packages/fhir-data/src/r3/resources/zibMedicalDevice/zibMedicalDevice.ts
[zib-Vaccination]: ../packages/fhir-data/src/r3/resources/zibVaccination/zibVaccination.ts
[zib-BloodPressure]: ../packages/fhir-data/src/r3/resources/zibBloodPressure/zibBloodPressure.ts
[zib-BodyWeight]: ../packages/fhir-data/src/r3/resources/zibBodyWeight/zibBodyWeight.ts
[zib-BodyHeight]: ../packages/fhir-data/src/r3/resources/zibBodyHeight/zibBodyHeight.ts
[zib-LaboratoryTestResult-Observation]: ../packages/fhir-data/src/r3/resources/zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation.ts
[zib-LaboratoryTestResult-Specimen]: ../packages/fhir-data/src/r3/resources/zibLaboratoryTestResultSpecimen/zibLaboratoryTestResultSpecimen.ts
[zib-Procedure]: ../packages/fhir-data/src/r3/resources/zibProcedure/zibProcedure.ts
[zib-Encounter]: ../packages/fhir-data/src/r3/resources/zibEncounter/zibEncounter.ts
[zib-ProcedureRequest]: ../packages/fhir-data/src/r3/resources/zibProcedureRequest/zibProcedureRequest.ts
[zib-VaccinationRecommendation]: ../packages/fhir-data/src/r3/resources/zibVaccinationRecommendation/zibVaccinationRecommendation.ts
[zib-MedicalDeviceRequest]: ../packages/fhir-data/src/r3/resources/zibMedicalDeviceRequest/zibMedicalDeviceRequest.ts
[eAfspraak-Appointment ]: ../packages/fhir-data/src/r3/resources/eAfspraakAppointment/eAfspraakAppointment.ts
[nl-core-patient]: ../packages/fhir-data/src/r3/resources/nlCorePatient/nlCorePatient.ts
[nl-core-practitioner]: ../packages/fhir-data/src/r3/resources/nlCorePractitioner/nlCorePractitioner.ts
[nl-core-practitionerrole ]: ../packages/fhir-data/src/r3/resources/nlCorePractitionerrole/nlCorePractitionerrole.ts
[nl-core-organization]: ../packages/fhir-data/src/r3/resources/nlCoreOrganization/nlCoreOrganization.ts

<!-- Gp -->

[gp-DiagnosticResult]: ../packages/fhir-data/src/r3/resources/gpDiagnosticResult/gpDiagnosticResult.ts
[gp-LaboratoryResult]: ../packages/fhir-data/src/r3/resources/gpLaboratoryResult/gpLaboratoryResult.ts
[gp-EncounterReport]: ../packages/fhir-data/src/r3/resources/gpEncounterReport/gpEncounterReport.ts
[gp-JournalEntry]: ../packages/fhir-data/src/r3/resources/gpJournalEntry/gpJournalEntry.ts
[gp-Encounter]: ../packages/fhir-data/src/r3/resources/gpEncounter/gpEncounter.ts

<!-- Doc -->

[IHE.MHD.DocumentManifest]: ../packages/fhir-data/src/r3/resources/iheMhdDocumentManifest/iheMhdDocumentManifest.ts
[IHE.MHD.Minimal.DocumentReference]: ../packages/fhir-data/src/r3/resources/iheMhdMinimalDocumentReference/iheMhdMinimalDocumentReference.ts

<!-- Vac -->

[R4/nl-core-Patient]: ../packages/fhir-data/src/r4/resources/nlCorePatient/nlCorePatient.ts
[R4/nl-core-Vaccination-event]: ../packages/fhir-data/src/r4/resources/nlCoreVaccinationEvent/nlCoreVaccinationEvent.ts
[R4/nl-core-HealthProfessional-Practitioner]: ../packages/fhir-data/src/r4/resources/nlCoreHealthProfessionalPractitioner/nlCoreHealthProfessionalPractitioner.ts
[R4/nl-core-HealthProfessional-PractitionerRole]: ../packages/fhir-data/src/r4/resources/nlCoreHealthProfessionalPractitionerRole/nlCoreHealthProfessionalPractitionerRole.ts
[R4/nl-core-HealthcareProvider-Organization]: ../packages/fhir-data/src/r4/resources/nlCoreHealthcareProviderOrganization/nlCoreHealthcareProviderOrganization.ts
[R4/nl-core-HealthcareProvider]: ../packages/fhir-data/src/r4/resources/nlCoreHealthcareProvider/nlCoreHealthcareProvider.ts
[R4/nl-core-PharmaceuticalProduct]: ../packages/fhir-data/src/r4/resources/nlCorePharmaceuticalProduct/nlCorePharmaceuticalProduct.ts

<!---->

[zib]: https://zibs.nl/wiki/ZIB_Hoofdpagina
