# Summary for eAfspraakAppointment

## References

Simplifier: [eAfspraak-Appointment](https://simplifier.net/packages/nictiz.fhir.nl.stu3.eafspraak/1.0.6/files/714361/)

## Summary Fields

| **Label**                                        | **ID**                   | **Path**              | **Optional** |
| ------------------------------------------------ | ------------------------ | --------------------- | ------------ |
| **[ Titel ]**                                    | eafspraak-dataelement-24 | `x.appointmentType`   |              |
| Contact type                                     | eafspraak-dataelement-24 | `x.appointmentType`   |              |
| Begin datum                                      | eafspraak-dataelement-6  | `x.start`             |              |
| Verrichting of probleem                          | eafspraak-dataelement-44 | `x.indication`        |              |
| Afwijkende uitslag                               | eafspraak-dataelement-46 | `x.reason`            |              |
| **Met wie u de afspraak had**                    |                          |                       |              |
| Contactpersoon, patiënt, zorgverlener of locatie | eafspraak-dataelement-33 | `x.participant.actor` |              |
| Specialisme                                      | eafspraak-dataelement-26 | `x.specialty`         |              |
| Zorgaanbieder                                    | –                        | `Organization.name`   |              |
