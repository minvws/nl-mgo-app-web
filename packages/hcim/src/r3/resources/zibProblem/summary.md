# Summary for zibProblem

## References

Simplifier: [nictiz.fhir.nl.stu3.zib2017](https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327)

## Summary Fields

| Label                  | ID           | Path                           | Optional |
| ---------------------- | ------------ | ------------------------------ | -------- |
| Aandoening             | NL-CM:5.1.3  | `x.code`                       |          |
| Locatie in het lichaam | NL-CM:5.1.11 | `x.bodySite`                   |          |
| Status                 | NL-CM:5.1.4  | `x.clinicalStatus`             |          |
| Extra uitleg           | NL-CM:5.1.5  | `x.note`                       | ✓        |
| **Periode**            |              |                                |          |
| Startdatum             | NL-CM:5.1.6  | `x.onset[x]:onsetDateTime`     |          |
| Einddatum              | NL-CM:5.1.9  | `x.onset[x]:abatementDateTime` |          |
| **Vastgesteld door**   |              |                                |          |
| Zorgaanbieder          |              | `Organization.name`            |          |
