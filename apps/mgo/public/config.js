/**
 * Note:
 *   These values will be overwritten when serving the application from the docker container.
 *   See the root README.md "Quick run" for more information.
 */
window.config = {
    oidc_authority: 'https://max.test.mgo.irealisatie.nl',
    oidc_client_id: 'mgo_dev',
    oidc_redirect_uri: 'http://localhost:8000',
    load_url: 'https://lo-ad.test.mgo.irealisatie.nl',
    dva_url: 'https://dva.test.mgo.irealisatie.nl',
};
