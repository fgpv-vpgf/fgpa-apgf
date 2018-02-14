The following attributes are defined on the application's DOM node (e.g. `<div is="rv-map"></div>`).

**av-langs** (example: `data-rv-langs='["en-CA", "fr-CA"]'`)
> An array of strings containing language codes which are available for configuration

**av-config** (data-av-config=`["./config/config-authorA.json", "./config/config-authorB.json", "./config/config-full.json"]`)
> An array of string representing configuration template files script to load

**av-extensions** (example: `data-av-extensions='["Airports"]'`)
> An array of string representing extensions files script to load

**av-schema** (example: `data-av-schema="./schemaForm"`)
> Folder where the application will find schema pieces

Note that in the examples, all attributes are prefixed with `data-`; although not strictly necessary, this allows your HTML to pass HTML validation.
