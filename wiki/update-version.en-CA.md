# Guide to upgrade Author version

This is a non-exhaustive guide to help you when it's time to upgrade the Author version.
It is recommanded to follow the steps in the proposed order.

- [**1. Update constants**](#1-update-constants)
- [**2. Update version.{language}.json**](#2-update-versionlanguagejson)
- [**3. Remove development version tags in schemas**](#3-remove-development-version-tags-in-schemas)
- [**4. Simplify forms if needed**](#4-simplify-forms-if-needed)
- [**5. Add/remove objects in schemas depending on schema modifications**](#5-addremove-objects-in-schemas-depending-on-schema-modifications)
- [**6. Update forms and add classes for added objects**](#6-update-forms-and-add-classes-for-added-objects)
- [**7. Add wathever is needed to process new parameters**](#7-add-wathever-is-needed-to-process-new-parameters)
- [**8. Update schema(s) on wiki**](#8-update-schemas-on-wiki)
- [**9. Example**](#9-example)
- [**9.1 Introduce the new element in the development version**](#91-introduce-the-new-element-in-the-development-version)
- [**9.2 Set the element has a standard element of the production version**](#92-set-the-element-has-a-standard-element-of-the-production-version)

### **1. Update constants**
In [/src/app/core/constant.service.js](https://github.com/fgpv-vpgf/fgpa-apgf/blob/develop/src/app/core/constant.service.js#L51) change constants value:

Set the new develop and production versions

```js
devVersion: 2.4
```

```js
prodVersion: 2.3
```

[Back to top](#guide-to-upgrade-author-version)

### **2. Update version.{language}.json**

You'll have to both modify the `enum[]` list and the `default` value in both `version` files.

In this example `2.3` becomes de production version and `2.4` the development one.
The previous production version is removed (`2.2`).

>&emsp;"version": { <br/>
>&emsp;&emsp;"title": "Version", <br/>
>&emsp;&emsp;"type": "string", <br/>
>&emsp;&emsp;**"enum": [** <br/>
>&emsp;&emsp;&emsp;**"2.3",** ~~`"2.2"`~~ <br/>
>&emsp;&emsp;&emsp;**"2.4"** <br/>
>&emsp;&emsp;**],** <br/>
>&emsp;&emsp;**"default": "2.3",** ~~`"2.2"`~~ <br/>
>&emsp;&emsp;"description": "The viewer version used to validate the configuration file." <br/>
>&emsp;} <br/>

The English file:
[src/schemas/schemaForm/version.en-CA.json](https://github.com/fgpv-vpgf/fgpa-apgf/blob/develop/src/schemas/schemaForm/version.en-CA.json)

The French file:
[src/schemas/schemaForm/version.fr-CA.json](https://github.com/fgpv-vpgf/fgpa-apgf/blob/develop/src/schemas/schemaForm/version.fr-CA.json)

[Back to top](#guide-to-upgrade-author-version)

### **3. Remove development version tags in schemas**

Remove existing **av-version-dev** and **av-version-dev-hide** tags in forms. Those tags identified the elements that are part of the development version. By removing these tags, the element is now promote as part of the new production version.

> { 'key': 'layers[].refreshInterval', 'htmlClass': 'av-form-advance hidden ~~av-version-dev~~ ~~av-version-dev-hide~~' },

[Back to top](#guide-to-upgrade-author-version)

### **4. Simplify forms if needed**

See [example](#92-set-the-element-has-a-standard-element-of-the-production-version)

[Back to top](#guide-to-upgrade-author-version)

### **5. Add/remove objects in schemas depending on schema modifications**

Add/remove element in the proper Author schema file.
See [example](#9-example)

If an element is required in the new development version, remove it from the required list in the Author schema and put it back when the development version becomes the production version.

`IMPORTANT Removing element has not been tested yet.`

[Back to top](#guide-to-upgrade-author-version)

### **6. Update forms and add classes for added objects**

Add **av-version-dev** and **av-version-dev-hide** tags to new elements in forms

> { 'key': 'layers[].refreshInterval', 'htmlClass': 'av-form-advance hidden **av-version-dev**  **av-version-dev-hide**' },

Note: you may also have to add advance parameter class (**av-form-advance hidden**).

[Back to top](#guide-to-upgrade-author-version)

### **7. Add wathever is needed to process new parameters**

You can add an onChange function to it or add restriction to a field. There's many ways you may want to modify the behaviour of the Author regarding a new element.

[Back to top](#guide-to-upgrade-author-version)

### **8. Update schema(s) on wiki**

You can also modify/update the schema documentation [here](https://github.com/fgpv-vpgf/fgpa-apgf/wiki/FGPV_schema_doc).

[Back to top](#guide-to-upgrade-author-version)

### **9. Example**

We have a new object called **altText** which is a new property of the `logo` object for the new viewer version `2.4`.

**In the viewer 2.4 schema**

>&emsp; "logo": { <br/>
>&emsp;&emsp;"type": "object", <br/>
>&emsp;&emsp;"properties": { <br/>
>&emsp;&emsp;&emsp;"enabled": { "type": "boolean", "default": true }, <br/>
>&emsp;&emsp;&emsp;**"altText": { "type": "string", "description": "Alternate text for the image." },** <br/>
>&emsp;&emsp;&emsp;"value": { "type": "string", "description": "URL for the image." }, <br/>
>&emsp;&emsp;&emsp;"link": { "type": "string", "description": "URL to go to when clicked." } <br/>
>&emsp;&emsp;}, <br/>
>&emsp;&emsp;"required": [ "enabled" ], <br/>
>&emsp;&emsp;"additionalProperties": false <br/>
>&emsp;} <br/>

**In the form**

The parent object `logo` already exists in the Angular Schema Form form.
```js
  { 'key': 'baseMaps[].attribution.logo' }
```
You can see an implicit declaration of the `logo` since none of the logo's properties need special treatment.

### **9.1 Introduce the new element in the development version**

**In the Author schema**

Add the new object in the proper Author schema and add a property named `version` with the version number (`2.4` in the example) which introduce the new property.

>&emsp;"logo": { <br/>
>&emsp;&emsp;"type": "object", <br/>
>&emsp;&emsp;"properties": { <br/>
>&emsp;&emsp;&emsp;"enabled": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;}, <br/>
>&emsp;&emsp;&emsp;"value": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;}, <br/>
>&emsp;&emsp;&emsp;**"altText": {** <br/>
>&emsp;&emsp;&emsp;&emsp;**"type": "string",** <br/>
>&emsp;&emsp;&emsp;&emsp;**"title": "Alternate text",** <br/>
>&emsp;&emsp;&emsp;&emsp;**"version": "2.4",** <br/>
>&emsp;&emsp;&emsp;&emsp;**"description": "Alternate text for the image."** <br/>
>&emsp;&emsp;&emsp;**},** <br/>
>&emsp;&emsp;&emsp;"link": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;} <br/>
>&emsp;&emsp;}, <br/>
>&emsp;... <br/>
>&emsp;}


**In the form**

Put in a comment the `logo` form declaration and add another explaining what you're going to do with the modification in the next version.
Then declare explicitly all the properties of `logo` with the new property.

```js
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the
    // new element altext (v2.4) to be hide with prod version (2.3)
        { 'key': 'baseMaps[].attribution.logo', 'items': [
        { 'key': 'baseMaps[].attribution.logo.enabled' },
        { 'key': 'baseMaps[].attribution.logo.value' },
        { 'key': 'baseMaps[].attribution.logo.altText' },
        { 'key': 'baseMaps[].attribution.logo.link' }
        ]}
```

Add html class **av-version-dev** and **av-version-dev-hide** to the new peoperty.

`{ 'key': 'baseMaps[].attribution.logo.altText', ` **'htmlClass': 'av-version-dev  av-version-dev-hide**' `}`,

To finally obtain:

```js
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the
    // new element altext (v2.4) to be hide with prod version (2.3)
           { 'key': 'baseMaps[].attribution.logo', 'items': [
           { 'key': 'baseMaps[].attribution.logo.enabled' },
           { 'key': 'baseMaps[].attribution.logo.value' },
           {
               'key': 'baseMaps[].attribution.logo.altText',
               'htmlClass': 'av-version-dev  av-version-dev-hide'
            },
           { 'key': 'baseMaps[].attribution.logo.link' }
           ]}
```

### **9.2 Set the element has a standard element of the production version**

The final process get an end with a new viewer version; in our case `2.5`.


**In the Author schema**

Remove version attribute.

>&emsp;"logo": { <br/>
>&emsp;&emsp;"type": "object", <br/>
>&emsp;&emsp;"properties": { <br/>
>&emsp;&emsp;&emsp;"enabled": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;}, <br/>
>&emsp;&emsp;&emsp;"value": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;}, <br/>
>&emsp;&emsp;&emsp;**"altText": {** <br/>
>&emsp;&emsp;&emsp;&emsp;**"type": "string",** <br/>
>&emsp;&emsp;&emsp;&emsp;**"title": "Alternate text",** <br/>
>&emsp;&emsp;&emsp;&emsp;~~**"version": "2.4",**~~ <br/>
>&emsp;&emsp;&emsp;&emsp;**"description": "Alternate text for the image."** <br/>
>&emsp;&emsp;&emsp;**},** <br/>
>&emsp;&emsp;&emsp;"link": { <br/>
>&emsp;&emsp;&emsp;&emsp;... <br/>
>&emsp;&emsp;&emsp;} <br/>
>&emsp;&emsp;}, <br/>
>&emsp;... <br/>
>&emsp;}

**In the form**

Get back to the implicit declaration of the `logo` object.

From
```js
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the
    // new element altext (v2.4) to be hide with prod version (2.3)
           { 'key': 'baseMaps[].attribution.logo', 'items': [
           { 'key': 'baseMaps[].attribution.logo.enabled' },
           { 'key': 'baseMaps[].attribution.logo.value' },
           {
                'key': 'baseMaps[].attribution.logo.altText',
                'htmlClass': 'av-version-dev  av-version-dev-hide'
            },
           { 'key': 'baseMaps[].attribution.logo.link' }
           ]}
```

To

```js
  { 'key': 'baseMaps[].attribution.logo' }
```
[Back to top](#guide-to-upgrade-author-version)