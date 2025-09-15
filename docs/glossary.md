# [MGO] - Glossary

This glossary introduces common MGO terminology.

## MGO

Mijn Gezondheidsoverzicht. An application where somone can view their own medical information that is stored by a healthcare organisation.

## Healthcare Organization

A Healthcare Organization that can provide medical information through data services. Such as a general practitioner or a hospital.

## Data Service

A server from a healthcare organization that contains medical data. There are different types of data services containing different types of information. Such as a Documents service or a General practitioner service. See the documentation on [data services][data-services] for further information.

## ZIB

[Zorginformatiebouwsteen][ZIB], the dutch name for HCIM.

## HCIM

Health and Care Information Model. The English name for a ZIB. A [HCIM] is an information model in which a care-based concept is described in terms of the data elements from which that concept exists, the data types of those data elements, etc.

## Health UI Schema

A schema that describes a set of ui elements containing health care data. This is used to ensure all client applications show the same information. It also prevents the need for multiple implementations for parsing FHIR data per platform (`web`/`ios`/`android`). See the `fhir-data` [package for more information][fhir-data]

## FHIR

HL7® FHIR® or [Fast Healthcare Interoperability Resources][FHIR]. The Fast Healthcare Interoperability Resources standard is a set of rules and specifications for the secure exchange of electronic health care data.

## (FHIR) Structure definition

A definition of a FHIR structure. This resource is used to describe the underlying resources, data types defined in FHIR, and also for describing extensions and constraints on resources and data types.
There are published definitions on [simplifier.net] for the ZIB's which we used to parse the data received from the [data services](#data-service).

## MGO Resource

A FHIR resource that has been parsed by the `fhir-data` package. It is a simplified model of the original FHIR Resource and has strong typed models available for both TypeScript, Kotlin and Swift. [See #about for more information][about-zibs]

## UI

User Interface; A user interface (UI) is the space where interactions between humans and machines occur.

## Package

An reusable module/chunk of code that can be integrated into a project. This repository is a [monorepo] containing multiple independent packages in the `packages/*` directory.

[MGO]: ../README.md
[FHIR]: https://fhir.org/
[ZIB]: https://zibs.nl/
[HCIM]: https://zibs.nl/wiki/HCIM_Mainpage
[monorepo]: https://en.wikipedia.org/wiki/Monorepo
[about-zibs]: ./about.md#hcim--zibs
[simplifier.net]: https://simplifier.net/
[fhir-data]: ../packages/fhir-data/README.md
