# Summary for Document

## References

Simplifier: [Nictiz.IHE.MHD.Minimal.DocumentReference](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.3.2/files/3018952/~overview)
Display Guideline: [Medmij.nl](https://changemanagement.medmij.nl/weergaverichtlijnen-verzamelen-documenten-pdf-a/actueel/weergaverichtlijn-verzamelen-documenten-3-0-pdf-a-)

## Summary Fields

| Label            | ID  | Path                                     | Optional |
| ---------------- | --- | ---------------------------------------- | -------- |
| Titel            |     | `resource.content[0].attachment.title`   |          |
| Gemaakt op       |     | `resource.indexed`                       |          |
| Soort            |     | `resource.type`                          |          |
| **Bijlage**      |     |                                          |          |
| Titel            |     | `resource.content[...].attachment.title` |          |
| **Gemaakt door** |     |                                          |          |
| Zorgverlener     |     | `resource.author`                        |          |
| Zorgorganisatie  |     | `context.organization`                   |          |
