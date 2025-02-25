# [MGO] - Data services

Currently we use the following data services in the application as described by MedMij:

| Short   | Data service                    | FHIR version | Description           |
| ------- | ------------------------------- | ------------ | --------------------- |
| **GP**  | [General practicioner][gp]      | R3           | Huisarts gegevens     |
| **BgZ** | [Common clinical dataset][bgz]  | R3           | Basisgegevensset Zorg |
| **Doc** | [PDF/A Documents][doc]          | R3           | Documenten            |
| **Vac** | [Vaccination-Immunization][vac] | R4           | Vaccinaties           |

## Usage

Below follows a description per data service, of all the endpoints and the specific headers and parameters that we use on all clients.

**All parameters should be [encoded]**

**Multiple parameters**  
Multiple parameters with the same name are appended (not combined).  
For example:  
_`_include=A`_ and _`_include=B`_ becomes _`_include=A&_include=B`_

## [Common clinical dataset (BgZ)][bgz]

### Headers

| name     | value                                    |
| -------- | ---------------------------------------- |
| `Accept` | `application/fhir+json; fhirVersion=3.0` |

### Endpoints

| #                | description                                                                       | path                          | params                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1 <br> 4 <br> 18 | Patient information <br> Contact persons <br> General Practitioner of the patient | `/Patient`                    | `_include=Patient:general-practitioner`                                                                                       |
| 2                | Payment details / Insurance information                                           | `/Coverage`                   | `_include=Coverage:payor:Patient` <br/> `_include=Coverage:payor:Organization`                                                |
| 3                | Treatment directives                                                              | `/Consent`                    | `category=http://snomed.info/sct\|11291000146105`                                                                             |
| 3                | Advance directives                                                                | `/Consent`                    | `category=http://snomed.info/sct\|11341000146107`                                                                             |
| 5                | Last known functional or mental status                                            | `/Observation/$lastn`         | `category=http://snomed.info/sct\|118228005,http://snomed.info/sct\|384821006`                                                |
| 6                | All known problems                                                                | `/Condition`                  |                                                                                                                               |
| 7                | Current living situation                                                          | `/Observation/$lastn`         | `code=http://snomed.info/sct\|365508006`                                                                                      |
| 7                | Drug use                                                                          | `/Observation`                | `code=http://snomed.info/sct\|228366006`                                                                                      |
| 7                | Alcohol use                                                                       | `/Observation`                | `code=http://snomed.info/sct\|228273003`                                                                                      |
| 7                | Tobacco use                                                                       | `/Observation`                | `code=http://snomed.info/sct\|365980008`                                                                                      |
| 7                | Dietary recommendations                                                           | `/NutritionOrder`             |                                                                                                                               |
| 8                | Alerts                                                                            | `/Flag`                       |                                                                                                                               |
| 9                | Information regarding allergies                                                   | `/AllergyIntolerance`         |                                                                                                                               |
| 10               | Medication use                                                                    | `/MedicationStatement`        | `category=urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3\|6` <br/> `_include=MedicationStatement:medication`                 |
| 10               | Medication agreements                                                             | `/MedicationRequest`          | `category=http://snomed.info/sct\|16076005` <br/> `_include=MedicationRequest:medication`                                     |
| 10               | Administration agreements                                                         | `/MedicationDispense`         | `category=http://snomed.info/sct\|422037009` <br/> `_include=MedicationDispense:medication`                                   |
| 11               | Medical aids                                                                      | `/DeviceUseStatement`         | `_include=DeviceUseStatement:device`                                                                                          |
| 12               | Vaccinations                                                                      | `/Immunization`               | `status=completed`                                                                                                            |
| 13               | Last known blood pressure                                                         | `/Observation/$lastn`         | `code=http://loinc.org\|85354-9`                                                                                              |
| 13               | Last known body weight                                                            | `/Observation/$lastn`         | `code=http://loinc.org\|29463-7`                                                                                              |
| 13               | Last known body height                                                            | `/Observation/$lastn`         | `code=http://loinc.org\|8302-2,http://loinc.org\|8306-3,http://loinc.org\|8308-9`                                             |
| 14               | Last known laboratory results per type                                            | `/Observation/$lastn`         | `category=http://snomed.info/sct\|275711006` <br/> `_include=Observation:related-target` <br> `_include=Observation:specimen` |
| 15               | Surgical procedures                                                               | `/Procedure`                  | `category=http://snomed.info/sct\|387713003`                                                                                  |
| 16               | Hospital admissions (no outpatient contacts)                                      | `/Encounter`                  | `class=http://hl7.org/fhir/v3/ActCode\|IMP,http://hl7.org/fhir/v3/ActCode\|ACUTE,http://hl7.org/fhir/v3/ActCode\|NONAC`       |
| 17               | Planned care activities - procedures                                              | `/ProcedureRequest`           | `status=active`                                                                                                               |
| 17               | Planned care activities - immunization                                            | `/ImmunizationRecommendation` |                                                                                                                               |
| 17               | Planned care activities - device requests                                         | `/DeviceRequest`              | `status=active` <br> `_include=DeviceRequest:device`                                                                          |
| 17               | Planned care activities - appointments                                            | `/Appointment`                | `status=booked,pending,proposed`                                                                                              |

