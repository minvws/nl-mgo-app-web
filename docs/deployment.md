# [MGO] - Deployment

The release package can be downloaded from the artifacts of [the "Create release package" CI workflow][github-artifact].
The contents of the package can be hosted as an SPA, with non-existing routes being served the `index.html`.
Configuration can be provided by overwriting the `config.js` file with environment-specific values. The structure of this file is as follows:

```js
window.config = {
    oidc_authority: string,
    oidc_client_id: string,
    oidc_redirect_uri: string,
    load_url: string,
    dva_url: string,
};
```

| Field               | Description                                                                          | Default value                                |
| ------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| `oidc_authority`    | URI of the OIDC authority (the root path before `.well-known/openid-configuration`). | `'https://max.acc.mgo.nl'`                   |
| `oidc_client_id`    | OIDC client ID.                                                                      | `'mgo_dev'`                                  |
| `oidc_redirect_uri` | URI of the application itself, as allowlisted for the given client ID.               | `'http://localhost:8000'`                    |
| `load_url`          | The url for the load service that is to be used.                                     | `'https://lo-ad.test.mgo.irealisatie.nl'`    |
| `dva_url`           | The url for the DVA service that is to be used.                                      | `'https://dva.test.mgo.irealisatie.nl/fhir'` |

[MGO]: ../README.md
[github-artifact]: https://github.com/minvws/nl-mgo-app-web-private/actions/workflows/package.yml
