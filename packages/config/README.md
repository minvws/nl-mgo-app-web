# Config

This package helps to coordinate retrieval and displaying FHIR data in categories.

## Data Services

For each data service, we've added a json file with all the endpoints for that data service and the profiles it will return.

```json
{
    "id": "51",
    "name": "Documents PDF/A",
    "fhirVersion": 3,
    "endpoints": [
        {
            "id": "documentReference",
            "url": "/DocumentReference",
            "profiles": [
                "http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference"
            ]
        }
    ]
}
```

### Variables

Following variables need to be replaced when executing requests:

- `{{today}}` needs to be replaced with today's date in `yyyy-mm-dd` format

## Categories

he different profiles are ordered into categories. There are category levels, the main category, a regular category and sub categories.

```json
[
    {
        "id": "health",
        "heading": "mhc_health.heading",
        "categories": [
            {
                "id": "vaccinations",
                "heading": "hc_vaccinations.heading",
                "subheading": "hc_vaccinations.subheading",
                "subcategories": [
                    {
                        "heading": "zib_vaccination.heading",
                        "profiles": [
                            "http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination",
                            "http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event"
                        ]
                    },
                    {
                        "heading": "zib_vaccination_recommendation.heading",
                        "profiles": [
                            "http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation"
                        ]
                    }
                ]
            },
            ...
```

A main category has a translation key for the main category heading and an array of categories.

A category is an array of subcategories with translation keys for a heading and a subheading

A subcategory has a translation key for the heading and an array of profiles it should display
