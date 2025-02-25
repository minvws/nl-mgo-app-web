# [MGO] - About

## In a nutshell

Mijn Gezondheidsoverzicht is an application where a user can view medical information that different healthcare organizations have stored about them. After the user logs in, they can manually look up healthcare organizations that might have information on the user. Or in the near future, healthcare organizations are automatically found by using the user details.
The user can add these healthcare organizations to their overview, from where the medical data is retrieved and shown.

This application is developed for both `web` ,`ios` and `android`. This repository is for the `web` application.

### Data services

A healthcare organization can contain zero or multiple data services. Each data service contains a specific type of medical information that can be retrieved.

For example: data service with id `49` which contains medical data related to a general practitioner, or data service `51` which contains (PDF) documents.
Each data service has a specified list of available endpoints that are to be used for retrieving the data.
This information can be found on the [nictiz wiki][nictiz-wiki]. However to align the different clients (`web`/`ios`/`android`) for MGO (for example what to use for optional parameters) we also have a [list on all the used data service endpoints][mgo-endpoints].

> There is an HTTP client available for each data service type in the `data-services` package.

### From ZIB to UI

All the medical data provided by the healthcare organizations are based on [ZIB][zib] profiles. This information is returned from a data service in the [FHIR format][fhir]. For each ZIB that is used there is a related FHIR profile which attempts to translate the data of the ZIB model into a FHIR structure.
These FHIR profiles are published on [simplifier].

To get from this FHIR data to a [UI] showing the relevant information we process the FHIR data in 2 steps. This process is implemented in the `fhir-data` package and is used not only by `web` but also by the `ios` and `android` applications. This prevents use from having to write similar parsing functionality more than once. And ensures the same information is shown across all clients.

1. First we parse the FHIR data and create a simplified object.

The resulting object is still very close to the original FHIR data. But certain fields that would normally only be accesible deep inside [extensions][fhir-ext] become easily available on properties. This also creates a strong typed (TypeScript) model of this object. Which is not only used by `web` but is also exported as a [JSON Schema][json-schema]. This in turn is converted to both Kotlin (`android`) and Swift (`ios`) models, this ensures all clients have strong typed models for the health data that is used. We named this model a `MGO Resource` for now.

2. Convert the MGO Resource to a Health UI Schema.

We use the parsed resource to define a set of information to show in the user interface. We do this using a Health UI Schema. This is a schema that describes a set of ui elements containing health care data.

For example:

```
{
    "type": "SINGLE_VALUE",
    "label": "Deserunt recusandae culpa",
    "display": "Eum possimus"
}
```

Would render the following UI element:

![An example Health UI Schema element](images/health-ui-schema-element.png 'Health UI Schema element example')

This ensures all clients render the same elements. And makes it very easy to manage the information that is shown for certain medical data across all clients.

> An important reason for not parsing this data on a backend service is to avoid having a single service that processes / has access to all the sensitive information of all the users.

### To be continued

This should give you a general idea of how the MGO application currently works. But it is still very much a work in progress.

[MGO]: ../README.md
[UI]: ./glossary.md#UI
[nictiz-wiki]: https://informatiestandaarden.nictiz.nl/wiki/Hoofdpagina
[mgo-endpoints]: ./data-services.md
[fhir]: ./glossary.md#FHIR
[fhir-ext]: https://hl7.org/fhir/STU3/extensibility.html
[zib]: ./glossary.md#ZIB
[simplifier]: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18
[json-schema]: https://json-schema.org/
