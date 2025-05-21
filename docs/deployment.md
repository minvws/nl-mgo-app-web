# [MGO] - Deployment

The release package can be downloaded from the artifacts of [the "Create release package" CI workflow][github-artifact].
The contents of the package can be hosted as an SPA, with non-existing routes being served the `index.html`.
Configuration can be provided by overwriting the `config.js` file with environment-specific values. The structure of this file is as follows:

```js
window.config = {
    load_url: string,
    dva_url: string,
};
```

| Field      | Description                                      | Default value                                      |
| ---------- | ------------------------------------------------ | -------------------------------------------------- |
| `load_url` | The url for the load service that is to be used. | `'https://lo-ad.test.mgo.irealisatie.nl'`          |
| `dva_url`  | The url for the DVA service that is to be used.  | `'https://dvp-proxy.test.mgo.irealisatie.nl/fhir'` |

[MGO]: ../README.md
[github-artifact]: https://github.com/minvws/nl-mgo-app-web-private/actions/workflows/package.yml
