# **The Federal Geospatial Platform Viewer (FGPV) schema V. 2.3**

The schema.json file can be found [here](https://github.com/fgpv-vpgf/fgpv-vpgf/blob/develop/schema.json)

- [Map](#map)
- [UI](#ui)
- [Services](#services)
- [Version](#version)
- [Language](#language)

# **Map**

Core map properties (extent sets, levels of detail).

>### **Map JSON tree**

&emsp; [**"map"**](#map): **{**<br/>
&emsp;&emsp;&emsp;[**"extentSets"**](#mapextentsets): [<br/>
&emsp;&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; [**`extentSetNode`**](#extentsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#extentsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#extentsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"lodSets"**](#maplodsets): [<br/>
&emsp;&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; [**`lodSetNode`**](#lodsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#lodsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#lodsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"tileSchemas"**](#maptileschemas): [<br/>
&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp; [**`tileSchemaNode`**](#tileschemanode-json-tree)<br/>
&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#tileschemanode-json-tree),<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#tileschemanode-json-tree)<br/>
&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"components"**](#mapcomponents): {<br/>
&emsp;&emsp;&emsp;&emsp;[**"geoSearch"**](#mapcomponentsgeosearch): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsgeosearchenabled): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["showGraphic"](#mapcomponentsgeosearchshowgraphic): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["showInfo"](#mapcomponentsgeosearchshowinfo): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"mouseInfo"**](#mapcomponentsmouseinfo): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsmouseinfoenabled): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**"spatialReference"**](#mapcomponentsmouseinfospatialreference): {...}<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"northArrow"**](#mapcomponentsnortharrow): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsnortharrowenabled): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["arrowIcon"](#mapcomponentsnortharrowarrowicon): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["poleIcon"](#mapcomponentsnortharrowpoleicon): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"overviewMap"**](#mapcomponentsoverviewmap): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsoverviewmap): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["expandFactor"](#mapcomponentsoverviewmap): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"scaleBar"**](#mapcomponentsscalebar): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsscalebar): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"basemap"**](#mapcomponentsbasemap): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsbasemap): ...<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;["initialBasemapId"](#mapinitialbasemapid): ...,<br/>
&emsp;&emsp;&emsp;[**"baseMaps"**](#mapbasemaps): { :construction: },<br/>
&emsp;&emsp;&emsp;[**"layers"**](#maplayers): { :construction: },<br/>
&emsp;&emsp;&emsp;[**"legend"**](#maplegend): { :construction: }<br/>
&emsp;}

***
>#### [**`ExtentSetNode JSON tree`**](#nodeextentsetnode)

&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodeextentsetnodeid): ...,<br/>
&emsp;&emsp;&emsp;[**"spatialReference"**](#nodespatialreference): {<br/>
&emsp;&emsp;&emsp;&emsp;["wkid"](#nodespatialreferencewkid): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;[**"default"**](#nodeextentsetnodedefault): {...},<br/>
&emsp;&emsp;&emsp;[**"full"**](#nodeextentsetnodefull): {...},<br/>
&emsp;&emsp;&emsp;[**"maximum"**](#nodeextentsetnodemaximum): {...}<br/>
&emsp; }<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`lodSetNode JSON tree`**](#nodelodesetnode)

&emsp;{<br/>
&emsp;&emsp;["id"](#nodelodsetnodeid): ...,<br/>
&emsp;&emsp;[**"lods"**](#nodelodsetnodelods): [<br/>
&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;["level"](#nodelodsetnodelodslevel): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["resolution"](#nodelodsetnodelodsresolution): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["scale"](#nodelodsetnodelodsscale): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;...<br/>
&emsp;&emsp;]<br/>
&emsp;}

[:arrow_up: back to Map](#map-json-tree)

>#### [**`tileSchemaNode JSON tree`**](#nodetileschemanode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodetileschemanodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodetileschemanodename): ...,<br/>
&emsp;&emsp;&emsp;["extentSetId"](#nodetileschemanodeextentsetid): ...,<br/>
&emsp;&emsp;&emsp;["lodSetId"](#nodetileschemanodelodsetid): ...,<br/>
&emsp;&emsp;&emsp;[**"overviewUrl"**](#nodetileschemanodeoverviewurl): {<br/>
&emsp;&emsp;&emsp;&emsp;["layerType"](#nodetileschemanodeoverviewurllayertype): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["url"](#nodetileschemanodeoverviewurlurl): ...<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;},<br/>

[:arrow_up: back to Map](#map-json-tree)

>## **map**
>>Core map properties (extent sets, levels of detail).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:_**`extentSets`**_](#map--extentsets)
>>The default, full and maximum extents of the map. |

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:_**`lodSets`**_](#map--lodsets)
>>The levels of detail (zoom scales) available for the map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | - | Yes |

[:arrow_up: back to Map](#map-json-tree)

>### [map:_**`tileSchemas`**_](#map--tileschemas)
>>A unique combination of an LoD and an extent set (each basemap must fit into a tile schema).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to Map](#map-json-tree)

>### [map:_**`components`**_](#map--components)
>>Map components.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`geoSearch`**_](#map--components--geosearch)
>>geoSearch component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:geoSearch:_**`enabled`**_](#map--components--geosearch--enabled)
>>Enabling geoSearch. If this component is disabled, the [geoSearch widget](#uiappbargeosearch) won't be shown in the application bar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | true | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:geoSearch:_**`showGraphic`**_](#map--components--geosearch--showgraphic)
>>

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:geoSearch:_**`showInfo`**_](#map--components--geosearch--showinfo)
>>

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`mouseInfo`**_](#map--components--mouseinfo)
>>Display cursor coordinates at the bottom of the screen.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:mouseInfo:_**`enabled`**_](#map--components--mouseinfo)
>>Enabling mouse information at the bottom of the screen.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:mouseInfo:_**`spatialReference`**_](#map--components--mouseinfo--spatialreference)
>>Coordinates system and projection used to retrieve localization info from the mouse cursor. For more info see [node:**`spatialReference`**_](#nodespatialreference)

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`northArrow`**_](#map--components--northarrow)
>>Everything about the North arrow

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:northArrow:_**`arrowIcon`**_](#map--components--northarrow--arrowicon)
>>The graphical icon url/data url of the north arrow.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:northArrow:_**`poleIcon`**_](#map--components--northarrow--poleicon)
>>The graphical icon url/data url of the north pole that replaces north arrow when it's on north pole.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:northArrow:_**`enabled`**_](#map--components--northarrow--enabled)
>>Enabling North arrow.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | true | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`overviewMap`**_](#map--components--overviewmap)
>>Collapsable overview map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**overviewMap : enabled**](#map--components--overviewmap)| *boolean* |  | - | `true` | Map/Components | - | - |
| [**overviewMap : expandFactor**](#map--components--overviewmap) | *number* |  | `2` | `5` | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`scaleBar`**_](#map--components--scalebar)
>>Scale bar.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**scaleBar : enabled**](#map--components--scalebar) | *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:components:_**`basemap`**_](#map--components--basemap)
>>Collapsable overview map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**basemap : enabled**](#map--components--basemap) | *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [map:_**`initialBasemapId`**_](#map--initialbasemapid)
>>Initial basemap to load. If not supplied viewer will select any basemap.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `Viewer choice` | `"myBaseMapID"` | Map/Basemaps | - | - |

[:arrow_up: back to Map](#map-json-tree)

## **Nodes**
**Nodes are objects that are part of other object definition**

>### [node:extentSetNode:_**`id`**_](#node--extentsetnode)
>>Extents set id.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978"` | Map/Extents and Levels of Details | - | Yes |

[:arrow_up: back to extentSetNode](#extentsetnode-json-tree)

>### [node:extentSetNode:_**`default`**_](#node--extentsetnode)
>>The default (starting) extent. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to extentSetNode](#extentsetnode-json-tree)

>### [node:extentSetNode:_**`full`**_](#node--extentsetnode)
>>The full extent (should give good view of the whole map, not necessarily the maximum extent); default will be used if not supplied. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to extentSetNode](#extentsetnode-json-tree)

>### [node:extentSetNode:_**`maximum`**_](#node--extentsetnode)
>The maximum extent; full or default extents will be used if not supplied. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to extentSetNode](#extentsetnode-json-tree)

>### [node:_**`spatialReference`**_](#node--spatialreference)
>>Projection

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [node:spatialReference:_**`wkid`**_](#node--spatialreference--wkid)
>>Well-known identifier.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `3978` | Map | - | - |

[:arrow_up: back to Map](#map-json-tree)

>### [node:lodSetNode:_**`id`**_](#node--lodsetnode--id)
>>Level of details Set id.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)

>### [node:lodSetNode:_**`lods`**_](#node--lodsetnode--lods)
>>Level of details for a specific tile schema.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)

>### [node:lodSetNode:lods:_**`level`**_](#node--lodsetnode--lods--level)
>>A sequential integer that identify a level.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `3` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)

>### [node:lodSetNode:lods:_**`resolution`**_](#node--lodsetnode--lods--resolution)
>>The smallest spaces between two display elements expressed in map unit of the corresponding projection.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `38364.660062653464` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)

>### [node:lodSetNode:lods:_**`scale`**_](#node--lodsetnode--lods--scale)
>>Ratio between distance measure on a map and the corresponding distance on the ground.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `145000000` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)

>### [node:tileSchemaNode:_**`id`**_](#node--tileschemanode--id)
>>A unique id identifying a tile schema (combination of an extent set and a zoom scale).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978#LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:_**`name`**_](#node--tileschemanode--name)
>>The name to display in the basemap selector for the set of basemaps referencing this schema.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"Lambert Maps"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:_**`extentSetId`**_](#node--tileschemanode--extentsetid)
>>The extent set to be used for this basemap (should reference map.extentSets.id).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:_**`lodSetId`**_](#node--tileschemanode--lodsetid)
>>Optional. The level of details set to be used for this basemap.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:_**`overviewUrl`**_](#node--tileschemanode--overviewurl)
>>Optional. If set, the overview map will use this layer instead of the active basemap.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | Yes | - |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:overviewUrl:_**`layerType`**_](#node--tileschemanode--overviewurl--layertype)
>>Layer type that can be of one of those values ["esriImage", "esriTile"]

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"esriTile"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:tileSchemaNode:overviewUrl:_**`url`**_](#node--tileschemanode--overviewurl--url)
>>The service endpoint of the layer. It should match the type provided in [layerType]((#maptileschemasoverviewurllayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://services.arcgisonline.com/.../World_Street_Map/MapServer"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)

>### [node:_**`extentNode`**_](#node--extentnode)
>>Extents coordinates in projection system used by the layer.

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| xmin | *number* | `-` | `-2681457` | Map | - | - |
| ymin | *number* | `-` | `-883440` | Map | - | - |
| xmax | *number* | `-` | `3549492` | Map | - | - |
| ymax | *number* | `-` | `3482193` | Map | - | - |

[:arrow_up: back to Map top](#Map)

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

>### [ui:_**`theme`**_](#ui--theme)
>>UI theme of the viewer. For now, only "default" value is available

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `"default"` | `"default"` | UI/TBD | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`logoUrl`**_](#ui--logourl)
>>An optional image to be used in the place of the default viewer logo.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | UI/Side Menu | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`title`**_](#ui--title)
>>An optional title to be used in the place of the default viewer title.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `My custom title` | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`restrictNavigation`**_](#ui--restrictnavigation)
>>Will restrict the user from panning beyond the maximum extent.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/Navigation | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`failureFeedback`**_](#ui--failurefeedback)
>>Failure information.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:failureFeedback:_**`failureMessage`**_](#ui--failurefeedback)
>>An optional message to be used in place of the failure message.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - |`"That's a fail :-("`| UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:failureFeedback:_**`failureImageUrl`**_](#ui--failurefeedback)
>>An optional image to be used in place of the failure Image.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://path2Image/MyFailureImage.gif"` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`appBar`**_](#ui--appbar)
>>Provides configuration to the main app toolbar. If not supplied, the default appbar controls are displayed. To completely hide the toolbar, provide the following: { sideMenu: false, geoSearch: false, layers: false }.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:appBar:_**`sideMenu`**_](#ui--appbar)
>>Shows the side menu button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:appBar:_**`geoSearch`**_](#ui--appbar)
>>Shows the geosearch button in the main app toolbar. The button will be hidden if geosearch component is disabled or no search service URLs are provided.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:appBar:_**`basemap`**_](#ui--appbar)
>>Shows the basemap selector button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean*  | `true` | `true` | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:appBar:_**`layers`**_](#ui--appbar)
>> Shows the layers button in the main app toolbar.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Application Bar | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`navBar`**_](#ui--navbar)
>>Provides configuration to the nav bar. If not supplied the default nav bar buttons are shown.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Navigation | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:navBar:_**`extra`**_](#ui--navbar)
>>Set visible navigation bar buttons. Possible values: _**`"geoLocator", "home", "basemap", "help", "fullscreen", "geoSearch", "sideMenu", "layers"`**_

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `["fullscreen", "geoLocator", "home", "help"]` | `["home", "help", "fullscreen", "geoSearch", "sideMenu", "layers"]` | UI/Navigation | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`sideMenu`**_](#ui--sidemenu)
>>Specifies which options are available in the left side menu.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:sideMenu:_**`logo`**_](#ui--sidemenu)
>>Indicates if the logo should be shown in the left side menu.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/Side Menu | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:sideMenu:_**`items`**_](#ui--sidemenu)
>>Side Menu set of buttons. Divide the menu using array symbols _**`[]`**_.  Possible values are _**`"layers", "basemap", "geoSearch", "about", "fullscreen", "export", "share", "touch", "help", "language", "plugins"`**_

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `[["layers", "basemap"], ["fullscreen", "export", "share", "touch", "help", "about"], ["language"], ["plugins"]]` |`[["layers", "basemap"], ["fullscreen", "export", "about"], ["language"]]`| UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`about`**_](#ui--about)
>>Specifies the location/content of the about section.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:about:_**`content`**_](#ui--about)
>>The content of the about section.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"This is about about"` | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:about:_**`folderName`**_](#ui--about)
>>Help folder name which contains the about file(s) and image(s). The viewer will look inside a folder named **about** for the specified folder name (e.g. /about/`aboutisHere`). Afterward, it'll check for a markdown file named `en-CA.md` if you are in the English flavor of the viewer and `fr-CA.md` for the French. Images need to reside inside the specified folder.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `aboutIsHere` | UI/Side Menu | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`help`**_](#ui--help)
>> Specifies details for the Help section.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/Side Menu | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:help:_**`folderName`**_](#ui--help)
>>Help folder name which contains the help description and image(s). The viewer will look inside a folder named **help** for the specified folder name (e.g. /help/`helpIsHere`). Afterward, it'll check for a markdown file named `en-CA.md` if you are in the English flavor of the viewer and `fr-CA.md` for the French. Images need to reside inside the specified folder.
**NOTE** The viewer has already a default help. Consequently, you will use this parameter only if you want a custom help.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `HelpIsHere` | UI/Side Menu | Yes | Yes |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`legend`**_](#ui--legend)
>>Specifies options for the legend like reordering, importing, etc.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:_**`reorderable`**_](#ui--legend)
>>Specifies if the items in the legend can be reordered; structured legend ignores this property.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* |  | `true` | `true` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:_**`allowImport`**_](#ui--legend)
>>Specifies if the user-added layers are allowed.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:_**`isOpen`**_](#ui--legend)
>>Specifies whether the legend is opened by default on initial loading of the map for small, medium, and large viewports. ||| UI/General.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:isOpen:_**`large`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for large viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:isOpen:_**`medium`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for medium viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| **isOpen : medium** | *boolean* | `false` | `false` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:legend:isOpen:_**`small`**_](#ui--legend)
>>Whether the legend is opened by default on initial loading of the map for small viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* |  | `false` | `false` | UI/General | - | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:_**`tableIsOpen`**_](#ui--tableisopen)
>>A set of service endpoints used by the viewer.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| **tableIsOpen : id** | *string* | The id of the layer for referencing within the viewer. | - | `"mylayerID"` | UI/General | Yes | Yes |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:tableIsOpen:_**`large`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for large viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:tableIsOpen:_**`medium`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for medium viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

>### [ui:tableIsOpen:_**`small`**_](#ui--tableisopen)
>>Whether the table panel is opened by default on initial loading of the map for small viewports.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `false` | UI/General | Yes | - |

[:arrow_up: back to UI](#ui-json-tree)

# **Services**

A set of service endpoints used by the viewer.

>### **Services JSON tree**

&emsp; [**"services"**](#services): **{**<br/>
&emsp;&emsp;&emsp; ["proxyUrl"](#servicesproxyurl): ...,<br/>
&emsp;&emsp;&emsp; ["exportMapUrl"](#servicesexportmapurl): ...,<br/>
&emsp;&emsp;&emsp; ["geometryUrl"](#servicesgeometryurl): ...,<br/>
&emsp;&emsp;&emsp; ["googleAPIKey"](#servicesgoogleapikey): ...,<br/>
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

>### [services:_**`exportMapUrl`**_](#services--exportmapurl)
>>An ESRI service endpoint for generating map images.  Should point directly to an endpoint that can be consumed by ESRI PrintTask. NOTE: The PrintTask service has to be asynchronous.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://.../ExportMapEndPoint"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:_**`geometryUrl`**_](#services--geometryurl)
>>A URL to an ESRI ArcGIS geometry service REST endpoint.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"http://.../GeometryEndPoint"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:_**`googleAPIKey`**_](#services--googleapikey)
>>Google API key to enable geo location.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"AIzaSyBT6w4TvRdWFhFk35tc"` | Services/Service End Points | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:_**`search`**_](#services--search)
>>Search properties including ability to disable certain types of searches (NTS, FSA, and/or LAT/LNG) and to set service endpoint urls.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *object* ||| Services/Geo Search | - | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:_**`disabledSearches`**_](#services--search--disabledSearches)
>>Enable specific types of searches including: National Topographic System, Postal Code/Foward Sorting Area or Latitude/Longitude (e.g. 58.12;-100.67).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | `[]` | `["NTS","LAT/LNG"]` | Services/Geo Search | - | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:_**`serviceUrls`**_](#services--search--serviceurls)
>>Service endpoint urls.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *object* ||| Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:serviceUrls:_**`geoLocation`**_](#services--search--serviceurls)
>>Endpoint url for geoLocation service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/locate?q="` | Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:serviceUrls:_**`geoNames`**_](#services--searchervice--serviceurls)
>>Endpoint url for geoNames service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/geonames.json"` | Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:serviceUrls:_**`geoSuggest`**_](#services--search--serviceurls)
>>Endpoint url for geoSuggest service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/suggest?q="` | Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:serviceUrls:_**`provinces`**_](#services--search--serviceurls)
>>Endpoint url for provinces service

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/codes/province.json"` | Services/Geo Search | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:search:serviceUrls:_**`types`**_](#services--search--serviceurls)
>>Endpoint url for types service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `""` | `"https://.../en/codes/concise.json"` | Services/Geo Search | Yes | - |

>### [services:_**`export`**_](#services--export)
>>Export properties.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

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

[:arrow_up: back to Services](#services-json-tree)

>### [services:export:_**`map`**_](#services--export--map)
>>Map component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | Yes | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**map : isSelectable**](#services--export--map) | *boolean* |  | `true` | `true` | Services/Export Map | Yes | - |
| [**map : isSelected**](#services--export--map) | *boolean* |  | `true` | `true` | Services/Export Map | Yes | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:export:_**`mapElements`**_](#services--export--mapelements)
>>North arrow and scalebar component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* |  | Services/Export Map | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**mapElements : isSelectable**](#services--export--mapelements) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**mapElements : isSelected**](#services--export--mapelements) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

>### [services:export:_**`legend`**_](#services--export--legend)
>>Legend component.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Services/Export Map | Yes | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**legend : isSelectable**](#services--export--legend) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |
| [**legend : isSelected**](#services--export--legend) | *boolean* |  | `true` | `true` | Services/Export Map | - | - |

[:arrow_up: back to Services](#services-json-tree)

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

[:arrow_up: back to Services](#services-json-tree)

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

## **Version**

The schema version used to validate the configuration file.  The schema should enumerate the list of versions accepted by this version of the viewer.

```js
"version": "2.2"
```

## **Language**

ISO 639-1 code indicating the language of strings in the schema file.

ISO 639-1 code | Language | Default
----|----|----
"en"| English | Yes
"fr"| French |

```js
"language": "en"
```

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

[GeoLocation API](https://www.nrcan.gc.ca/earth-sciences/geography/topographic-information/free-data-geogratis/geogratis-web-services/17216#g3): **"geoLocation"** and **"geoSuggets"**

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
        "isSelected": true
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