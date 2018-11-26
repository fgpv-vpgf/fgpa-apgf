# **Services**

A set of service endpoints used by the viewer.

>### **Services JSON tree**

&emsp; [**"services"**](#services): **{**<br/>
&emsp;&emsp;&emsp; ["proxyUrl"](#servicesproxyurl): ...,<br/>
&emsp;&emsp;&emsp; ["corsEverywhere"](#servicescorsEverywhere): ...,<br/>
&emsp;&emsp;&emsp; ["exportMapUrl"](#servicesexportmapurl): ...,<br/>
&emsp;&emsp;&emsp; ["geometryUrl"](#servicesgeometryurl): ...,<br/>
&emsp;&emsp;&emsp; ["googleAPIKey"](#servicesgoogleapikey): ...,<br/>
&emsp;&emsp;&emsp; ["esriLibUrl"](#servicesesriliburl): ...,<br/>
&emsp;&emsp;&emsp; [**"search"**](#servicessearch): {<br/>
&emsp;&emsp;&emsp;&emsp; ["disabledSearches"](#servicessearchdisabledsearches): [...],<br/>
&emsp;&emsp;&emsp;&emsp; [**"serviceUrls"**](#servicessearchserviceurls): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;     ["geoNames"](#servicessearchserviceurlsgeonames): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;     ["geoLocation"](#servicessearchserviceurlsgeolocation): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;     ["geoSuggest"](#servicessearchserviceurlsgeosuggest): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;     ["provinces"](#servicessearchserviceurlsprovinces): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;     ["types"](#servicessearchserviceurlstypes): ...,<br/>
&emsp;&emsp;&emsp;&emsp; }<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"export"**](#servicesexport): {<br/>
&emsp;&emsp;&emsp;&emsp;     [**"title"**](#servicesexporttitle): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexporttitle): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexporttitle): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["value"](#servicesexporttitle): ...<br/>
&emsp;&emsp;&emsp;&emsp;     },<br/>
&emsp;&emsp;&emsp;&emsp;     [**"map"**](#servicesexportmap): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexportmap): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexportmap): ...<br/>
&emsp;&emsp;&emsp;&emsp;     },<br/>
&emsp;&emsp;&emsp;&emsp;     [**"mapElements"**](#servicesexportmapelements): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexportmapelements): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexportmapelements): ...<br/>
&emsp;&emsp;&emsp;&emsp;     },<br/>
&emsp;&emsp;&emsp;&emsp;     [**"legend"**](#servicesexportlegend): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexportlegend): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexportlegend): ...<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["showInfoSymbology"](#servicesexportlegend): ...<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["showControlledSymbology"](#servicesexportlegend): ...<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["columnWidth"](#servicesexportlegend): ...<br/>
&emsp;&emsp;&emsp;&emsp;     },<br/>
&emsp;&emsp;&emsp;&emsp;     [**"footnote"**](#servicesexportfootnote): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexportfootnote): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexportfootnote): ...<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["value"](#servicesexportfootnote): ...<br/>
&emsp;&emsp;&emsp;&emsp;     },<br/>
&emsp;&emsp;&emsp;&emsp;     [**"timestamp"**](#servicesexporttimestamp): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelected"](#servicesexporttimestamp): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;         ["isSelectable"](#servicesexporttimestamp): ...<br/>
&emsp;&emsp;&emsp;&emsp;     }<br/>
&emsp;&emsp;&emsp;&emsp;     [**"timeout"**](#servicesexporttimeout): ...<br/>
&emsp;&emsp;&emsp;&emsp;     [**"cleanCanvas"**](#servicesexportcleancanvas): ...<br/>
&emsp;&emsp;&emsp; }<br/>
&emsp; *}*

>## **Services properties and definitions**

>## **services**
>>A set of service endpoints used by the viewer.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *object* ||| Services | - | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:_**`proxyUrl`**_](#services--proxyurl)
>>An optional proxy to be used for dealing with same-origin issues. URL must either be a relative path on the same server or an absolute path on a server which sets CORS headers.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://.../ProxyEndPoint"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:_**`corsEverywhere`**_](#services--corsEverywhere)
>>A boolean indicating that all services are CORS enabled. This is mutually exclusive with proxyUrl..

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `` | Services/Service End Points | Yes | - |


[:arrow_up: back to Services](#services-json-tree)
***
>### [services:_**`exportMapUrl`**_](#services--exportmapurl)
>>An ESRI service endpoint for generating map images.  Should point directly to an endpoint that can be consumed by ESRI PrintTask. NOTE: The PrintTask service has to be asynchronous.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://.../ExportMapEndPoint"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)
***
>### [services:_**`geometryUrl`**_](#services--geometryurl)
>>A URL to an ESRI ArcGIS geometry service REST endpoint.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://.../GeometryEndPoint"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)
***
>### [services:_**`googleAPIKey`**_](#services--googleapikey)
>>Google API key to enable geo location.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"AIzaSyBT6w4TvRdWFhFk35tc"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)
>### [services:_**`esriLibUrl`**_](#services--esriLibUrl)
>>ESRI JavaSCript API endpoint. Note, we can't use a version greater than v3.22.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://..."` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)
***
>### [services:_**`search`**_](#services--search)
>>Search properties including ability to disable certain types of searches (NTS, FSA, and/or LAT/LNG) and to set service endpoint urls.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *object* ||| Services/Geo Search | - | - |


>### [services:search:_**`disabledSearches`**_](#services--search--disabledSearches)
>>Enable specific types of searches including: National Topographic System, Postal Code/Foward Sorting Area or Latitude/Longitude (e.g. 58.12;-100.67).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `[]` | `["NTS","LAT/LNG"]` | Services/Geo Search | - | - |

>### [services:search:_**`serviceUrls`**_](#services--search--serviceurls)
>>Service endpoint urls.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *object* ||| Services/Geo Search | Yes | - |

>### [services:search:serviceUrls:_**`geoLocation`**_](#services--search--serviceurls)
>>Endpoint url for geoLocation service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/locate?q="` | Services/Geo Search | Yes | - |

>### [services:search:serviceUrls:_**`geoNames`**_](#services--searchervice--serviceurls)
>>Endpoint url for geoNames service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/geonames.json"` | Services/Geo Search | Yes | - |

>### [services:search:serviceUrls:_**`geoSuggest`**_](#services--search--serviceurls)
>>Endpoint url for geoSuggest service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/suggest?q="` | Services/Geo Search | Yes | - |

>### [services:search:serviceUrls:_**`provinces`**_](#services--search--serviceurls)
>>Endpoint url for provinces service

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/codes/province.json"` | Services/Geo Search | Yes | - |

>### [services:search:serviceUrls:_**`types`**_](#services--search--serviceurls)
>>Endpoint url for types service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/codes/concise.json"` | Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)
***
>### [services:_**`export`**_](#services--export)
>>Export properties.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | - | - |

>### [services:export:_**`title`**_](#services--export--title)
>>Export title's properties.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**title : isSelectable**](#services--export--title) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**title : isSelected**](#services--export--title) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**title : value**](#services--export--title) | *string* | Value to appear by default | `""` | `"My map title"` | Services/Export Map | - | - |

>### [services:export:_**`map`**_](#services--export--map)
>>Map component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | Yes | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**map : isSelectable**](#services--export--map) | *boolean* |  | `true` | `true` | Services/Export Map | Yes | - |
| [**map : isSelected**](#services--export--map) | *boolean* |  | `true` | `true` | Services/Export Map | Yes | - |

>### [services:export:_**`mapElements`**_](#services--export--mapelements)
>>North arrow and scalebar component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* |  | Services/Export Map | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**mapElements : isSelectable**](#services--export--mapelements) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**mapElements : isSelected**](#services--export--mapelements) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |

>### [services:export:_**`legend`**_](#services--export--legend)
>>Legend component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | Yes | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**legend : isSelectable**](#services--export--legend) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**legend : isSelected**](#services--export--legend) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**legend : showInfoSymbology**](#services--export--legend) | *boolean* |  | `false` | `true` | Services/Export Map | - | - |
| [**legend : showControlledSymbology**](#services--export--legend) | *boolean* |  | `false` | `true` | Services/Export Map | - | - |
| [**legend : columnWidth**](#services--export--legend) | *integer* |  | `350` | `true` | Services/Export Map | - | - |

>### [services:export:_**`footnote`**_](#services--export--footnote)
>>Foot notice to add to exported map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | Yes | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**footnote : isSelectable**](#services--export--footnote) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**footnote : isSelected**](#services--export--footnote) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**footnote : value**](#services--export--footnote) | *string* | Footnote value to appear by default | `""` | `"This is a foot notice"` | Services/Export Map | - | - |

>### [services:export:_**`timestamp`**_](#services--export--timestamp)
>>Timestamp component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**timestamp : isSelectable**](#services--export--timestamp)| *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**timestamp : isSelected**](#services--export--timestamp) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

### [services:export:_**`timeout`**_](#services--export--timeout)
>>A timeout delay in milliseconds after which the export image generation is considered to have failed. Defaults to 120sec.

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**timeout**](#services--export--timeout)| *integer* |  | `120` | `true` | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

### [services:export:_**`cleanCanvas`**_](#services--export--cleancanvas)
>>If set to true the export will omit layers and images that would cause issues with saving. If set to false users may need to save by right-clicking and selecting save image.

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**cleanCanvas**](#services--export--cleancanvas)| *boolean* |  | `false` | `true` | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

## **Annex**



>## **services : proxyUrl**

You can find more information about **proxy services** [here](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/working-with-proxies/).

```js
    "services"{
        ...,
        "proxyUrl": "http://.../ProxyEndPoint",
        ...
    }
```

[:arrow_up: back to proxyUrl](#servicesproxyurl)

>## **services : corsEverywhere**

```js
    "services"{
        ...,
        "corsEverywhere": false,
        ...
    }
```

[:arrow_up: back to corsEverywhere](#servicescorsEverywhere)

>## **services : exportMapUrl**

You can find more information about **exporting map to image services** [here](https://developers.arcgis.com/rest/services-reference/export-web-map-task.htm).

```js
    "services"{
        ...,
        "exportMapUrl": "http://.../ExportMapEndPoint",
        ...
    }
```

This service is used when you push the **DOWNLOAD** button of the [export](#services--export) dialog window.

![download](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-download.png)

[:arrow_up: back to exportMapUrl](#servicesexportmapurl)

>## **services : geometryUrl**

You can find more information about the **geometry services** [here](https://developers.arcgis.com/rest/services-reference/geometry-service.htm).

```js
    "services"{
        ...,
        "geometryUrl": "http://.../GeometryEndPoint",
        ...
    }
```

[:arrow_up: back to geometryUrl](#servicesgeometryurl)

>## **services : googleAPIKey**

You can find more information about the **google API Key service** [here](https://developers.google.com/maps/documentation/embed/get-api-key).

```js
    "services"{
        ...,
        "googleAPIKey": "AIzaSyBT6w4TvRdWFhFk35tc",
        ...
    }
```

[:arrow_up: back to googleAPIKey](#servicesgoogleapikey)


>## **services : ESRI Library URL**

SRI JavaSCript API endpoint. Note, we can't use a version greater than v3.22.

```js
    "services"{
        ...,
        "esriLibUrl": "http://...",
        ...
    }
```

[:arrow_up: back to esriLibUrl](#servicesesriliburl)


>## **services : search**

```js
    "services"{
        ...,
        "search": {
            "disabledSearches": [...],
            "serviceUrls": {...}
        }
        ...
    }
```

Searches can be done through the search bar.

![search](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-search.png)

[:arrow_up: back to search](#servicessearch)

>## services : search : disabledSearches

**Be cautious, the types of search identified in the array will be enabled in the viewer.**

```js
        "search": {
            "disabledSearches": ["NTS","LAT/LNG"],
            ...
        }
```

[:arrow_up: back to search](#servicessearchdisabledSearches)

>## services : search : serviceUrls

Default search services are provided by Natural Resources Canada and cover Canadian territories. You can find more information about thoses services here:

[GeoLocation API](https://www.nrcan.gc.ca/earth-sciences/geography/topographic-information/free-data-geogratis/geogratis-web-services/17216#g3): **"geoLocation"** and **"geoSuggest"**

[GeoNames API](https://www.nrcan.gc.ca/earth-sciences/geography/place-names/tools-applications/9249): **"geoNames"**, **"provinces"** and **"types"**

```js
    "search": {
        "serviceUrls":{
            "geoNames":"https://geogratis.gc.ca/services/geoname/en/geonames.json",
            "geoLocation":"https://geogratis.gc.ca/services/geolocation/en/locate?q=",
            "geoSuggest":"https://geogratis.gc.ca/services/geolocation/en/suggest?q=",
            "provinces":"https://geogratis.gc.ca/services/geoname/en/codes/province.json",
            "types":"https://geogratis.gc.ca/services/geoname/en/codes/concise.json"
        },
        ...
    }
```

[:arrow_up: back to serviceUrls](#servicessearchserviceurls)

>## **services : export**

```js
    "services"{
        ...,
        "export": {
            "title": {...},
            "map": {...},
            "mapElements": {...},
            "legend": {...},
            "footnote": {...},
            "timestamp": {...}
        },
        ...
    }
```

Accessing export dialog window

![Access](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-access.gif)

Accessing the export settings can be done through the settings button ![Settings-buttons](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-settings-button.png). Each element of the settings panel can be selected or not by setting the attribute **"isSelected"** and show or hide in the panel with the use of **"isSelectable"**.

![Settings](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-settings.png)

[:arrow_up: back to export](#servicesexport)

>## services : export : title

```js
    "export": {
      ...,
      "title": {
        "isSelectable": true,
        "isSelected": true,
        "value": "Export custom title"
      },
      ...
    }
```

![title](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-title.png)

[:arrow_up: back to title](#servicesexporttitle)

>## services : export : map

```js
    "export": {
      ...,
      "map": {
        "isSelectable": true,
        "isSelected": true
      },
      ...
    }
```

![map](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-map.png)

[:arrow_up: back to map](#servicesexportmap)

>## services : export : mapElements

```js
    "export": {
      ...,
      "mapElements": {
        "isSelectable": true,
        "isSelected": true
      },
      ...
    }
```

![mapElements](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-mapElements.png)

[:arrow_up: back to mapElements](#servicesexportmapelements)

>## services : export : legend

```js
    "export": {
      ...,
      "legend": {
        "isSelectable": true,
        "isSelected": true,
        "showInfoSymbology": false,
        "showControlledSymbology": false,
        "columnWidth": 350
      },
      ...
    }
```

![legend](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-legend.png)

[:arrow_up: back to legend](#servicesexportlegend)

>## services : export : footnote

```js
    "export": {
      ...,
      "footnote": {
        "isSelectable": true,
        "isSelected": true,
        "value": "This a footnote from the configuration file."
      },
      ...
    }
```

![footnote](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-footnote.png)

[:arrow_up: back to footnote](#servicesexportfootnote)

>## services : export : timestamp

```js
    "export": {
      ...,
      "timestamp": {
        "isSelectable": true,
        "isSelected": false
      },
      ...
    }
```

![timestamp](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/services-export-timestamp.png)

[:arrow_up: back to timestamp](#servicesexporttimestamp)

>## services : export : timeout

```js
    "export": {
      ...,
      "timeout": 120,
      ...
    }
```

[:arrow_up: back to timeout](#servicesexporttimeout)

>## services : export : cleanCanvas

```js
    "export": {
      ...,
      "cleanCanvas": false,
      ...
    }
```

[:arrow_up: back to cleanCanvas](#servicesexportcleancanvas)