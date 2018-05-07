# **UI**

User Interface configuration

>### **UI JSON tree**

&emsp; [**"ui"**](#ui): **{**<br/>
&emsp;&emsp;&emsp; ["fullscreen"](#uifullscreen): ...,<br/>
&emsp;&emsp;&emsp; ["theme"](#uitheme): ...,<br/>
&emsp;&emsp;&emsp; ["logoUrl"](#uilogourl): ...,<br/>
&emsp;&emsp;&emsp; ["title"](#uititle): ...,<br/>
&emsp;&emsp;&emsp; ["restrictNavigation"](#uirestrictnavigation): ...,<br/>
&emsp;&emsp;&emsp; [**"failureFeedback"**](#uifailurefeedback): {<br/>
&emsp;&emsp;&emsp;&emsp; ["failureMessage"](#uifailurefeedbackfailuremessage): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["failureImageUrl"](#uifailurefeedbackfailureimageurl): ...<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"appBar"**](#uiappbar): {<br/>
&emsp;&emsp;&emsp;&emsp; ["sideMenu"](#uiappbarsidemenu): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["geoSearch"](#uiappbargeosearch): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["basemap"](#uiappbarbasemap): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["layers"](#uiappbarlayers): ...<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"navBar"**](#uinavbar): {<br/>
&emsp;&emsp;&emsp;&emsp; ["extra"](#uinavbarextra): ...<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"sideMenu"**](#uisidemenu): {<br/>
&emsp;&emsp;&emsp;&emsp; ["logo"](#uisidemenulogo): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["items"](#uisidemenuitems): [   ]<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"about"**](#uiabout): {<br/>
&emsp;&emsp;&emsp;&emsp; ["content"](#uiaboutcontent): ...,<br/>
&emsp;&emsp;&emsp;     OR<br/>
&emsp;&emsp;&emsp;&emsp; ["folderName"](#uiaboutfoldername): ...<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"help"**](#uihelp): {<br/>
&emsp;&emsp;&emsp;&emsp; ["folderName"](#uifoldername): ...,<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"legend"**](#uilegend): {<br/>
&emsp;&emsp;&emsp;&emsp; ["reorderable"](#uilegendreorderable): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["allowImport"](#uilegendallowimport): ...,<br/>
&emsp;&emsp;&emsp;&emsp; [**"isOpen"**](#uilegendisopen): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; ["large"](#uilegendisopenlarge): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; ["medium"](#uilegendisopenmedium): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; ["small"](#uilegendisopensmall): ...<br/>
&emsp;&emsp;&emsp;&emsp; }<br/>
&emsp;&emsp;&emsp; },<br/>
&emsp;&emsp;&emsp; [**"tableIsOpen"**](#uitableisopen): {<br/>
&emsp;&emsp;&emsp;&emsp; ["id"](#uitableisopenid): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["large"](#uitableisopenlarge): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["medium"](#uitableisopenmedium): ...,<br/>
&emsp;&emsp;&emsp;&emsp; ["small"](#uitableisopensmall): ...<br/>
&emsp;&emsp;&emsp; }<br/>
&emsp; **}**


>## **ui**
>>User Interface configuration.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`fullscreen`**_](#ui--fullscreen)
>>Indicates viewer takes up entire viewport at first load.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`theme`**_](#ui--theme)
>>UI theme of the viewer. For now, only "default" value is available

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `"default"` | `"default"` | UI/TBD | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`logoUrl`**_](#ui--logourl)
>>An optional image to be used in the place of the default viewer logo.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | UI/Side Menu | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`title`**_](#ui--title)
>>An optional title to be used in the place of the default viewer title.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `My custom title` | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`restrictNavigation`**_](#ui--restrictnavigation)
>>Will restrict the user from panning beyond the maximum extent.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/Navigation | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`failureFeedback`**_](#ui--failurefeedback)
>>Failure information.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | Yes | - |

>### [ui:failureFeedback:_**`failureMessage`**_](#ui--failurefeedback)
>>An optional message to be used in place of the failure message.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - |`"That's a fail :-("`| UI/General | Yes | - |

>### [ui:failureFeedback:_**`failureImageUrl`**_](#ui--failurefeedback)
>>An optional image to be used in place of the failure Image.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://path2Image/MyFailureImage.gif"` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`appBar`**_](#ui--appbar)
>>Provides configuration to the main app toolbar. If not supplied, the default appbar controls are displayed. To completely hide the toolbar, provide the following: { sideMenu: false, geoSearch: false, layers: false }.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Application Bar | - | - |

>### [ui:appBar:_**`sideMenu`**_](#ui--appbar)
>>Shows the side menu button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

>### [ui:appBar:_**`geoSearch`**_](#ui--appbar)
>>Shows the geosearch button in the main app toolbar. The button will be hidden if geosearch component is disabled or no search service URLs are provided.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

>### [ui:appBar:_**`basemap`**_](#ui--appbar)
>>Shows the basemap selector button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean*  | `true` | `true` | UI/Application Bar | - | - |

>### [ui:appBar:_**`layers`**_](#ui--appbar)
>> Shows the layers button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`navBar`**_](#ui--navbar)
>>Provides configuration to the nav bar. If not supplied the default nav bar buttons are shown.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Navigation | - | - |

>### [ui:navBar:_**`extra`**_](#ui--navbar)
>>Set visible navigation bar buttons. Possible values: _**`"geoLocator", "home", "basemap", "help", "fullscreen", "geoSearch", "sideMenu", "layers"`**_

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `["fullscreen", "geoLocator", "home", "help"]` | `["home", "help", "fullscreen", "geoSearch", "sideMenu", "layers"]` | UI/Navigation | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`sideMenu`**_](#ui--sidemenu)
>>Specifies which options are available in the left side menu.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | - | - |

>### [ui:sideMenu:_**`logo`**_](#ui--sidemenu)
>>Indicates if the logo should be shown in the left side menu.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Side Menu | Yes | - |

>### [ui:sideMenu:_**`items`**_](#ui--sidemenu)
>>Side Menu set of buttons. Divide the menu using array symbols _**`[]`**_.  Possible values are _**`"layers", "basemap", "geoSearch", "about", "fullscreen", "export", "share", "touch", "help", "language", "plugins"`**_

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `[["layers", "basemap"], ["fullscreen", "export", "share", "touch", "help", "about"], ["language"], ["plugins"]]` |`[["layers", "basemap"], ["fullscreen", "export", "about"], ["language"]]`| UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`about`**_](#ui--about)
>>Specifies the location/content of the about section.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | - | - |

>### [ui:about:_**`content`**_](#ui--about)
>>The content of the about section.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"This is about about"` | UI/Side Menu | - | - |

>### [ui:about:_**`folderName`**_](#ui--about)
>>Help folder name which contains the about file(s) and image(s). The viewer will look inside a folder named **about** for the specified folder name (e.g. /about/`aboutisHere`). Afterward, it'll check for a markdown file named `en-CA.md` if you are in the English flavor of the viewer and `fr-CA.md` for the French. Images need to reside inside the specified folder.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `aboutIsHere` | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`help`**_](#ui--help)
>> Specifies details for the Help section.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | Yes | - |

>### [ui:help:_**`folderName`**_](#ui--help)
>>Help folder name which contains the help description and image(s). The viewer will look inside a folder named **help** for the specified folder name (e.g. /help/`helpIsHere`). Afterward, it'll check for a markdown file named `en-CA.md` if you are in the English flavor of the viewer and `fr-CA.md` for the French. Images need to reside inside the specified folder.
**NOTE** The viewer has already a default help. Consequently, you will use this parameter only if you want a custom help.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `HelpIsHere` | UI/Side Menu | Yes | Yes |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`legend`**_](#ui--legend)
>>Specifies options for the legend like reordering, importing, etc.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | - | - |

>### [ui:legend:_**`reorderable`**_](#ui--legend)
>>Specifies if the items in the legend can be reordered; structured legend ignores this property.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* |  | `true` | `true` | UI/General | - | - |

>### [ui:legend:_**`allowImport`**_](#ui--legend)
>>Specifies if the user-added layers are allowed.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/General | - | - |

>### [ui:legend:_**`isOpen`**_](#ui--legend)
>>Specifies whether the legend is opened by default on initial loading of the map for small, medium, and large viewports. ||| UI/General.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | - | - |

>### [ui:legend:isOpen:_**`large`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for large viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | - | - |

>### [ui:legend:isOpen:_**`medium`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for medium viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| **isOpen : medium** | *boolean* | `false` | `false` | UI/General | - | - |

>### [ui:legend:isOpen:_**`small`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for small viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* |  | `false` | `false` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)
***
>### [ui:_**`tableIsOpen`**_](#ui--tableisopen)
>>A set of service endpoints used by the viewer.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | Yes | - |

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| **tableIsOpen : id** | *string* | The id of the layer for referencing within the viewer. | - | `"mylayerID"` | UI/General | Yes | Yes |

>### [ui:tableIsOpen:_**`large`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for large viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

>### [ui:tableIsOpen:_**`medium`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for medium viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

>### [ui:tableIsOpen:_**`small`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for small viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

## **Annex**

>## **ui : fullscreen**

```js
    "ui"{
        ...,
        "fullscreen": true,
        ...
    }
```

[:arrow_up: back to fullscreen](#uifullscreen)

>## **ui : theme**

```js
    "ui"{
        ...,
        "theme": "default",
        ...
    }
```

[:arrow_up: back to theme](#uitheme)

>## **ui : logoUrl**

**Note:** if you want your custom logo to be shown, you have to set **"sideMenu" {"logo": true}** (see [sideMenu](#uisidemenu))

```js
    "ui"{
        ...,
        "logoUrl": "data:image/png;base64,image encoded",
        ...
    }
```

![logoUrl](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-logo.png)

[:arrow_up: back to logoUrl](#uilogourl)

>## **ui : title**

```js
    "ui"{
        ...,
        "title": "Custom title",
        ...
    }
```

![title](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-title.png)

[:arrow_up: back to title](#uititle)

>## **ui : restrictNavigation**

```js
    "ui"{
        ...,
        "restrictNavigation": true,
        ...
    }
```

[:arrow_up: back to restrictNavigation](#uirestrictnavigation)

>## **ui : failureFeedback**

```js
    "ui"{
        ...,
        "failureFeedback": {
            "failureMessage": "That's a fail :-(",
            "failureImageUrl":"https://files.gitter.im/AleksueiR/eR5s/dinoscream.gif"
        },
        ...
    }
```

![failureFeedback](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-failurefeedback.gif)

[:arrow_up: back to failureFeedback](#uifailurefeedback)

>## **ui : appBar**

The application bar could be found at the top left corner of the viewer.

```js
    "ui"{
        ...,
        "appBar": {
            "sideMenu": true,
            "geoSearch": true,
            "basemap": true,
            "layers": true
        },
        ...
    }
```

Putting false to an element will hide it.
Also, **basemap** button will appear only after **layers** button has been pushed.

![appBar](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-appBar.png)

[:arrow_up: back to appBar](#uiappbar)

>## **ui : navBar**

The application bar could be found at the bottom right corner of the viewer.

```js
    "ui"{
        ...,
        "navBar": {
            "extra": ["fullscreen", "geoLocator", "home", "help", "basemap", "geoSearch", "sideMenu", "layers"]
        },
        ...
    }
```

![navBar](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-navBar.png)

[:arrow_up: back to navBar](#uinavbar)

>## **ui : sideMenu**

The sidemenu can be accessed through ![sideMenu](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-sidemenu-button.png) button.

This code snippet will generate a sidemenu containing four categories with a title and a logo at the top. A custom logo can be defined [here](#uilogourl) and a custom title [here](#uititle).

```js
    "ui"{
        ...,
        "sideMenu": {
            "logo": true,
            "items": [["layers", "basemap"], ["fullscreen", "export", "share", "touch", "help"], ["language"], ["plugins"]]
        },
        ...
    }
```

![sideMenu](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-sidemenu-config.png)

[:arrow_up: back to sideMenu](#uisidemenu)

>## **ui : about**

The about section can be accessed in the [sidemenu](#uisidemenu).
**NOTE** You can't put both content and folderName they are mutually exclusive.

```js
    "ui"{
        ...,
        "about": {
            "content": "This is about the about section"
            OR
            "folderName": "indexOne"
        },
        ...
    }
```

Here's an example with [content](#uiaboutcontent).
ui-about-content.gif

![about content](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-about-content.gif)

Here's an example with a [folderName](#uiaboutfoldername).
The folder is structured like this:

```js
about\
    indexOne\
        images\
            canada.png
        en-CA.md
        fr-CA.md
```

![about folderName](https://github.com/ChrisLatRNCan/fgpa-apgf/blob/8-schemaDoc/wiki/images/ui-about-foldername.gif)

[:arrow_up: back to about](#uiabout)

>## **ui : help**

The help section can be accessed in the [sidemenu](#uisidemenu) or in the [navigation bar](#uinavbar).

```js
    "ui"{
        ...,
        "help": {
            "folderName": "myHelp"
        },
        ...
    }
```

Here's the corresponding files and folders structure:

```js
help\
    myHelp\
        images\
            image1.png
            image2.png
            ...
        en-CA.md
        fr-CA.md
```

[:arrow_up: back to help](#uihelp)

>## **ui : legend**

```js
    "ui"{
        ...,
        "legend": {
            "isOpen": {
                "large": true,
                "medium": true,
                "small": false
        },
        ...
    }
```

[:arrow_up: back to legend](#uilegend)

>## **ui : tableIsOpen**

```js
    "ui"{
        ...,
        "tableIsOpen": {
            "id": "DateLayer",
            "large": true,
            "medium": true,
            "small": false
        },
        ...
    }
```

[:arrow_up: back to tableIsOpen](#uitableisopen)