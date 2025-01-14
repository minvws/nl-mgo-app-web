# Overview of the zib implementation progress

## [Common clinical dataset](bgz) (R3)

| profile                                | summary              | detail               |
| -------------------------------------- | -------------------- | -------------------- |
| [zib-AdministrationAgreement]          | :white_large_square: | :white_large_square: |
| [zib-AdvanceDirective]                 | :white_large_square: | :white_large_square: |
| [zib-AlcoholUse]                       | :white_large_square: | :white_large_square: |
| [zib-Alert]                            | :white_large_square: | :white_large_square: |
| [zib-AllergyIntolerance]               | :white_large_square: | :white_large_square: |
| [zib-BloodPressure]                    | :white_large_square: | :white_large_square: |
| [zib-BodyHeight]                       | :white_large_square: | :white_large_square: |
| [zib-BodyWeight]                       | :white_large_square: | :white_large_square: |
| [zib-DrugUse]                          | :white_large_square: | :white_large_square: |
| [zib-Encounter]                        | :white_large_square: | :white_large_square: |
| [zib-FunctionalOrMentalStatus]         | :white_large_square: | :white_large_square: |
| [zib-LaboratoryTestResult-Observation] | :white_check_mark:   | :white_check_mark:   |
| [zib-LaboratoryTestResult-Specimen]    | :white_large_square: | :white_large_square: |
| [zib-LivingSituation]                  | :white_large_square: | :white_large_square: |
| [zib-MedicalDevice]                    | :white_large_square: | :white_large_square: |
| [zib-MedicalDeviceProduct]             | :white_large_square: | :white_large_square: |
| [zib-MedicalDeviceRequest]             | :white_large_square: | :white_large_square: |
| [zib-MedicationUse]                    | :white_check_mark:   | :white_check_mark:   |
| [zib-MedicationAgreement]              | :white_large_square: | :white_large_square: |
| [zib-NutritionAdvice]                  | :white_large_square: | :white_large_square: |
| [zib-Payer]                            | :white_large_square: | :white_large_square: |
| [zib-Problem]                          | :white_large_square: | :white_large_square: |
| [zib-Procedure]                        | :white_large_square: | :white_large_square: |
| [zib-ProcedureRequest]                 | :white_large_square: | :white_large_square: |
| [zib-TobaccoUse]                       | :white_large_square: | :white_large_square: |
| [zib-TreatmentDirective]               | :white_large_square: | :white_large_square: |
| [zib-Vaccination]                      | :white_large_square: | :white_large_square: |
| [zib-VaccinationRecommendation]        | :white_large_square: | :white_large_square: |
| [eAfspraak-Appointment]                | :white_large_square: | :white_large_square: |
| [nl-core-patient]                      | :white_large_square: | :white_large_square: |
| [nl-core-practitioner]                 |                      | :white_large_square: |
| [nl-core-practitionerrole]             |                      | :white_large_square: |
| [nl-core-organization]                 |                      | :white_large_square: |

## [General practicioner](gp) (R3)

| profile                    | summary              | ui-schema            |
| -------------------------- | -------------------- | -------------------- |
| ~~nl-core-practitioner~~   |                      |                      |
| ~~nl-core-organization~~   |                      |                      |
| ~~nl-core-patient~~        |                      |                      |
| ~~nl-core-episodeof~~      |                      |                      |
| ~~zib-Alert~~              |                      |                      |
| ~~zib-MedicationAgreemen~~ |                      |                      |
| ~~zib-AllergyIntoleranc~~  |                      |                      |
| [gp-DiagnosticResult]      | :white_large_square: | :white_large_square: |
| [gp-Encounter]             | :white_large_square: | :white_large_square: |
| [gp-EncounterReport]       | :white_large_square: | :white_large_square: |
| [gp-LaboratoryResult]      | :white_check_mark:   | :white_check_mark:   |
| [gp-JournalEntry]          |                      | :white_large_square: |

## [PDF/A Documents](doc) (R3)

| profile                             | summary            | ui-schema            |
| ----------------------------------- | ------------------ | -------------------- |
| ~~nl-core-patient~~                 |                    |                      |
| ~~nl-core-practitioner~~            |                    |                      |
| ~~nl-core-practitionerrole~~        |                    |                      |
| ~~nl-core-organization~~            |                    |                      |
| [IHE.MHD.DocumentManifest]          |                    | :white_large_square: |
| [IHE.MHD.Minimal.DocumentReference] | :white_check_mark: | :white_check_mark:   |

## [Vaccination](vac) (R4)

| profile                                          | summary              | ui-schema            |
| ------------------------------------------------ | -------------------- | -------------------- |
| [R4/nl-core-Patient]                             | :white_large_square: | :white_large_square: |
| [R4/nl-core-Vaccination-event]                   | :white_check_mark:   | :white_check_mark:   |
| [R4/nl-core-HealthProfessional-Practitioner]     |                      | :white_check_mark:   |
| [R4/nl-core-HealthProfessional-PractitionerRole] |                      | :white_check_mark:   |
| [R4/nl-core-HealthcareProvider-Organization]     |                      | :white_check_mark:   |
| [R4/nl-core-HealthcareProvider]                  |                      | :white_check_mark:   |
| [R4/nl-core-PharmaceuticalProduct]               |                      | :white_check_mark:   |

<hr/>

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