<hr/>

## [General practitioner][gp]

We currently do not apply a date filter to the lab results since we want to show all the information that is available. If this causes performance issues we might change this later on.

### Headers

| name     | value                                    |
| -------- | ---------------------------------------- |
| `Accept` | `application/fhir+json; fhirVersion=3.0` |

### Variables

| used in # | variable  | example      | description                         |
| --------- | --------- | ------------ | ----------------------------------- |
| 8         | `[today]` | `2025-01-15` | `yyyy-mm-dd` value of today's date. |

### Endpoints

| #               | description                                                                                                                          | path                  | params                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 <br> 2        | Patient information <br> General Practitioner of the patient                                                                         | `/Patient`            | `_include=Patient:general-practitioner`                                                                                                                                 |
| 3 <br> 4 <br> 5 | Health concerns <br> Health concerns with associated alert <br> Episodes may be open (currently active) or closed (no longer active) | `/EpisodeOfCare`      |                                                                                                                                                                         |
| 8               | Current medication                                                                                                                   | `/MedicationRequest`  | `periodofuse=ge[today]` <br> `category=http://snomed.info/sct\|16076005` <br> `_include=MedicationRequest:medication`                                                   |
| 9               | Medication intolerance                                                                                                               | `/AllergyIntolerance` | `category=medication`                                                                                                                                                   |
| 11              | Diagnostic and lab results <br> _note: We currently do not use a date filter_                                                        | `/Observation`        | `code=https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen\|` <br> `_include=Observation:related-target` <br> `_include=Observation:specimen` |
| 12              | Information from an encounter, recorded in free text using the [SOAP] structure.                                                     | `/Composition`        | `type=http://loinc.org\|67781-5`                                                                                                                                        |
| 13              | Encounters                                                                                                                           | `/Encounter`          |                                                                                                                                                                         |

## [PDF/A Documents][doc]

For the PDF/A service we only requests the `DocumentReference` resources. There are also `DocumentManifest` resources which in itself contains mutliple `DocumentReference` resources in a certain context. <br> However at this moment we only show the `DocumentReference` resources individually.

The documents can be filtered on `status` or `indexed` date but we _do not use_ these at the moment.

### Headers

| name     | value                                    |
| -------- | ---------------------------------------- |
| `Accept` | `application/fhir+json; fhirVersion=3.0` |

### Endpoints

| description         | path                 | params |
| ------------------- | -------------------- | ------ |
| All known documents | `/DocumentReference` |        |

## [Vaccination-Immunization][vac]

The `Vaccination-Immunization` service can also return the `Patient`, `Location` and `Performer` via an `include` parameter, however we do not use this at the moment.

**The `Vaccination-Immunization` service uses the fhir version 4.0.**

### Headers

| name     | value                                    |
| -------- | ---------------------------------------- |
| `Accept` | `application/fhir+json; fhirVersion=4.0` |

### Endpoints

| description             | path            | params |
| ----------------------- | --------------- | ------ |
| All known immunizations | `/Immunization` |        |

<!-- Data services -->

[bgz]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_BGZ_2017
[gp]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_GP_Data
[doc]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V2020.01/FHIR_PDFA
[vac]: https://informatiestandaarden.nictiz.nl/wiki/MedMij:V6/FHIR_Vaccination-Immunization

<!-- Other -->

[MGO]: ../README.md
[encoded]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
[SOAP]: https://en.wikipedia.org/wiki/SOAP_note
