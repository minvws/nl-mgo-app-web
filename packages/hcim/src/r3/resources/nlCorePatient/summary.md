# nl-core-patientCommunication

## References

Simplifier: [nl-core-patient](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041)

## Summary Fields

| **Label**           | **ID**       | **Path**                | **Optional** | toelichting                |
| ------------------- | ------------ | ----------------------- | ------------ | -------------------------- |
| Naam                | NL-CM:0.1.6  | `Patient.name`          |              |                            |
| Geboortedatum       | NL-CM:0.1.10 | `x.birthDate`           |              |                            |
| Geslacht            | NL-CM:0.1.9  | `x.gender`              |              |                            |
| Huisarts            | NL-CM:17.2.1 | `x.generalPractitioner` |              |                            |
| **Contactgegevens** |              |                         |              |                            |
| Adres               | NL-CM:0.1.4  | `x.address`             |              | Alleen het officiële adres |
| Telefoon            | NL-CM:0.1.5  | `x.telecom`             |              |                            |
| Email               | NL-CM:0.1.5  | `x.telecom`             |              |                            |
| **Contactpersoon**  |              |                         |              |                            |
| Naam                | NL-CM:3.1.4  | `x.contact.name`        |              |                            |
| Telefoon            | NL-CM:3.1.6  | `x.contact.telecom`     |              |                            |
| **Vastgelegd door** |              |                         |              |                            |
| Zorgaanbieder       | -            | `Organization.name`     |              |                            |
