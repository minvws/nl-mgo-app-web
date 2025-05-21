# [MGO] - Healthcare categories

This is an overview of the healthcare categories that we use in all the clients.

## Healthcare categories

- [Medicijnen](#medicijnen)
- [Metingen](#metingen)
- [Uitslagen](#uitslagen)
- [Allergieën](#allergieën)
- [Behandelingen](#behandelingen)
- [Afspraken](#afspraken)
- [Vaccinaties](#vaccinaties)
- [Documenten](#documenten)
- [Medische klachten](#medische-klachten)
- [Persoonlijke gegevens](#persoonlijke-gegevens)
- [Mentaal welzijn](#mentaal-welzijn)
- [Waarschuwingen](#waarschuwingen)
- [Leefstijl](#leefstijl)
- [Medische hulpmiddelen](#medische-hulpmiddelen)
- [Behandelplan](#behandelplan)
- [Betaalgegevens](#betaalgegevens)

<hr/>

### Subcategories

#### Medicijnen

| Subcategorie                 | Profile                       | Source      | Description                                                               |
| :--------------------------- | :---------------------------- | :---------- | :------------------------------------------------------------------------ |
| Medicijnen die je gebruikt   | [zib-MedicationUse]           | [BgZ]       | Gaat over welke medicatie                                                 |
| Afspraken over je medicijnen | [zib-MedicationAgreement]     | [BgZ], [GP] | Beschrijft een voorschrift of een intentie om medicatie voor te schrijven |
| Hoe je je medicijnen krijgt  | [zib-AdministrationAgreement] | [BgZ]       | Gaat over de levering en toediening van de medicatie                      |

#### Metingen

| Subcategorie          | Profile               | Source      | Description                    |
| :-------------------- | :-------------------- | :---------- | :----------------------------- |
| Bloeddruk             | [zib-BloodPressure]   | [BgZ], [GP] | Laatst bekende bloeddruk       |
| Gewicht               | [zib-BodyWeight]      | [BgZ], [GP] | Laatst bekende lichaamsgewicht |
| Lengte                | [zib-BodyHeight]      | [BgZ], [GP] | Laatst bekende lichaamslengte  |
| Uitslag van onderzoek | [gp-DiagnosticResult] | [GP]        |                                |
| Uitslag van onderzoek | [gp-DiagnosticResult] | [GP]        |                                |

#### Uitslagen

<!-- prettier-ignore -->
| Subcategorie                       | Profile                                            | Source | Description                                    |
| :--------------------------------- | :------------------------------------------------- | :----- | :--------------------------------------------- |
| Uitslag van onderzoek laboratorium | [zib&#8209;LaboratoryTestResult&#8209;Observation] | [BgZ]  | Laatst bekende laboratoriumresultaten per type |
| Onderzoeksmateriaal                | [zib-LaboratoryTestResult-Specimen]                | [BgZ]  |                                                |
| Uitslag van test laboratorium      | [gp-LaboratoryResult]                              | [GP]   | Een laboratoriumtest is een objectieve diagnostische procedure. Het resultaat is de uitkomst van de procedure. Laboratoriumtests omvatten vitale functies zoals bloeddruk, gewicht, en labresultaten zoals ijzer in het bloed. |

#### Allergieën

| Subcategorie | Profile                  | Source      | Description                             |
| :----------- | :----------------------- | :---------- | :-------------------------------------- |
| Allergieën   | [zib-AllergyIntolerance] | [BgZ], [GP] | Alle bekende informatie over allergieën |

#### Behandelingen

| Subcategorie                | Profile                 | Source | Description                       |
| :-------------------------- | :---------------------- | :----- | :-------------------------------- |
| Behandelingen en overdracht | [zib-Procedure]         | [BgZ]  | Bekende chirurgische ingrepen     |
| Geplande zorgafspraken      | [zib-ProcedureRequest]  | [BgZ]  | Bekende geplande zorgactiviteiten |
| "                           | [nl-core-episodeofcare] | [GP]   | Zorgtraject van zorg              |

#### Afspraken

| Subcategorie                 | Profile                 | Source      | Description                                              |
| :--------------------------- | :---------------------- | :---------- | :------------------------------------------------------- |
| Afspraken met zorgaanbieders | [eAfspraak-Appointment] | [BgZ]       |                                                          |
| Contacten met zorgaanbieders | [zib-Encounter]         | [BgZ], [GP] | Bekende ziekenhuisopnames (geen poliklinische contacten) |
| "                            | [gp-Encounter]          | [GP]        | Bekende huisarts afspraken                               |
| "                            | [gp-EncounterReport]    | [GP]        | Bekende huisarts afspraken                               |

#### Vaccinaties

| Subcategorie        | Profile                          | Source | Description         |
| :------------------ | :------------------------------- | :----- | :------------------ |
| Vaccinaties         | [zib-Vaccination]                | [BgZ]  | Bekende vaccinaties |
| "                   | [nl-core-Vaccination-event-(R4)] | [Vac]  | Bekende vaccinaties |
| Vaccinatie adviezen | [zib-VaccinationRecommendation]  | [BgZ]  |                     |

#### Documenten

| Subcategorie | Profile                             | Source | Description                 |
| :----------- | :---------------------------------- | :----- | :-------------------------- |
| Documenten   | [IHE.MHD.Minimal.DocumentReference] | [Doc]  | Brieven, verslagen, beelden |

#### Medische klachten

| Subcategorie      | Profile       | Source | Description                     |
| :---------------- | :------------ | :----- | :------------------------------ |
| Medische klachten | [zib-Problem] | [BgZ]  | Alle bekende medische problemen |

#### Persoonlijke gegevens

| Subcategorie                                          | Profile                | Source      | Description           |
| :---------------------------------------------------- | :--------------------- | :---------- | :-------------------- |
| Persoonsgegevens, Burgerlijke staat & contactpersonen | [nl-core-patient]      | [BgZ], [GP] | Alle patient gegevens |
| "                                                     | [nl-core-patient-(R4)] | [Vac]       |                       |

#### Mentaal welzijn

| Subcategorie    | Profile                        | Source | Description                               |
| :-------------- | :----------------------------- | :----- | :---------------------------------------- |
| Mentaal welzijn | [zib-FunctionalOrMentalStatus] | [BgZ]  | Laatst bekende functionele/mentale status |

#### Waarschuwingen

| Subcategorie   | Profile     | Source | Description                 |
| :------------- | :---------- | :----- | :-------------------------- |
| Waarschuwingen | [zib-Alert] | [BgZ]  | Alle bekende waarschuwingen |

#### Leefstijl

| Subcategorie       | Profile               | Source | Description                 |
| :----------------- | :-------------------- | :----- | :-------------------------- |
| Leefomstandigheden | [zib-LivingSituation] | [BgZ]  | Huidige woonsituatie        |
| Drugsgebruik       | [zib-DrugUse]         | [BgZ]  | Alle bekende drugsgebruik   |
| Alcoholgebruik     | [zib-AlcoholUse]      | [BgZ]  | Alle bekende alcoholgebruik |
| Rookgedrag         | [zib-TobaccoUse]      | [BgZ]  | Alle bekende tabaksgebruik  |
| Voedingsadvies     | [zib-NutritionAdvice] | [BgZ]  | Alle bekende dieetadviezen  |

#### Medische hulpmiddelen

| Subcategorie          | Profile                    | Source | Description                   |
| :-------------------- | :------------------------- | :----- | :---------------------------- |
| Medische hulpmiddelen | [zib-MedicalDeviceProduct] | [BgZ]  | Bekende medische hulpmiddelen |
| "                     | [zib-MedicalDevice]        | [BgZ]  |                               |
| "                     | [zib-MedicalDeviceRequest] | [BgZ]  |                               |

#### Behandelplan

| Subcategorie   | Profile                  | Source | Description              |
| :------------- | :----------------------- | :----- | :----------------------- |
| Behandelwensen | [zib-TreatmentDirective] | [BgZ]  | Bekende behandelwensen   |
| Wilsverklaring | [zib-AdvanceDirective]   | [BgZ]  | Bekende wilsverklaringen |

#### Betaalgegevens

| Subcategorie   | Profile     | Source | Description                    |
| :------------- | :---------- | :----- | :----------------------------- |
| Betaalgegevens | [zib-Payer] | [BgZ]  | Bekende verzekeringsinformatie |

[MGO]: ../README.md

<!-- Data services -->

[gp]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data
[bgz]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017
[doc]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_PDFA
[vac]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V6/FHIR_Vaccination-Immunization

<!-- Fhir R3 -->

[zib-Payer]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Payer&scope=nictiz.fhir.nl.stu3.
[zib-TreatmentDirective]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective&scope=nictiz.fhir.nl.stu3.
[zib-AdvanceDirective]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective&scope=nictiz.fhir.nl.stu3.
[zib-MedicalDeviceProduct]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-MedicalDevice]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-MedicalDeviceRequest]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceRequest&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-MedicationUse]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-LivingSituation]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-DrugUse]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-AlcoholUse]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-TobaccoUse]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-NutritionAdvice]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-FunctionalOrMentalStatus]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-Alert]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Alert&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-MedicationAgreement]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-AdministrationAgreement]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-BloodPressure]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-BodyWeight]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-BodyHeight]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib&#8209;LaboratoryTestResult&#8209;Observation]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Observation&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-LaboratoryTestResult-Specimen]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-LaboratoryTestResult-Specimen&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-AllergyIntolerance]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-Procedure]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Procedure&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-ProcedureRequest]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-ProcedureRequest&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-Encounter]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Encounter&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-Vaccination]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-VaccinationRecommendation]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[zib-Problem]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/zib-Problem&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[gp-Encounter]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/gp-Encounter&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[gp-EncounterReport]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/gp-EncounterReport&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[gp-DiagnosticResult]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[gp-LaboratoryResult]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/gp-LaboratoryResult&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[nl-core-patient]: https://simplifier.net/resolve?target=simplifier&canonical=http://fhir.nl/fhir/StructureDefinition/nl-core-patient&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[IHE.MHD.Minimal.DocumentReference]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[eAfspraak-Appointment]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/eAfspraak-Appointment&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18
[nl-core-episodeofcare]: https://simplifier.net/resolve?canonical=http%3A%2F%2Ffhir.nl%2Ffhir%2FStructureDefinition%2Fnl-core-episodeofcare&scope=nictiz.fhir.nl.stu3.zib2017@2.2.18

<!-- Fhir R4 -->

[nl-core-patient-(R4)]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient&scope=nictiz.fhir.nl.r4.nl-core@0.8.0-beta.1
[nl-core-Vaccination-event-(R4)]: https://simplifier.net/resolve?target=simplifier&canonical=http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event&scope=nictiz.fhir.nl.r4.nl-core@0.8.0-beta.1
