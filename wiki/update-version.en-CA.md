Work in progress...
Show examples

### 1. Update constants
In [/src/app/core/constant.service.js](https://github.com/fgpv-vpgf/fgpa-apgf/blob/develop/src/app/core/constant.service.js#L51) change constants value:

Set the new develop and production versions

``` 
devVersion: 2.4
```
``` 
prodVersion: 2.3
```

### 2. Update version.{language}.json
[](src/schemas/schemaForm/version.fr-CA.json)

```js 
        "version": {
            "title": "Version",
            "type": "string",
            "enum": [
                "2.3",
                "2.4"
            ],
            "default": "2.3",
            "description": "The viewer version used to validate the configuration file."
        }
```

### 3. Remove development version tag in schemas

Remove existing **av-version-dev** tags in forms

> { 'key': 'layers[].refreshInterval', 'htmlClass': 'av-form-advance hidden ~~av-version-dev~~' },


### 4. Simplify forms 

```
  { 'key': 'baseMaps[].attribution.logo' }
      // { 'key': 'baseMaps[].attribution.logo' }
     // To be brought back with version 2.5 since we want the new element altext (v2.4) to be hide with prod version (2.3)
           { 'key': 'baseMaps[].attribution.logo', 'items': [
           { 'key': 'baseMaps[].attribution.logo.enabled' },
           { 'key': 'baseMaps[].attribution.logo.value' },
           { 'key': 'baseMaps[].attribution.logo.altText', 'htmlClass': 'av-form-advance hidden  av-version-dev  av-version-dev-hide' },
           { 'key': 'baseMaps[].attribution.logo.link' }
           ]}
```
### 5. Add/remove objects in schemas depending on schema modifications

### 6. Update forms and add classes for added objects

Add **av-version-dev** and **av-version-dev-hide** tags to new elements in forms

> { 'key': 'layers[].refreshInterval', 'htmlClass': 'av-form-advance hidden **av-version-dev**  **av-version-dev-hide**' },

### 7. Add wathever is needed to process new parameters


## **Example**

We have a new object called **altText** which is a new property of the `logo` object for the new viewer version `2.4`.

**In the viewer schema**
```js
    "logo": {
        "type": "object",
        "properties": {
            "enabled": { "type": "boolean", "default": true },
```

                "altText": { "type": "string", "description": "Alternate text for the image." },

```js
            "value": { "type": "string", "description": "URL for the image." },
            "link": { "type": "string", "description": "URL to go to when clicked." }
        },
        "required": [ "enabled" ],
        "additionalProperties": false
    }
```

**In the form**

The parent object `logo` already exists in the Angular Schema Form form.
```js
  { 'key': 'baseMaps[].attribution.logo' }
```
You can see an implicit declaration of the `logo` since none of the logo's properties need special treatment.

### **Step 1**

**In the Author schema**

Add the new object in the proper Author schema and add a property named `version` with the version number (`2.4` in the example) which introduce the new property.

```js
  "logo": {
        "type": "object",
        "properties": {
        "enabled": {
            ...
        },
      "value": {
          ...
        },
```

            "altText": {
            "type": "string",
            "title": "Alternate text",
            "version": "2.4",
            "description": "Alternate text for the image."
            },

```js
        "link": {
            ...
        }
    },
    ...
  }
```

**In the form**

Put in a comment the `logo` form declaration and add another explaining what you're going to do with the modification in the next version.
Then declare explicitly all the properties of `logo` with the new property.

```
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the new element altext (v2.4) to be hide with prod version (2.3)
        { 'key': 'baseMaps[].attribution.logo', 'items': [
        { 'key': 'baseMaps[].attribution.logo.enabled' },
        { 'key': 'baseMaps[].attribution.logo.value' },
        { 'key': 'baseMaps[].attribution.logo.altText' },
        { 'key': 'baseMaps[].attribution.logo.link' }
        ]}
```
Add html class **av-version-dev** and **av-version-dev-hide** to the new peoperty.

`{ 'key': 'baseMaps[].attribution.logo.altText', ` **'htmlClass': 'av-version-dev  av-version-dev-hide**' `}`,

To finally obtain
```
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the new element altext (v2.4) to be hide with prod version (2.3)
           { 'key': 'baseMaps[].attribution.logo', 'items': [
           { 'key': 'baseMaps[].attribution.logo.enabled' },
           { 'key': 'baseMaps[].attribution.logo.value' },
           { 'key': 'baseMaps[].attribution.logo.altText', 'htmlClass': 'av-version-dev  av-version-dev-hide' },
           { 'key': 'baseMaps[].attribution.logo.link' }
           ]}
```

### **Step 2**


### **Step 3**

The final process get an end with a new viewer version; in our case `2.5`.

BLABLABLA here

**In the Author schema**

```js
  "logo": {
        "type": "object",
        "properties": {
        "enabled": {
            ...
        },
      "value": {
          ...
        },
```

            "altText": {
            "type": "string",
            "title": "Alternate text",
            ~~"version": "2.4",~~
            "description": "Alternate text for the image."
            },

```js
        "link": {
            ...
        }
    },
    ...
  }
```

**In the form**

From
```
    // { 'key': 'baseMaps[].attribution.logo' }
    // To be brought back with version 2.5 since we want the new element altext (v2.4) to be hide with prod version (2.3)
           { 'key': 'baseMaps[].attribution.logo', 'items': [
           { 'key': 'baseMaps[].attribution.logo.enabled' },
           { 'key': 'baseMaps[].attribution.logo.value' },
           { 'key': 'baseMaps[].attribution.logo.altText', 'htmlClass': 'av-version-dev  av-version-dev-hide' },
           { 'key': 'baseMaps[].attribution.logo.link' }
           ]}
```
To
```
  { 'key': 'baseMaps[].attribution.logo' }
```