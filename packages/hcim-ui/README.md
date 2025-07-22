# @minvws/mgo-hcim-ui

This package contains functionality for transforming Mgo resources into Health Ui Schemas.

For more context on why / how this is used please [visit the about documentation][about-zib-ui].

## Health UI Schema

A Health UI Schema is a schema that describes a set of ui elements containing health care data. This ensures all clients render the same content. And makes it very easy to manage the information that is shown for certain medical data across all clients.

Here is an example of a Health UI Schema:

```
{
    "label": "Quibusdam tempora nobis",
    "children": [
        {
            "label": "Maiores",
            "children": [
                { "type": "SINGLE_VALUE", "label": "Magni quasi", "display": "Natus nobis" },
                {
                    "type": "REFERENCE_VALUE",
                    "label": "Magni quasi",
                    "display": "Natus nobis",
                    "reference": "Repellendus/perferendis-quisquam-est-123"
                }
            ]
        },
        {
            "label": "Accusantium",
            "children": [
                {
                    "type": "SINGLE_VALUE",
                    "label": "Consectetur aliquid voluptatibus",
                    "display": "Blanditiis"
                }
            ]
        }
    ]
}
```

The Health UI Schema above would render the following content:

![An example Health UI Schema](health-ui-schema.png 'Health UI Schema example')

<hr>

See the **[package source][source]** for more details

_This package and its documentation are still under development._

[MGO]: ../../README.md
[FHIR]: ../../docs/glossary.md#FHIR
[ZIB]: ../../docs/glossary.md#ZIB
[about-zib-ui]: ../../docs/about.md#from-zib-to-ui
[fhir-bundle]: https://build.fhir.org/bundle.html
[repo]: https://github.com/minvws/nl-mgo-app-web
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/hcim-ui
